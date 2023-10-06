'use client';

import { FaTimes } from 'react-icons/fa';
import Stairs from '@/assets/svg/stairs.svg';
import Stair from '@/assets/svg/stair.svg';
import StairTaken from '@/assets/svg/stairtaken.svg';
import StairSelected from '@/assets/svg/stairselected.svg';
import WC from '@/assets/svg/wc.svg';
import { AiOutlineArrowUp } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import { useGetItineraryQuery } from '@/redux/services/itinerariesApi';
import { useGetSeatsQuery } from '@/redux/services/seatsApi';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Fragment, useId, useState } from 'react';
import { cn } from '@/utils/cn';

import { changeSeats, changeTotalSeats } from '@/redux/features/seatsSlice';
import seatsSlice from '../../../../redux/features/seatsSlice';
import TableItineraries from '../itinerary/components/table';
import {
  Floor,
  BUS_FLOORS_ICONS,
  // BUSES_SEATS_DATA,
  BusesSeatsData,
  BUS_FLOORS_COUNT,
} from '@/app/(admin-area)/ticket-sales/seatingup/data';
import { DefaultSeatIcon } from '@/components/icon/DefaultSeatIcon';
import { CancelIcon } from '@/components/icon/CancelIcon';
type BusFloorMenuTabs = 'PISO_1' | 'PISO_2';

