'use client';

import {useId, useState, Fragment} from 'react';
import {cn} from '@/utils/cn';
import {
  Floor,
  BUS_FLOORS_ICONS,
  BUSES_SEATS_DATA,
  BUS_FLOORS_COUNT,
} from '../../data';
import Link from 'next/link';
import {CancelIcon} from '@/components/icon/CancelIcon';
import {DefaultSeatIcon} from '@/components/icon/DefaultSeatIcon';
import {AddIcon} from '@/components/icon/AddIcon';
import {Steps} from '../Steps';

type BusFloorMenuTabs = 'PISO_1' | 'PISO_2';

type SelectedSeatsType = {
  addSeatsFirstFloorIsPressed: boolean;
  addSeatsSecondFloorIsPressed: boolean;

  firstFloorSeatsSelected: number[];
  secondFloorSeatsSelected: number[];
};

const CreateItineraryFourthPage: React.FC = () => {
  const [menuTab, setMenuTab] = useState<BusFloorMenuTabs>('PISO_1');
  const [manageSelectedFloorSeats, setManageSelectedFloorSeats] =
    useState<SelectedSeatsType>({
      addSeatsFirstFloorIsPressed: false,
      addSeatsSecondFloorIsPressed: false,

      firstFloorSeatsSelected: [],
      secondFloorSeatsSelected: [],
    });
  const uniqueId = useId();

  const handleSwitchTab = (floor: BusFloorMenuTabs) => {
    setMenuTab(floor);
  };

  const handleAddSeatsButton = () => {
    if (menuTab === 'PISO_1') {
      setManageSelectedFloorSeats({
        ...manageSelectedFloorSeats,

        addSeatsSecondFloorIsPressed: false,
        addSeatsFirstFloorIsPressed:
          !manageSelectedFloorSeats.addSeatsFirstFloorIsPressed,
      });
    } else {
      setManageSelectedFloorSeats({
        ...manageSelectedFloorSeats,

        addSeatsFirstFloorIsPressed: false,
        addSeatsSecondFloorIsPressed:
          !manageSelectedFloorSeats.addSeatsSecondFloorIsPressed,
      });
    }
  };

  const handleSeatMouseEnter = (seatId: number) => {
    const seatExistsInState =
      manageSelectedFloorSeats[
        menuTab === 'PISO_1'
          ? 'firstFloorSeatsSelected'
          : 'secondFloorSeatsSelected'
      ].includes(seatId);

    if (!seatExistsInState) return;

    const seatsButtons = document.getElementsByClassName('btn__seat__pickup');

    Array.from(seatsButtons).forEach(seatButton => {
      seatButton.classList.add('opacity-50');
    });

    const id = `${menuTab}_${seatId}`;

    document.getElementById(id)?.classList.add('!opacity-100');
  };

  const handleSeatMouseLeave = (seatId: number) => {
    const seatExistsInState =
      manageSelectedFloorSeats[
        menuTab === 'PISO_1'
          ? 'firstFloorSeatsSelected'
          : 'secondFloorSeatsSelected'
      ].includes(seatId);

    if (!seatExistsInState) return;

    const seatsButtons = document.getElementsByClassName('btn__seat__pickup');

    Array.from(seatsButtons).forEach(seatButton => {
      seatButton.classList.remove('opacity-50');
    });

    const id = `${menuTab}_${seatId}`;

    document.getElementById(id)?.classList.remove('!opacity-100');
  };

  const handleRemoveSeatFromState = (seatId: number) => {
    const seatExistsInState =
      manageSelectedFloorSeats[
        menuTab === 'PISO_1'
          ? 'firstFloorSeatsSelected'
          : 'secondFloorSeatsSelected'
      ].includes(seatId);

    if (!seatExistsInState) return;

    // @ts-ignore
    setManageSelectedFloorSeats({
      ...manageSelectedFloorSeats,

      ...(menuTab === 'PISO_1'
        ? {
            // es piso 1
            firstFloorSeatsSelected: [
              ...manageSelectedFloorSeats.firstFloorSeatsSelected.filter(
                prevSeat => prevSeat !== seatId,
              ),
            ],
          }
        : {
            // es piso 2
            secondFloorSeatsSelected: [
              ...manageSelectedFloorSeats.secondFloorSeatsSelected.filter(
                prevSeat => prevSeat !== seatId,
              ),
              ,
            ],
          }),
    });
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

    const selectSeatIsActive =
      manageSelectedFloorSeats.addSeatsFirstFloorIsPressed ||
      manageSelectedFloorSeats.addSeatsSecondFloorIsPressed;

    const handleAddSeat = (seatId: number) => {
      if (!selectSeatIsActive) return;

      const seatExistsInState =
        manageSelectedFloorSeats[
          menuTab === 'PISO_1'
            ? 'firstFloorSeatsSelected'
            : 'secondFloorSeatsSelected'
        ].includes(seatId);

      // si el id del asiento seleccionada en el piso actual existe en el arreglo entonces ignorar
      if (seatExistsInState) return;

      setManageSelectedFloorSeats({
        ...manageSelectedFloorSeats,

        ...(menuTab === 'PISO_1'
          ? {
              // es piso 1
              firstFloorSeatsSelected: [
                ...manageSelectedFloorSeats.firstFloorSeatsSelected,

                seatId,
              ],
            }
          : {
              // es piso 2
              secondFloorSeatsSelected: [
                ...manageSelectedFloorSeats.secondFloorSeatsSelected,
                seatId,
              ],
            }),
      });
    };

    return (
      <Fragment>
        <div className="flex flex-grow items-center flex-col gap-4">
          <div className="flex flex-row gap-4">
            {firstSeatsColumn.map((floorsColumns, rowIndex) => {
              const colCount = 1 + rowIndex;

              return (
                <div
                  key={rowIndex}
                  className="flex flex-col gap-4"
                  data-col={`C${colCount}`}>
                  {floorsColumns.map((floorColumn, seatIndex) => {
                    const id = `${menuTab}_${floorColumn.id_seat}`;
                    const isSelected = manageSelectedFloorSeats[
                      menuTab === 'PISO_1'
                        ? 'firstFloorSeatsSelected'
                        : 'secondFloorSeatsSelected'
                    ].includes(floorColumn.id_seat);

                    return (
                      <button
                        key={seatIndex}
                        className={cn(
                          'relative transition-all btn__seat__pickup',
                          selectSeatIsActive &&
                            'opacity-50 hover:opacity-100 cursor-pointer',
                        )}
                        id={id}
                        onClick={() => {
                          handleAddSeat(floorColumn.id_seat);
                        }}>
                        <DefaultSeatIcon
                          seatBgColor={isSelected ? '#D6E6FF' : undefined}
                          seatBorderColor={isSelected ? '#4185EF' : undefined}
                        />
                        <span
                          className={cn(
                            'absolute block inset-0 top-1/4 font-medium',
                            isSelected
                              ? 'text-textStepsChecked'
                              : 'text-textMuted',
                          )}>
                          {floorColumn.id_seat}
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
                <div
                  key={rowIndex}
                  className="flex flex-col gap-4"
                  data-col={`C${colCount}`}>
                  {floorsColumns.map((floorColumn, seatIndex) => {
                    const id = `${menuTab}_${floorColumn.id_seat}`;
                    const isSelected = manageSelectedFloorSeats[
                      menuTab === 'PISO_1'
                        ? 'firstFloorSeatsSelected'
                        : 'secondFloorSeatsSelected'
                    ].includes(floorColumn.id_seat);

                    return (
                      <button
                        key={seatIndex}
                        className={cn(
                          'relative transition-all btn__seat__pickup',
                          selectSeatIsActive &&
                            'opacity-50 hover:opacity-100 cursor-pointer',
                        )}
                        id={id}
                        onClick={() => {
                          handleAddSeat(floorColumn.id_seat);
                        }}>
                        <DefaultSeatIcon
                          seatBgColor={isSelected ? '#D6E6FF' : undefined}
                          seatBorderColor={isSelected ? '#4185EF' : undefined}
                        />
                        <span
                          className={cn(
                            'absolute block inset-0 top-1/4 font-medium',
                            isSelected
                              ? 'text-textStepsChecked'
                              : 'text-textMuted',
                          )}>
                          {floorColumn.id_seat}
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
                Establecer Precios por Columna
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
                    <div className="flex justify-between">
                      <p className="uppercase text-sm text-textMuted">
                        precio base piso 1:
                      </p>
                      <strong className="text-sm">180.0</strong>
                    </div>

                    <div className="flex justify-between">
                      <p className="uppercase text-sm text-textMuted">
                        precio base piso 2:
                      </p>
                      <strong className="text-sm">140.0</strong>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="rounded-[25px] border-[0.5px] border-borderLayout p-7 flex flex-col gap-4">
                    <div>
                      <h4 className="uppercase text-base text-textStepsChecked font-medium">
                        Asientos Piso 1
                      </h4>

                      <div className="mt-4">
                        <label
                          htmlFor={`${uniqueId}-price-col1-input`}
                          className="block mb-1 font-medium text-sm text-textMuted">
                          Precio:
                        </label>

                        <input
                          type="text"
                          id={`${uniqueId}-price-col1-input`}
                          className="input w-full py-3 px-5 rounded-br11 bg-bgCommonInput text-sm text-black"
                          placeholder="S/."
                          required
                        />
                      </div>

                      <div className="mt-4">
                        <p className="block mb-1 font-medium text-sm text-textMuted">
                          Asientos:
                        </p>

                        <div className="flex gap-4 items-center flex-wrap">
                          {manageSelectedFloorSeats.firstFloorSeatsSelected.map(
                            (seatId, key) => (
                              <div
                                key={`${menuTab}-${seatId}`}
                                onMouseEnter={() => {
                                  handleSeatMouseEnter(seatId);
                                }}
                                onMouseLeave={() => {
                                  handleSeatMouseLeave(seatId);
                                }}
                                className="flex items-center bg-bgSeatChip text-textStepsChecked rounded-br18 px-4 py-2 gap-2 border border-textStepsChecked transition-colors hover:border-textSeatChipStrong hover:text-textSeatChipStrong hover:bg-bgSeatChipHover cursor-pointer">
                                <span className="text-textMuted text-sm cursor-default select-none">
                                  {seatId}
                                </span>

                                <button
                                  onClick={() =>
                                    handleRemoveSeatFromState(seatId)
                                  }>
                                  <CancelIcon />
                                </button>
                              </div>
                            ),
                          )}

                          <button
                            onClick={handleAddSeatsButton}
                            className={cn(
                              'btn border-none font-medium bg-primary hover:bg-secondary text-white',
                              manageSelectedFloorSeats.firstFloorSeatsSelected
                                .length
                                ? 'rounded-full'
                                : 'rounded-br18',
                            )}
                            disabled={menuTab !== 'PISO_1'}>
                            {manageSelectedFloorSeats.addSeatsFirstFloorIsPressed ? (
                              <CancelIcon />
                            ) : (
                              <AddIcon />
                            )}

                            {manageSelectedFloorSeats.firstFloorSeatsSelected
                              .length < 1
                              ? manageSelectedFloorSeats.addSeatsFirstFloorIsPressed
                                ? 'Cancelar'
                                : 'Añadir'
                              : null}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="divider"></div>

                    <div className="mt-4">
                      <h4 className="uppercase text-base text-textStepsChecked font-medium">
                        Asientos Piso 2
                      </h4>

                      <div className="mt-4">
                        <label
                          htmlFor={`${uniqueId}-price-col2-input`}
                          className="block mb-1 font-medium text-sm text-textMuted">
                          Precio:
                        </label>

                        <input
                          type="text"
                          id={`${uniqueId}-price-col2-input`}
                          className="input w-full py-3 px-5 rounded-br11 bg-bgCommonInput text-sm text-black"
                          placeholder="S/."
                          required
                        />
                      </div>

                      <div className="mt-4">
                        <p className="block mb-1 font-medium text-sm text-textMuted">
                          Asientos:
                        </p>

                        <div className="flex gap-4 items-center flex-wrap">
                          {manageSelectedFloorSeats.secondFloorSeatsSelected.map(
                            (seatId, key) => (
                              <div
                                key={`${menuTab}-${seatId}`}
                                onMouseEnter={() => {
                                  handleSeatMouseEnter(seatId);
                                }}
                                onMouseLeave={() => {
                                  handleSeatMouseLeave(seatId);
                                }}
                                className="flex items-center bg-bgSeatChip text-textStepsChecked rounded-br18 px-4 py-2 gap-2 border border-textStepsChecked transition-colors hover:border-textSeatChipStrong hover:text-textSeatChipStrong hover:bg-bgSeatChipHover cursor-pointer">
                                <span className="text-textMuted text-sm select-none">
                                  {seatId}
                                </span>

                                <button
                                  onClick={() =>
                                    handleRemoveSeatFromState(seatId)
                                  }>
                                  <CancelIcon />
                                </button>
                              </div>
                            ),
                          )}

                          <button
                            onClick={handleAddSeatsButton}
                            className={cn(
                              'btn border-none font-medium bg-primary hover:bg-secondary text-white',
                              manageSelectedFloorSeats.secondFloorSeatsSelected
                                .length
                                ? 'rounded-full'
                                : 'rounded-br18',
                            )}
                            disabled={menuTab !== 'PISO_2'}>
                            {manageSelectedFloorSeats.addSeatsSecondFloorIsPressed ? (
                              <CancelIcon />
                            ) : (
                              <AddIcon />
                            )}

                            {manageSelectedFloorSeats.secondFloorSeatsSelected
                              .length < 1
                              ? manageSelectedFloorSeats.addSeatsSecondFloorIsPressed
                                ? 'Cancelar'
                                : 'Añadir'
                              : null}
                          </button>
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
            href="/itinerary-admin/create/third-step">
            Atrás
          </Link>

          <button
            onClick={() => {
              alert('creado');
            }}
            className="btn rounded-[14px] bg-primary text-white hover:bg-secondary">
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateItineraryFourthPage;
