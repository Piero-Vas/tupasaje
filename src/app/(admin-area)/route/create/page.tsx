'use client';

import {useId, useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {cn} from '@/utils/cn';
import {FaPlus} from 'react-icons/fa6';
import {useAxios} from '@/modules/axios/axios.hook';
import {BiErrorAlt} from 'react-icons/bi';
import Swal from 'sweetalert2';

interface Route {
  id: number;
  originCity: string;
  originCityId: number | null;
  destinationCity: string;
  destinationCityId: number | null;
  travelTime: number;
  waitTime: number;
  distance: number;
}

const INITIAL_ROUTES_STATE: Route[] = [
  {
    id: 1,
    originCity: '',
    originCityId: 0,
    destinationCity: '',
    destinationCityId: 0,
    travelTime: 0,
    waitTime: 0,
    distance: 0,
  },
];

type CitiesListResponse = {
  data: {
    cities: {
      id_city: number;
      city_name: string;
      department: string;
      country: string;
      created_at: string;
      updated_at: string;
      deleted_at: string | null;
    }[];
    total: number;
  };
};

const DEFAULT_FORM_STATE = {
  name_route: '',
};


const validateRoutes = (routes: Route[]): boolean => {
  for (const route of routes) {
    if (
      route.originCity === '' ||
      route.destinationCity === '' ||
      route.originCityId === 0 ||
      route.destinationCityId === 0 ||
      route.travelTime === 0 ||
      route.waitTime === 0 ||
      route.distance === 0
    ) {
      return false;
    }
  }
  return true;
};

export const CreateRoutePage = () => {
  const [routes, setRoutes] = useState<Route[]>(INITIAL_ROUTES_STATE);
  const uniqueId = useId();
  const router = useRouter();
  const [form, setForm] =
    useState<typeof DEFAULT_FORM_STATE>(DEFAULT_FORM_STATE);
  const [{loading: citiesListIsLoading, data: citiesResponse}] =
    useAxios<CitiesListResponse>('/cities/list');
  const [{loading: createRouteIsLoading}, executeCreateRoute] = useAxios(
    {
      method: 'POST',
      url: '/routes',
    },
    {
      manual: true,
    },
  );
  const isLoading = citiesListIsLoading || createRouteIsLoading;

  const isDisabled = routes.length < 1 || !validateRoutes(routes);

  const cities = citiesResponse?.data.cities ?? [];
  const displayOriginCity =
    (!!routes[0].originCity &&
      cities.find(city => city.id_city === Number(routes[0].originCity))
        ?.city_name) ||
    'No disponible';
  const displayDestinationCity =
    (!!routes[routes.length - 1].destinationCity &&
      cities.find(
        city =>
          city.id_city === Number(routes[routes.length - 1].destinationCity),
      )?.city_name) ||
    'No disponible';

  const totalDistanceKm = routes.reduce(
    (accumulator, route) => accumulator + route.distance,
    0,
  );
  const estimatedTravelTime = routes.reduce(
    (accumulator, route) => accumulator + route.travelTime,
    0,
  );
  const estimatedWaitTme = routes.reduce(
    (accumulator, route) => accumulator + route.waitTime,
    0,
  );
  const estimatedDuration = estimatedTravelTime + estimatedWaitTme;

  const handleAddRoute = () => {
    setRoutes([
      ...routes,
      {
        id: routes[routes.length - 1]?.id + 1 ?? 1,
        originCity: '',
        originCityId: null,
        destinationCity: '',
        destinationCityId: null,
        distance: 0,
        travelTime: 0,
        waitTime: 0,
      },
    ]);
  };

  const handleRemoveRoute = (id: number) => {
    if (routes.length <= 1) return;

    const updatedRoutes = routes.filter(route => route.id !== id);
    setRoutes(updatedRoutes);
  };

  const onChangeOriginCity = (id: number, newOriginCityId: string) => {
    const newOriginCity = cities.find(
      city => city.id_city === Number(newOriginCityId),
    );

    if (!newOriginCity) return;

    const updatedRoutes = routes.map(route => {
      if (route.id === id) {
        return {
          ...route,
          originCity: String(newOriginCity.id_city),
          originCityId: Number(newOriginCityId),
        };
      }
      return route;
    });

    setRoutes(updatedRoutes);
  };

  const onChangeDestinationCity = (
    id: number,
    newDestinationCityId: string,
  ) => {
    const newDestinationCity = cities.find(
      city => city.id_city === Number(newDestinationCityId),
    );

    if (!newDestinationCity) return;

    const updatedRoutes = routes.map(route => {
      if (route.id === id) {
        return {
          ...route,
          destinationCity: String(newDestinationCity.id_city),
          destinationCityId: Number(newDestinationCityId),
        };
      }
      return route;
    });

    setRoutes(updatedRoutes);
  };

  const onChangeTravelTime = (id: number, newTravelTime: number) => {
    const updatedRoutes = routes.map(route => {
      if (route.id === id) {
        return {...route, travelTime: newTravelTime};
      }
      return route;
    });

    setRoutes(updatedRoutes);
  };

  const onChangeWaitTime = (id: number, newWaitTime: number) => {
    const updatedRoutes = routes.map(route => {
      if (route.id === id) {
        return {...route, waitTime: newWaitTime};
      }
      return route;
    });

    setRoutes(updatedRoutes);
  };

  const onChangeDistance = (id: number, newDistance: number) => {
    const updatedRoutes = routes.map(route => {
      if (route.id === id) {
        return {...route, distance: newDistance};
      }
      return route;
    });

    setRoutes(updatedRoutes);
  };

  const handleSaveRoute = async () => {
    try {
      const idOfficeOrigin = Number(routes[0].originCity || 0);
      const idOfficeDestination = Number(routes[0].destinationCity || 0);

      const createdRouteResponse = await executeCreateRoute({
        data: {
          id_office_origin: idOfficeOrigin,
          id_office_destination: idOfficeDestination,
          name_route: form.name_route,
          distance: totalDistanceKm,
          estimated_duration: estimatedDuration,
          travel_time: estimatedTravelTime,
          wait_time: estimatedWaitTme,
          stops: routes.map(
            ({
              distance,
              travelTime,
              waitTime,
              destinationCityId,
              originCityId,
            }) => {
              return {
                id_origin: originCityId,
                id_destination: destinationCityId,
                wait_time: waitTime,
                distance,
                travel_time: travelTime,
                has_arrival: 1,
                has_departure: 1,
              };
            },
          ),
        },
      });

      Swal.fire('Ruta creada correctamente', '', 'success').then(() => {
        router.push('/route');
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col">
      {/** Heading */}
      <div className="flex flex-row justify-between">
        <div className="">
          <h2 className="text-xl font-bold text-primary">Nueva ruta</h2>
        </div>
      </div>

      <div className="flex flex-col my-8 gap-8">
        <div className="">
          <label
            htmlFor={`${uniqueId}-route-name`}
            className="block mb-1 text-textMuted font-medium text-sm">
            Nombre
          </label>
          <input
            type="text"
            id={`${uniqueId}-route-name`}
            value={form.name_route}
            onChange={({target: {value: name_route}}) => {
              setForm({
                ...form,
                name_route,
              });
            }}
            className="input w-full max-w-xs py-3 px-5 rounded-xl input-bordered bg-bgCommonInput text-sm text-black"
            placeholder="Ingresa nombre de la ruta"
            required
          />
        </div>

        <div className="flex gap-4 flex-grow flex-wrap">
          <div className="flex flex-col gap-2 grow">
            <h4 className="text-textMuted font-medium text-sm truncate">
              Origen
            </h4>
            <p className="text-textStepsChecked font-medium text-sm">
              {displayOriginCity}
            </p>
          </div>
          <div className="flex flex-col gap-2 grow">
            <h4 className="text-textMuted font-medium text-sm truncate">
              Destino
            </h4>
            <p className="text-textStepsChecked font-medium text-sm">
              {displayDestinationCity}
            </p>
          </div>
          <div className="flex flex-col gap-2 grow">
            <h4 className="text-textMuted font-medium text-sm truncate">
              Duración estimada
            </h4>
            <p className="text-textStepsChecked font-medium text-sm">
              {estimatedDuration || '0'} min.
            </p>
          </div>
          <div className="flex flex-col gap-2 grow">
            <h4 className="text-textMuted font-medium text-sm truncate">
              Distancia
            </h4>
            <p className="text-textStepsChecked font-medium text-sm">
              {totalDistanceKm} KM
            </p>
          </div>
          <div className="flex flex-col gap-2 grow">
            <h4 className="text-textMuted font-medium text-sm truncate">
              Tiempo de viaje
            </h4>
            <p className="text-textStepsChecked font-medium text-sm">
              {estimatedTravelTime || '0'} min.
            </p>
          </div>
          <div className="flex flex-col gap-2 grow">
            <h4 className="text-textMuted font-medium text-sm truncate">
              Tiempo de espera
            </h4>
            <p className="text-textStepsChecked font-medium text-sm">
              {estimatedWaitTme || '0'} min.
            </p>
          </div>
        </div>

        <div className="border-borderLayout border-[0.5px] rounded-[15px] p-6">
          <div className="flex flex-col mb-4 gap-4">
            {routes.map(
              (
                {
                  id,
                  destinationCity,
                  distance,
                  originCity,
                  travelTime,
                  waitTime,
                },
                key,
              ) => {
                const isFirst = key === 0;

                return (
                  <div key={key} className="flex flex-row items-center gap-4">
                    <div className="flex-grow flex flex-col gap-4">
                      {isFirst ? (
                        <h4 className="-mt-5 text-textMuted font-medium text-sm truncate">
                          Paradas
                        </h4>
                      ) : null}

                      {isFirst ? <div></div> : null}

                      <p
                        className={cn(
                          'text-textStepsChecked font-medium text-sm uppercase',
                          isFirst && '-mb-2',
                        )}>
                        Parada {id}
                      </p>
                    </div>

                    <div className="flex-grow flex flex-col gap-4">
                      {isFirst ? (
                        <h4 className="text-textMuted font-medium text-sm truncate">
                          Ciudad de origen
                        </h4>
                      ) : null}

                      <select
                        className="select w-full bg-bgCommonInput rounded-xl max-w-xs py-3 px-5 text-sm"
                        placeholder={`Ciudad de origen parada ${id}`}
                        value={originCity ?? undefined}
                        onChange={({target: {value}}) =>
                          onChangeOriginCity(id, value)
                        }
                        required>
                        <option>Seleccionar ruta</option>

                        {cities.map(({city_name, id_city}, key) => (
                          <option key={key} value={id_city}>
                            {city_name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex-grow flex flex-col gap-4">
                      {isFirst ? (
                        <h4 className="text-textMuted font-medium text-sm truncate">
                          Ciudad de destino
                        </h4>
                      ) : null}

                      <select
                        className="select w-full bg-bgCommonInput rounded-xl max-w-xs py-3 px-5 text-sm"
                        placeholder={`Ciudad de destino parada ${id}`}
                        value={destinationCity ?? undefined}
                        onChange={({target: {value}}) =>
                          onChangeDestinationCity(id, value)
                        }
                        required>
                        <option>Seleccionar ruta</option>

                        {cities.map(({city_name, id_city}, key) => (
                          <option key={key} value={id_city}>
                            {city_name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="relative flex-grow flex flex-col gap-4">
                      {isFirst ? (
                        <h4 className="text-textMuted font-medium text-sm truncate">
                          Tiempo de viaje
                        </h4>
                      ) : null}

                      <input
                        type="number"
                        className="input w-full max-w-xs py-3 px-5 rounded-xl bg-bgCommonInput text-sm text-black"
                        placeholder={`Tiempo de viaje parada ${id}`}
                        value={travelTime}
                        onChange={({target: {value}}) =>
                          onChangeTravelTime(id, +value)
                        }
                        required
                      />

                      <div
                        className={cn(
                          'absolute right-4 top-0 bottom-0 flex items-center',
                          isFirst && 'top-8',
                        )}>
                        <span className="text-textMutedStrong text-sm">
                          min.
                        </span>
                      </div>
                    </div>

                    <div className="relative flex-grow flex flex-col gap-4">
                      {isFirst ? (
                        <h4 className="text-textMuted font-medium text-sm truncate">
                          Tiempo de espera
                        </h4>
                      ) : null}

                      <input
                        type="number"
                        className="input w-full max-w-xs py-3 px-5 rounded-xl bg-bgCommonInput text-sm text-black"
                        placeholder={`Tiempo de espera parada ${id}`}
                        value={waitTime}
                        onChange={({target: {value}}) =>
                          onChangeWaitTime(id, +value)
                        }
                        required
                      />

                      <div
                        className={cn(
                          'absolute right-4 top-0 bottom-0 flex items-center',
                          isFirst && 'top-8',
                        )}>
                        <span className="text-textMutedStrong text-sm">
                          min.
                        </span>
                      </div>
                    </div>

                    <div className="relative flex-grow flex flex-col gap-4">
                      {isFirst ? (
                        <h4 className="text-textMuted font-medium text-sm truncate">
                          Distancia
                        </h4>
                      ) : null}

                      <input
                        type="number"
                        className="input w-full max-w-xs py-3 px-5 rounded-xl bg-bgCommonInput text-sm text-black"
                        placeholder={`Distancia parada ${id}`}
                        value={distance}
                        onChange={({target: {value}}) =>
                          onChangeDistance(id, +value)
                        }
                        required
                      />

                      <div
                        className={cn(
                          'absolute right-4 top-0 bottom-0 flex items-center',
                          isFirst && 'top-8',
                        )}>
                        <span className="text-textMutedStrong text-sm">
                          km.
                        </span>
                      </div>
                    </div>

                    <div
                      className={cn(
                        'relative flex flex-col gap-4',
                        isFirst && 'mt-9',
                      )}>
                      <button
                        className="btn bg-bgred hover:bg-bgred rounded-[10px] w-12 h-12 p-0"
                        onClick={() => {
                          handleRemoveRoute(id);
                        }}>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <mask
                            id="mask0_699_831"
                            style={{maskType: 'alpha'}}
                            maskUnits="userSpaceOnUse"
                            x="0"
                            y="0"
                            width="24"
                            height="24">
                            <rect width="24" height="24" fill="#D9D9D9" />
                          </mask>
                          <g mask="url(#mask0_699_831)">
                            <path d="M6 13V11H18V13H6Z" fill="white" />
                          </g>
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              },
            )}
          </div>

          <button
            className="btn bg-bgblack text-white hover:bg-bggris rounded-[13px]"
            onClick={handleAddRoute}
            disabled={isLoading}>
            <FaPlus className="mr-2" />
            Añadir parada
          </button>
        </div>
      </div>

      <div className="divider"></div>

      <div className="flex justify-between">
        <div></div>

        <div className="flex gap-4">
          <Link
            href="/route"
            className="btn rounded-[14px] border border-textStepsChecked bg-transparent text-primary hover:bg-primary hover:text-white">
            Cancelar
          </Link>

          <button
            className="btn rounded-[14px] bg-primary text-white hover:bg-secondary"
            onClick={handleSaveRoute}
            disabled={isLoading || isDisabled}>
            {isLoading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              'Guardar'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateRoutePage;