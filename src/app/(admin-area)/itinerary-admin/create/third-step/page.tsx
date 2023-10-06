'use client';

import {useId, useState, Fragment} from 'react';
import {cn} from '@/utils/cn';
import {CancelIcon} from '@/components/icon/CancelIcon';
import {
  Floor,
  BUS_FLOORS_ICONS,
  BUSES_SEATS_DATA,
  BUS_FLOORS_COUNT,
} from '../../data';
import Link from 'next/link';
import {DefaultSeatIcon} from '@/components/icon/DefaultSeatIcon';
import {AddIcon} from '@/components/icon/AddIcon';
import {Steps} from '../Steps';

type BusFloorMenuTabs = 'PISO_1' | 'PISO_2';

type SelectedColumnsType = {
  addColumnsFirstFloorIsPressed: boolean;
  addColumnsSecondFloorIsPressed: boolean;

  firstFloorColumnsSelected: string[];
  secondFloorColumnsSelected: string[];
};

const CreateItineraryThirdPage: React.FC = () => {
  const [menuTab, setMenuTab] = useState<BusFloorMenuTabs>('PISO_1');
  const [manageSelectedFloorColumns, setManageSelectedFloorColumns] =
    useState<SelectedColumnsType>({
      addColumnsFirstFloorIsPressed: false,
      addColumnsSecondFloorIsPressed: false,

      firstFloorColumnsSelected: [],
      secondFloorColumnsSelected: [],
    });
  const uniqueId = useId();

  const handleSwitchTab = (floor: BusFloorMenuTabs) => {
    setMenuTab(floor);
  };

  const handleAddColumnsButton = () => {
    if (menuTab === 'PISO_1') {
      setManageSelectedFloorColumns({
        ...manageSelectedFloorColumns,
        addColumnsSecondFloorIsPressed: false,

        addColumnsFirstFloorIsPressed:
          !manageSelectedFloorColumns.addColumnsFirstFloorIsPressed,
      });
    } else {
      setManageSelectedFloorColumns({
        ...manageSelectedFloorColumns,
        addColumnsFirstFloorIsPressed: false,

        addColumnsSecondFloorIsPressed:
          !manageSelectedFloorColumns.addColumnsSecondFloorIsPressed,
      });
    }
  };

  const handleRemoveColumnFromState = (column: string) => {
    const columnExistsInState =
      manageSelectedFloorColumns[
        menuTab === 'PISO_1'
          ? 'firstFloorColumnsSelected'
          : 'secondFloorColumnsSelected'
      ].includes(column);

    // si la columna seleccionada en el piso actual no existe en el arreglo entonces ignorar
    if (!columnExistsInState) return;

    // @ts-ignore
    setManageSelectedFloorColumns({
      ...manageSelectedFloorColumns,

      ...(menuTab === 'PISO_1'
        ? {
            // es piso 1
            firstFloorColumnsSelected: [
              ...manageSelectedFloorColumns.firstFloorColumnsSelected.filter(
                prevColumn => prevColumn !== column,
              ),
            ],
          }
        : {
            // es piso 2
            secondFloorColumnsSelected: [
              ...manageSelectedFloorColumns.secondFloorColumnsSelected.filter(
                prevColumn => prevColumn !== column,
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

    const selectColumnIsActive =
      manageSelectedFloorColumns.addColumnsFirstFloorIsPressed ||
      manageSelectedFloorColumns.addColumnsSecondFloorIsPressed;

    const handleAddColumns = (column: string) => {
      if (!selectColumnIsActive) return;

      const columnExistsInState =
        manageSelectedFloorColumns[
          menuTab === 'PISO_1'
            ? 'firstFloorColumnsSelected'
            : 'secondFloorColumnsSelected'
        ].includes(column);

      // si la columna seleccionada en el piso actual existe en el arreglo entonces ignorar
      if (columnExistsInState) return;

      setManageSelectedFloorColumns({
        ...manageSelectedFloorColumns,

        ...(menuTab === 'PISO_1'
          ? {
              // es piso 1
              firstFloorColumnsSelected: [
                ...manageSelectedFloorColumns.firstFloorColumnsSelected,

                column,
              ],
            }
          : {
              // es piso 2
              secondFloorColumnsSelected: [
                ...manageSelectedFloorColumns.secondFloorColumnsSelected,
                column,
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
                  className={cn(
                    'flex flex-col gap-4 transition-opacity',
                    selectColumnIsActive &&
                      'opacity-50 hover:opacity-100 cursor-pointer',
                  )}
                  data-col={`C${colCount}`}
                  onClick={() => {
                    handleAddColumns(`C${colCount}`);
                  }}>
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
                <div
                  key={rowIndex}
                  className={cn(
                    'flex flex-col gap-4 transition-opacity',
                    selectColumnIsActive &&
                      'opacity-50 hover:opacity-100 cursor-pointer',
                  )}
                  data-col-id={`C${colCount}`}
                  onClick={() => {
                    handleAddColumns(`C${colCount}`);
                  }}>
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
                        Columna Piso 1
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
                          Columnas:
                        </p>

                        <div className="flex gap-4 items-center">
                          {manageSelectedFloorColumns.firstFloorColumnsSelected.map(
                            (columnId, key) => (
                              <div
                                key={`${menuTab}-${columnId}`}
                                className="flex items-center bg-bgColumnButtonBackground text-btnWarning rounded-br18 px-4 py-2 gap-2 border border-btnWarning">
                                <span className="text-textMuted text-sm cursor-default select-none">
                                  {columnId}
                                </span>

                                <button
                                  onClick={() =>
                                    handleRemoveColumnFromState(columnId)
                                  }>
                                  <CancelIcon />
                                </button>
                              </div>
                            ),
                          )}

                          <button
                            onClick={handleAddColumnsButton}
                            className={cn(
                              'btn border-none font-medium bg-btnWarning text-white hover:bg-btnWarning/90',
                              manageSelectedFloorColumns
                                .firstFloorColumnsSelected.length
                                ? 'rounded-full'
                                : 'rounded-br18',
                            )}
                            disabled={menuTab !== 'PISO_1'}>
                            {manageSelectedFloorColumns.addColumnsFirstFloorIsPressed ? (
                              <CancelIcon />
                            ) : (
                              <AddIcon />
                            )}

                            {manageSelectedFloorColumns
                              .firstFloorColumnsSelected.length < 1
                              ? manageSelectedFloorColumns.addColumnsFirstFloorIsPressed
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
                        Columna Piso 2
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
                          Columnas:
                        </p>

                        <div className="flex gap-4 items-center">
                          {manageSelectedFloorColumns.secondFloorColumnsSelected.map(
                            (columnId, key) => (
                              <div
                                key={`${menuTab}-${columnId}`}
                                className="flex items-center bg-bgColumnButtonBackground text-btnWarning rounded-br18 px-4 py-2 gap-2 border border-btnWarning">
                                <span className="text-textMuted text-sm cursor-default select-none">
                                  {columnId}
                                </span>

                                <button
                                  onClick={() =>
                                    handleRemoveColumnFromState(columnId)
                                  }>
                                  <CancelIcon />
                                </button>
                              </div>
                            ),
                          )}

                          <button
                            onClick={handleAddColumnsButton}
                            className={cn(
                              'btn border-none font-medium bg-btnWarning text-white hover:bg-btnWarning/90',
                              manageSelectedFloorColumns
                                .secondFloorColumnsSelected.length
                                ? 'rounded-full'
                                : 'rounded-br18',
                            )}
                            disabled={menuTab !== 'PISO_2'}>
                            {manageSelectedFloorColumns.addColumnsSecondFloorIsPressed ? (
                              <CancelIcon />
                            ) : (
                              <AddIcon />
                            )}

                            {manageSelectedFloorColumns
                              .secondFloorColumnsSelected.length < 1
                              ? manageSelectedFloorColumns.addColumnsSecondFloorIsPressed
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
            href="/itinerary-admin/create/second-step">
            Atrás
          </Link>

          <Link
            href="/itinerary-admin/create/fourth-step"
            className="btn rounded-[14px] bg-primary text-white hover:bg-secondary">
            Continuar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateItineraryThirdPage;
