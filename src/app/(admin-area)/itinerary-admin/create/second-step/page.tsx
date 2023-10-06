'use client';

import {useId, useState, Fragment, useEffect} from 'react';
import {CancelIcon} from '@/components/icon/CancelIcon';
import {cn} from '@/utils/cn';
import {
  Floor,
  BUS_FLOORS_ICONS,
  BUSES_SEATS_DATA,
  BUS_FLOORS_COUNT,
} from '../../data';
import {useRouter, useSearchParams} from 'next/navigation';
import Link from 'next/link';
import {DefaultSeatIcon} from '@/components/icon/DefaultSeatIcon';
import {Steps} from '../Steps';
import {useAxios} from '@/modules/axios/axios.hook';

type BusFloorMenuTabs = 'PISO_1' | 'PISO_2';

const CreateItinerarySecondPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [menuTab, setMenuTab] = useState<BusFloorMenuTabs>('PISO_1');
  const uniqueId = useId();
  const [form, setForm] = useState({
    routeId: null,
    name: '',
    initialDate: '',
    boardingTime: '',
    busId: null,
    driverId: null,
    copilotId: null,
    subuserId: null,

    firstFloorPrice: 0,
    secondFloorPrice: 0,
  });
  const [{loading: createItinerarieIsLoading}, executeCreateItinerarie] =
    useAxios(
      {
        method: 'POST',
        url: '/itineraries',
      },
      {
        manual: true,
      },
    );

  const handleSwitchTab = (floor: BusFloorMenuTabs) => {
    setMenuTab(floor);
  };

  const renderSeats = (floor: Floor) => {
    const firstSeatsColumn = [
      floor.seatsFirstFloor1Line,
      floor.seatsFirstFloor2Line,
    ];

    const secondSeatsColumn = [
      floor.seatsFirstFloor3Line,
      floor.seatsFirstFloor4Line,
    ];

    return (
      <Fragment>
        <div className="flex flex-grow items-center flex-col gap-4">
          <div className="flex flex-row gap-4">
            {firstSeatsColumn.map((floorsColumns, rowIndex) => {
              const colCount = 1 + rowIndex;

              return (
                <div
                  key={rowIndex}
                  className="flex flex-col gap-4 transition-opacity"
                  data-col={`C${colCount}`}>
                  {floorsColumns.map((floorColumn, seatIndex) => {
                    return (
                      <button
                        key={seatIndex}
                        className="relative"
                        id={`${menuTab}-C${colCount}-${floorColumn.seat_number}`}>
                        <DefaultSeatIcon />
                        <span className="absolute block inset-0 top-1/4 text-textMuted font-medium">
                          {floorColumn.seat_number}
                        </span>
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-grow items-center flex-col gap-4">
          <div className="flex flex-row gap-4">
            {secondSeatsColumn.map((floorsColumns, rowIndex) => {
              const colCount = 3 + rowIndex;

              return (
                <div key={rowIndex} className="flex flex-col gap-4">
                  {floorsColumns.map((floorColumn, seatIndex) => {
                    return (
                      <button
                        key={seatIndex}
                        className="relative"
                        id={`${menuTab}-C${colCount}-${floorColumn.seat_number}`}>
                        <DefaultSeatIcon />
                        <span className="absolute block inset-0 top-1/4 text-textMuted font-medium">
                          {floorColumn.seat_number}
                        </span>
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </Fragment>
    );
  };

  const increaseDate = (date: string) => {
    const partsDate = date.split('-');
    const year = parseInt(partsDate[0], 10);
    const month = parseInt(partsDate[1], 10);
    const day = parseInt(partsDate[2], 10);

    const currentDate = new Date(year, month - 1, day);
    currentDate.setDate(currentDate.getDate() + 1);

    if (currentDate.getDate() === 1) {
      currentDate.setMonth(currentDate.getMonth() + 1);
      if (currentDate.getMonth() === 0) {
        currentDate.setFullYear(currentDate.getFullYear() + 1);
      }
    }

    const newYear = currentDate.getFullYear();
    const newMonth = currentDate.getMonth() + 1;
    const newDay = currentDate.getDate();

    return `${newYear}-${newMonth.toString().padStart(2, '0')}-${newDay
      .toString()
      .padStart(2, '0')}`;
  };

  const handleSubmit = async () => {
    try {
      const response = await executeCreateItinerarie({
        data: {
          id_route: form.routeId,
          weekday: [new Date(form.initialDate).getDay()],
          arrival_time: form.boardingTime,
          default_bus: form.busId,
          first_floor_price: form.firstFloorPrice,
          second_floor_price: form.secondFloorPrice,
          valid_since: form.initialDate,
          // valid_until: increaseDate(form.initialDate),
          valid_until: form.initialDate,
          individual: true,
          name_itinerary: form.name
        },
      });

      // success response
      router.push('/itinerary-admin');
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    const queryParamsObject = {};

    // @ts-ignore
    for (const [key, value] of params) {
      const castedValue = parseFloat(value);

      if (key.endsWith('Id')) {
        // @ts-ignore
        queryParamsObject[key] = castedValue;
      } else {
        // @ts-ignore
        queryParamsObject[key] = value;
      }
    }

    setForm({
      ...form,
      // @ts-ignore
      ...queryParamsObject,
    });
  }, [searchParams]);

  return (
    <div className="flex flex-col">
      {/** Heading */}
      <div className="flex flex-row justify-between">
        <div className="">
          <h2 className="text-xl font-bold text-primary">Nuevo itinerario</h2>
        </div>

        <div>
          <Link
            href="/itinerary-admin"
            className="btn flex-1 btn-outline rounded-[12px] bg-white hover:bg-white hover:text-black text-sm">
            <CancelIcon />
            Cancelar
          </Link>
        </div>
      </div>

      <div className="flex mt-8 gap-4">
        {/** info */}
        <Steps />

        {/** tabla */}
        <div className="flex flex-1">
          <div className="bg-white shadow rounded-[25px] border-[0.5px] border-borderPane flex flex-col flex-1 px-6 py-8">
            <div className="">
              <h3 className="font-medium text-sm text-textMuted uppercase">
                Establecer precios base
              </h3>
            </div>

            <div className="flex flex-1 gap-10">
              <div className="flex flex-1 flex-col">
                {/** Tabs */}
                <div className="mt-6">
                  <div>
                    <div className="tabs tabs-boxed rounded-[14px]">
                      {BUS_FLOORS_COUNT.map(({key, title}, keyMap) => (
                        <button
                          key={`bus-floors-tabs-${key}-${keyMap}`}
                          className={cn(
                            'tab grow px-8',
                            menuTab === key && 'tab-active',
                          )}
                          onClick={() =>
                            handleSwitchTab(key as BusFloorMenuTabs)
                          }>
                          {title}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/** Renderizado de asientos */}
                <div className="mt-6 rounded-[25px] border border-borderPaneAlt p-7 flex flex-col gap-6">
                  {/** Renderizar iconos de primer piso y segundo piso */}
                  <div className="flex flex-row justify-center items-center gap-6">
                    {BUS_FLOORS_ICONS.map((Icon, key) => (
                      <div
                        key={`bus-floor-icon-${key}`}
                        className="rounded-[15px] border border-bgBorderBusFloor py-2 px-10 flex flex-1 items-center justify-center">
                        <Icon />
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-row gap-6">
                    {menuTab === 'PISO_1'
                      ? renderSeats(BUSES_SEATS_DATA.firstFloor)
                      : renderSeats(BUSES_SEATS_DATA.secondFloor)}
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col">
                <div className="mt-6">
                  <div className="rounded-[25px] border-[0.5px] border-borderLayout p-7 flex flex-col gap-4">
                    <div>
                      <h4 className="uppercase text-base text-textStepsChecked font-medium">
                        Piso 1
                      </h4>

                      <div className="mt-4">
                        <label
                          htmlFor={`${uniqueId}-first-floor-price-input`}
                          className="block mb-1 font-medium text-sm text-textMuted">
                          Precio
                        </label>

                        <div className="relative">
                          <span className="absolute font-normal text-sm text-textStepsMuted h-full flex items-center left-4 select-none">
                            S/.
                          </span>

                          <input
                            type="number"
                            id={`${uniqueId}-first-floor-price-input`}
                            className="input w-full py-3 px-5 text-center rounded-br11 bg-bgCommonInput text-sm text-black"
                            placeholder="00.0"
                            required
                            value={form.firstFloorPrice}
                            onChange={({target: {value}}) => {
                              const castedValue = parseFloat(value);
                              const isNumber = !isNaN(castedValue);

                              if (!isNumber) return;

                              setForm({
                                ...form,
                                firstFloorPrice: castedValue,
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="uppercase text-base text-textStepsChecked font-medium">
                        Piso 2
                      </h4>

                      <div className="mt-4">
                        <label
                          htmlFor={`${uniqueId}-second-floor-price-input`}
                          className="block mb-1 font-medium text-sm text-textMuted">
                          Precio
                        </label>

                        <div className="relative">
                          <span className="absolute font-normal text-sm text-textStepsMuted h-full flex items-center left-4 select-none">
                            S/.
                          </span>

                          <input
                            type="number"
                            id={`${uniqueId}-second-floor-price-input`}
                            className="input w-full py-3 px-5 text-center rounded-br11 bg-bgCommonInput text-sm text-black"
                            placeholder="00.0"
                            required
                            value={form.secondFloorPrice}
                            onChange={({target: {value}}) => {
                              const castedValue = parseFloat(value);
                              const isNumber = !isNaN(castedValue);

                              if (!isNumber) return;

                              setForm({
                                ...form,
                                secondFloorPrice: castedValue,
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="divider"></div>

      <div className="flex justify-between mb-10">
        <div></div>

        <div className="flex gap-4">
          <Link
            className="btn rounded-[14px] border border-textStepsChecked bg-transparent text-primary hover:bg-primary hover:text-white"
            href="/itinerary-admin/create/first-step">
            Atrás
          </Link>

          <button
            disabled={createItinerarieIsLoading}
            className="btn rounded-[14px] bg-primary text-white hover:bg-secondary"
            onClick={handleSubmit}>
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateItinerarySecondPage;
