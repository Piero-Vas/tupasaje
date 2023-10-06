'use client';

import {useEffect, useId, useState} from 'react';
import {useRouter} from 'next/navigation';
import {isValidNumber} from '@/utils/string';
import {useAxios} from '@/modules/axios/axios.hook';
import Link from 'next/link';
import Swal from 'sweetalert2';
import {FaPlus} from 'react-icons/fa6';

export type Route = {
  id_route: number;
  parent_route_id: number | null;
  id_office_origin: number;
  id_office_destination: number;
  name_route: string;
  distance: string;
  estimated_duration: number;
  travel_time: number;
  wait_time: number;
  status: string;
  id_company: number;
  created_at: string;
  updated_at: string;
  deleted_at: null;
};

type RouteResponse = {
  route: Route;
};

const DEFAULT_ROUTE_DATA: Route = {
  id_route: 0,
  parent_route_id: null,
  id_office_origin: 0,
  id_office_destination: 0,
  name_route: '',
  distance: '',
  estimated_duration: 0,
  travel_time: 0,
  wait_time: 0,
  status: '',
  id_company: 0,
  created_at: '',
  updated_at: '',
  deleted_at: null,
};

const RoutePage: React.FC<{params: {id: string}}> = ({params}) => {
  const id = params.id;
  const uniqueId = useId();
  const router = useRouter();
  const [{loading: routeIsLoading, data: routeResponse}] =
    useAxios<RouteResponse>(`/routes/detail/${id}`, {useCache: false});
  const [{loading: updateRouteIsLoading}, executeEditRoute] = useAxios(
    {
      method: 'PUT',
      url: `/routes/${id}`,
    },
    {manual: true},
  );
  const [route, setRoute] = useState<Route>(
    routeResponse?.route || DEFAULT_ROUTE_DATA,
  );
  const isLoading = routeIsLoading || updateRouteIsLoading;
  const displayOriginCity = '';
  const displayDestinationCity = '';
  const estimatedDuration = '';
  const totalDistanceKm = '';
  const estimatedTravelTime = '';
  const estimatedWaitTme = '';

  const handleAddRoute = () => {};

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const editedRouteResponse = await executeEditRoute({
        data: {},
      });

      Swal.fire('Ruta editada correctamente', '', 'success').then(() => {
        router.push('/route');
      });
    } catch (error) {
      console.error('Update failed', error);
    }
  };

  useEffect(() => {
    const isValidId = isValidNumber(id);

    if (!isValidId) {
      router.replace('/route');
      return;
    }
  }, [router, id]);

  useEffect(() => {
    if (routeIsLoading) {
      return;
    }

    if (!routeResponse?.route) {
      router.replace('/route');
      return;
    }

    setRoute(routeResponse.route);
  }, [routeResponse, routeIsLoading, router]);

  return (
    <div className="flex flex-col">
      {/** Heading */}
      <div className="flex flex-row justify-between">
        <div className="">
          <h2 className="text-xl font-bold text-primary">Editar ruta</h2>
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
            value={route.name_route}
            onChange={({target: {value: name_route}}) => {
              setRoute({
                ...route,
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
            {/* {routes.map(
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
            )} */}
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
            onClick={handleSubmit}
            disabled={isLoading}>
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

export default RoutePage;
