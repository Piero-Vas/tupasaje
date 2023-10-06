'use client';

import {useId, useState, Fragment, useEffect} from 'react';
import {cn} from '@/utils/cn';
import {
  Floor,
  BUS_FLOORS_ICONS,
  BUSES_SEATS_DATA,
  BusesSeatsData,
  BUS_FLOORS_COUNT,
} from '../../data';
import Link from 'next/link';
import {useSearchParams, useRouter} from 'next/navigation';
import {CancelIcon} from '@/components/icon/CancelIcon';
import {DefaultSeatIcon} from '@/components/icon/DefaultSeatIcon';
import {useAxios} from '@/modules/axios/axios.hook';

type BusFloorMenuTabs = 'PISO_1' | 'PISO_2';

type BusSeatsResponse = {
  data: BusesSeatsData;
};

const CreateBusSecondPage: React.FC = () => {
  const [menuTab, setMenuTab] = useState<BusFloorMenuTabs>('PISO_1');
  const uniqueId = useId();
  const router = useRouter();
  const searchParams = useSearchParams();
  const newBusId = searchParams.get('newBusId');
  const [{loading: newBusSeatsIsLoading, data: newBusSeats}] =
    useAxios<BusSeatsResponse>(`/bus/seats/${newBusId}`);
  const isLoading = newBusSeatsIsLoading;

  const handleSwitchTab = (floor: BusFloorMenuTabs) => {
    setMenuTab(floor);
  };

  const renderSeats = (floor?: Floor) => {
    if (!floor) return null;

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

  const nextStep = () => {
    router.push('/bus/create/third-step');
  };

  useEffect(() => {
    if (!newBusId) {
      router.replace('/bus/create/first-step');
    }
  }, [newBusId]);

  return (
    <div className="flex flex-col">
      {/** Heading */}
      <div className="flex flex-row justify-between">
        <div className="">
          <h2 className="text-xl font-bold text-primary">Nuevo Bus</h2>
        </div>

        <div>
          <Link
            href="/bus"
            className="btn flex-1 btn-outline rounded-[12px] bg-white hover:bg-white hover:text-black text-sm">
            <CancelIcon />
            Cancelar
          </Link>
        </div>
      </div>

      <div className="flex mt-8 gap-4">
        {/** info */}
        <div className="">
          <ul className="steps steps-vertical">
            <li className="step step-primary text-textStepsChecked font-medium">
              Datos generales
            </li>
            <li className="step step-primary text-textStepsChecked font-medium">
              Precios base
            </li>
            <li className="step">Precios por columna</li>
            <li className="step">Precios por asientos</li>
          </ul>
        </div>

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
                      ? renderSeats(newBusSeats?.data?.firstFloor)
                      : renderSeats(newBusSeats?.data?.secondFloor)}
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

                        <input
                          type="text"
                          id={`${uniqueId}-first-floor-price-input`}
                          className="input w-full py-3 px-5 rounded-br11 bg-bgCommonInput text-sm text-black"
                          placeholder="S/."
                          required
                        />
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

                        <input
                          type="text"
                          id={`${uniqueId}-second-floor-price-input`}
                          className="input w-full py-3 px-5 rounded-br11 bg-bgCommonInput text-sm text-black"
                          placeholder="S/."
                          required
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

      <div className="divider"></div>

      <div className="flex justify-between mb-10">
        <div></div>

        <div className="flex gap-4">
          <Link
            className="btn rounded-[14px] border border-textStepsChecked bg-transparent text-primary hover:bg-primary hover:text-white"
            href="/bus/create/first-step">
            Atrás
          </Link>

          {/** Este botón redirecciona a la tabla de buses y actualiza los precios de asientos de buses */}
          <Link
            href="/bus"
            className="btn rounded-[14px] bg-primary text-white hover:bg-secondary">
            Finalizar
          </Link>

          <button
          onClick={nextStep}
            disabled={isLoading}
            className="btn rounded-[14px] bg-primary text-white hover:bg-secondary">
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBusSecondPage;