const SeatingUp: React.FC = () => {

  const dispatch = useAppDispatch();

  const selecttrip = useAppSelector((state: any) => state.selectTrip.value);
  const [menuTab, setMenuTab] = useState<BusFloorMenuTabs>('PISO_1');

  const [seat, setSeats] = useState([]);

  const totalSteats = useAppSelector(
    (state: any) => state.seatsReserved.totalSeats,
  );

  const seats1 = useAppSelector((state) => state.seatsReserved.seats)
  
  const { data: itinerary, error: errorItinerary } =
    useGetItineraryQuery(selecttrip);


  const BUSES_SEATS_DATA: BusesSeatsData = itinerary?.itinerary['seats'] ?? {}

  type SelectedSeatsType = {
    addSeatsFirstFloorIsPressed: boolean;
    addSeatsSecondFloorIsPressed: boolean;

    firstFloorSeatsSelected: any[];
    secondFloorSeatsSelected: any[];
  };
  const [manageSelectedFloorSeats, setManageSelectedFloorSeats] =
    useState<SelectedSeatsType>({
      addSeatsFirstFloorIsPressed: true,
      addSeatsSecondFloorIsPressed: true,

      firstFloorSeatsSelected: [],
      secondFloorSeatsSelected: [],
    });

  const { data: seats, error: errorSeats } = useGetSeatsQuery(
    itinerary?.itinerary['default_bus'],
  );
  const router = useRouter();
  const backPage = async () => {
    router.push('/ticket-sales/itinerary');
  };
  const nextPage = async () => {
    router.push('/ticket-sales/datacustomer');
  };
  const closePage = async () => {
    router.push('/ticket-sales/');
  };

  const fecha = new Date(itinerary?.itinerary['valid_since']);
  const diasDeLaSemana = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ];
  const mesesdelanio = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];


  const dia = fecha.getUTCDate();
  const mes = fecha.getUTCMonth(); // Agrega 1 ya que los meses se indexan desde 0
  const anio = fecha.getUTCFullYear();
  const hora = fecha.getUTCHours();
  const minutos = fecha.getUTCMinutes();
  const segundos = fecha.getUTCSeconds();
  const destination_name = useAppSelector(state => state.ItinerarySelected.cityDestination);
  const origin_name = useAppSelector(state => state.ItinerarySelected.cityOrigin);
  const nombreDelDia = diasDeLaSemana[fecha.getDay()];
  const mesdelanio = mesesdelanio[mes];
  // const seats123 = useAppSelector(state => state.seatsReserved.seats);
  // console.log(seats123)
  // Formatea la fecha y la hora en el formato deseado
  const fechaFormateada = `${anio}-${mes < 10 ? '0' : ''}${mes}-${dia < 10 ? '0' : ''
    }${dia}`;
  const horaFormateada = `${hora < 10 ? '0' : ''}${hora}:${minutos < 10 ? '0' : ''
    }${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;

  const fechaYHoraFormateadas = `${fechaFormateada} ${horaFormateada}`;
  const handleSwitchTab = (floor: BusFloorMenuTabs) => {
    setMenuTab(floor);
  };
  let arr: any[] = [];

  // const deleteSeats = (id: any) => {
  //   const nuevoArreglo = seat.filter(objeto => objeto.id_seat !== id);
  //   setSeats(nuevoArreglo);
  //   console.log('----Salida-----');
  //   console.log(seat.length);
  //   console.log(arr.length);
  //   console.log('----Salida-----');

  //   dispatch(changeTotalSeats(seat.length - 1));
  // };

  const selectSeatIsActive =
  manageSelectedFloorSeats.addSeatsFirstFloorIsPressed ||
  manageSelectedFloorSeats.addSeatsSecondFloorIsPressed;
  
  let oa = manageSelectedFloorSeats.firstFloorSeatsSelected 
  let oe = manageSelectedFloorSeats.secondFloorSeatsSelected
  console.log(oa)
  console.log(oe)
  console.log(seats1)

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
                  className="flex flex-col gap-4"
                  data-col={`C${colCount}`}>
                  {floorsColumns.map((floorColumn, seatIndex) => {
                    const id = `${menuTab}_${floorColumn.id_seat}`;
                    // const isSelected = manageSelectedFloorSeats[
                    //   menuTab === 'PISO_1'
                    //     ? 'firstFloorSeatsSelected'
                    //     : 'secondFloorSeatsSelected'
                    // ].includes(floorColumn.id_seat);
                    const objBuscado = { "seatId": floorColumn.id_seat }
                    const isSelected = manageSelectedFloorSeats[
                      menuTab === 'PISO_1'
                        ? 'firstFloorSeatsSelected'
                        : 'secondFloorSeatsSelected'].some((objeto) => {
                          return objeto.seatId === objBuscado.seatId;
                        });

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
                          floorColumn.ticket == '' ? handleAddSeat(floorColumn.id_seat, floorColumn.price, floorColumn.seat_number, floorColumn.seat_type, floorColumn.ticket) : ''
                          
                        }}>
                        {
                          <DefaultSeatIcon
                            seatBgColor={
                              isSelected ? '#D6E6FF' :
                                floorColumn.ticket == '' ?
                                  undefined
                                  : '#45454a'}

                            seatBorderColor={isSelected ? '#4185EF' :
                              floorColumn.ticket == '' ?
                                undefined
                                : '#000000'}
                          />
                        }

                        <span
                          className={cn(
                            'absolute block inset-0 top-1/4 font-medium',
                            isSelected
                              ? 'text-textStepsChecked'
                              : 'text-textMuted',
                          )}>
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
                  className="flex flex-col gap-4"
                  data-col={`C${colCount}`}>
                  {floorsColumns.map((floorColumn, seatIndex) => {
                    const id = `${menuTab}_${floorColumn.id_seat}`;
                    // const isSelected = manageSelectedFloorSeats[
                    //   menuTab === 'PISO_1'
                    //     ? 'firstFloorSeatsSelected'
                    //     : 'secondFloorSeatsSelected'
                    // ].includes(floorColumn.id_seat);
                    const objBuscado = { "seatId": floorColumn.id_seat }
                    const isSelected = manageSelectedFloorSeats[menuTab === 'PISO_1'
                      ? 'firstFloorSeatsSelected'
                      : 'secondFloorSeatsSelected'].some((objeto) => {
                        // Comparar las propiedades relevantes para determinar la igualdad
                        return objeto.seatId === objBuscado.seatId;
                      });

                    return (
                      <button
                        key={seatIndex}
                        className={cn(
                          'relative transition-all btn__seat__pickup ',
                          selectSeatIsActive &&
                          'opacity-50 hover:opacity-100 cursor-pointer ',
                        )}
                        id={id}
                        onClick={() => {
                          floorColumn.ticket == '' ? handleAddSeat(floorColumn.id_seat, floorColumn.price, floorColumn.seat_number, floorColumn.seat_type, floorColumn.ticket) : ''
                          
                        }}>
                        {

                          <DefaultSeatIcon
                            seatBgColor={
                              isSelected ? '#D6E6FF' :
                                floorColumn.ticket == '' ?
                                  undefined
                                  : '#45454a'}

                            seatBorderColor={isSelected ? '#4185EF' :
                              floorColumn.ticket == '' ?
                                undefined
                                : '#000000'}
                          />
                        }
                        <span
                          className={cn(
                            'absolute block inset-0 top-1/4 font-medium',
                            isSelected
                              ? 'text-textStepsChecked'
                              : 'text-textMuted',
                          )}>
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

  const handleRemoveSeatFromState = (seatId: number) => {
    const objBuscado = { "seatId": seatId }
    const seatExistsInState = manageSelectedFloorSeats[menuTab === 'PISO_1'
      ? 'firstFloorSeatsSelected'
      : 'secondFloorSeatsSelected'].some((objeto) => {
        // Comparar las propiedades relevantes para determinar la igualdad
        return objeto.seatId === objBuscado.seatId;
      });
    console.log("handleRemoveSeatFromStatehandleRemoveSeatFromState")
    console.log(seatExistsInState)
    console.log(seatId)  
    if (!seatExistsInState) return;

    // @ts-ignore
    setManageSelectedFloorSeats({
      ...manageSelectedFloorSeats,

      ...(menuTab === 'PISO_1'
        ? {
          // es piso 1
          firstFloorSeatsSelected: [
            ...manageSelectedFloorSeats.firstFloorSeatsSelected.filter(
              prevSeat => prevSeat.seatId !== seatId,
            ),
          ],
        }
        : {
          // es piso 2
          secondFloorSeatsSelected: [
            ...manageSelectedFloorSeats.secondFloorSeatsSelected.filter(
              prevSeat => prevSeat.seatId !== seatId,
            ),
            ,
          ],
        }),
    });
    dispatch(changeTotalSeats(manageSelectedFloorSeats.firstFloorSeatsSelected.length + manageSelectedFloorSeats.secondFloorSeatsSelected.length - 1));
    dispatch(changeSeats(manageSelectedFloorSeats.firstFloorSeatsSelected.concat(manageSelectedFloorSeats.secondFloorSeatsSelected)))
  };

  const handleAddSeat = (seatId: number, price: string, numberSeat: string, typeSeat: string, ticket: any) => {
    console.log("handleAddSeathandleAddSeat")
    console.log(manageSelectedFloorSeats.firstFloorSeatsSelected)
    console.log(seatId)
    if (!selectSeatIsActive) return;
    const objBuscado = { "seatId": seatId }
    // const seatExistsInState =
    //   manageSelectedFloorSeats[
    //     menuTab === 'PISO_1'
    //       ? 'firstFloorSeatsSelected'
    //       : 'secondFloorSeatsSelected'
    //   ].includes(seatId);
    const seatExistsInState = manageSelectedFloorSeats[menuTab === 'PISO_1'
      ? 'firstFloorSeatsSelected'
      : 'secondFloorSeatsSelected'].some((objeto) => {
        return objeto.seatId === objBuscado.seatId;
      });
    // si el id del asiento seleccionada en el piso actual existe en el arreglo entonces ignorar
    console.log(seatExistsInState)
    if (seatExistsInState) return;
  
    setManageSelectedFloorSeats({
      ...manageSelectedFloorSeats,
  
      ...(menuTab === 'PISO_1'
        ? {
          // es piso 1
          firstFloorSeatsSelected: [
            ...manageSelectedFloorSeats.firstFloorSeatsSelected,
  
            { "seatId": seatId, "price": price, "numberSeat": numberSeat, "typeSeat": typeSeat, "ticket": ticket },
          ],
        }
        : {
          // es piso 2
          secondFloorSeatsSelected: [
            ...manageSelectedFloorSeats.secondFloorSeatsSelected,
            { "seatId": seatId, "price": price, "numberSeat": numberSeat, "typeSeat": typeSeat, "ticket": ticket },
          ],
        }),
    });
    dispatch(changeTotalSeats(manageSelectedFloorSeats.firstFloorSeatsSelected.length + manageSelectedFloorSeats.secondFloorSeatsSelected.length + 1));
    dispatch(changeSeats(manageSelectedFloorSeats.firstFloorSeatsSelected.concat(manageSelectedFloorSeats.secondFloorSeatsSelected)))
    
    
  };

  return (
    <div>
      <div className="bg-white p-4">
        <div className="flex flex-row justify-between items-center p-4">
          <h2 className="text-xl font-bold text-primary">Itinerario</h2>
          <button onClick={closePage} className="btn btn-outline py-0 ">
            <FaTimes className="mr-2 " />
            <span> Cancelar</span>
          </button>
        </div>
        <div className="flex">
          <div className="">
            <div className="flex items-center mr-8 mb-4">
              <div className="p-1 mr-4 rounded-full bg-bgblack text-md">
                <AiOutlineArrowUp className="text-white" />
              </div>
              <div className="">
                <div className="text-md font-medium">IDA</div>
              </div>
            </div>
            <div className="text-medium text-xs">Fecha de salida:</div>
            <div className="text-primary text-xs uppercase">
              {`${nombreDelDia} ${dia} ${mesdelanio} ${anio}`}
            </div>
          </div>

          <div className="mx-8 grow flex items-center">
            <div className="collapse bg-white border border-primary">
              <input type="checkbox" />
              <div className="collapse-title text-sm font-medium">
                {itinerary?.itinerary['arrival_time']} General MIN S/ 80.0
              </div>
              <div className="collapse-content">
                <div className="mt-8 overflow-auto">
                  <TableItineraries />
                </div>
              </div>
            </div>
          </div>
          <div className=" flex items-center w-48">
            <div className="">
              <div className="text-sm">
                <span className="font-bold">Embarque: </span> {destination_name}
              </div>
              <div className="text-sm">
                <span className="font-bold">Desembarque: </span> {origin_name}

              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 mt-8 space-x-4">
        <div className="flex flex-1 flex-col p-4">
          {/** Tabs */}
          <div className="mt-6">
            <div>
              <div className="tabs tabs-boxed rounded-[14px]">
                {BUS_FLOORS_COUNT.map(({ key, title }, keyMap) => (
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
              {
                itinerary?.itinerary['seats'] != undefined ?
                  menuTab === 'PISO_1'
                    ? renderSeats(BUSES_SEATS_DATA.firstFloor)
                    : renderSeats(BUSES_SEATS_DATA.secondFloor)
                  :
                  ''

              }
            </div>
          </div>
        </div>

        <div className="justify-center bg-fixed">
          <div className="grid grid-cols-3 justify-center">
            <div className="flex ">
              <div className="w-5 h-5 border bg-bginput rounded-md mr-4"></div>{' '}
              Libres
            </div>
            <div className="flex ">
              <div className="w-5 h-5 border border-black  bg-bgChipMuted rounded-md mr-4"></div>{' '}
              Ocupados
            </div>
            <div className="flex ">
              <div className="w-5 h-5 border bg-thcolor border-secondary rounded-md mr-4"></div>{' '}
              Seleccionados
            </div>
          </div>

          <div className="bg-white w-full p-4 shadow rounded-xl mt-8">
            <div className="font-medium my-4">ASIENTOS SELECCIONADOS</div>
            <div className="grid grid-cols-2">
              {/* {seat.map(e => {
                return (
                  <div className="flex items-center mt-4">
                    <div className="flex justify-center items-center rounded-xl border border-primary bg-thcolor w-12 h-12 text-primary font-medium">
                      {e.seat_number}
                    </div>
                    <div className="ml-4">
                      <div className="">
                        Servicio
                        {e.seat_type == 'special_needs'
                          ? ' Asientos especial'
                          : e.seat_type == 'VIP'
                          ? ' VIP'
                          : ' Normal'}
                        - P{e.floor}
                      </div>
                      <div className="font-medium">S/.150.0</div>
                    </div>
                  </div>
                );
              })} */}
              {manageSelectedFloorSeats.secondFloorSeatsSelected.map(
                (seatId, key) => (
                  <div
                    key={`${menuTab}-${seatId}`}
                    onMouseEnter={() => {
                      // handleSeatMouseEnter(seatId);
                    }}
                    onMouseLeave={() => {
                      // handleSeatMouseLeave(seatId);
                    }}
                    className="flex items-center  text-textStepsChecked gap-2 transition-colors hover:border-textSeatChipStrong hover:text-textSeatChipStrong cursor-pointer">
                    <div className="flex items-center mt-4 pr-5">
                      <div className="flex justify-center items-center rounded-xl border border-primary bg-thcolor w-12 h-12 text-primary font-medium">
                        {seatId.numberSeat}
                      </div>
                      <div className="ml-4">
                        <div className="">
                          Servicio
                          {seatId.typeSeat == 'special_needs'
                            ? ' Asientos especial'
                            : seatId.typeSeat == 'VIP'
                              ? ' VIP'
                              : ' Normal'}
                        </div>
                        <div className="font-medium">S/.{seatId.price}</div>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        handleRemoveSeatFromState(seatId.seatId)
                      }>
                      <CancelIcon />
                    </button>
                  </div>
                ),
              )}
              {manageSelectedFloorSeats.firstFloorSeatsSelected.map(
                (seatId, key) => (
                  <div
                    key={`${menuTab}-${seatId}`}
                    onMouseEnter={() => {
                      // handleSeatMouseEnter(seatId);
                    }}
                    onMouseLeave={() => {
                      // handleSeatMouseLeave(seatId);
                    }}
                    className="flex items-center  text-textStepsChecked gap-2 transition-colors hover:border-textSeatChipStrong hover:text-textSeatChipStrong cursor-pointer">
                    <div className="flex items-center mt-4 pr-5">
                      <div className="flex justify-center items-center rounded-xl border border-primary bg-thcolor w-12 h-12 text-primary font-medium">
                        {seatId.numberSeat}
                      </div>
                      <div className="ml-4">
                        <div className="">
                          Servicio
                          {seatId.typeSeat == 'special_needs'
                            ? ' Asientos especial'
                            : seatId.typeSeat == 'VIP'
                              ? ' VIP'
                              : ' Normal'}
                        </div>
                        <div className="font-medium">S/.{seatId.price}</div>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        handleRemoveSeatFromState(seatId.seatId)
                      }>
                      <CancelIcon />
                    </button>
                  </div>
                ),
              )}
            </div>

            <div className="grid grid-cols-2  ">
              <div></div>
              <div className="flex flex-col items-end">
                <div className="">VIAJE DIA</div>
                <div>Subtotal: S/ {manageSelectedFloorSeats.firstFloorSeatsSelected.reduce((total, objeto) => total + parseFloat(objeto.price) , 0) }</div>
                <div className="border-t w-full border-black my-2"></div>
                <div className="text-xl font-bold">
                  TOTAL: S/ {manageSelectedFloorSeats.firstFloorSeatsSelected.reduce((total, objeto) => total + parseFloat(objeto.price) , 0) }
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 mt-8 ">
              <button
                onClick={backPage}
                className="m-2 btn btn-outline hover:bg-primary hover:border-white text-primary normal-case font-medium rounded-xl">
                Atrás
              </button>
              <button
                onClick={nextPage}
                className=" m-2 btn btn-info bg-primary hover:bg-secondary text-white rounded-xl border-white normal-case font-medium">
                Continuar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatingUp;