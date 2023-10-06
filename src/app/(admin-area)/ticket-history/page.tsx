'use client';

import { FaPlus } from 'react-icons/fa';
import { Grid } from 'gridjs-react';
import SearchIcon from '@/assets/svg/search.svg';
import { CalendarIcon } from './components/CalendarIcon';
import { _ } from 'gridjs-react';
import { BiTrash } from 'react-icons/bi';
import { HiOutlinePencil } from 'react-icons/hi';
import { FiPower } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { changeValidHistory } from '@/redux/features/historySlice';
import TableCustom from '@/components/Table';
import Swal from 'sweetalert2';
import { useAxios } from '@/modules/axios/axios.hook';
const TicketHistoryPage: React.FC = () => {
  const fechaActual = new Date();

  const router = useRouter();

  const dispatch = useAppDispatch()

  const nextPage = (bool: boolean) => {
    console.log(bool)
    router.push('/ticket-history/1');
    dispatch(changeValidHistory(bool))
  };

  const [{ loading: deleteCityIsLoading }, executeDeleteCity] = useAxios(
    {
      method: 'DELETE',
    },
    {
      manual: true,
    },
  );

  const deleteTicket = (ticket: string, fecha: string) => {

    fecha != null ? Swal.fire({
      position: 'center',
      icon: 'info',
      title: 'Ticket ya anulado',
      showConfirmButton: false,
      timer: 1500
    }) :
      Swal.fire({
        icon: 'info',
        title: '¿Esta seguro que quiere anular este pasaje?',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'Cancelar',
      }).then(async result => {
        if (result.isConfirmed) {
          try {
            const deleteCityResponse = await executeDeleteCity({
              url: `/tickets/pdf/annular/${ticket}`,
            });

            Swal.fire('Borrado Correctamente', '', 'success');
          } catch (error: any) {
            // Handle Create error
            console.error('Create failed:', error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              timer: 2000,
              text: 'Credenciales incorrectas',
            });
          }
        }
      });
  }

  const totalSteats = useAppSelector((state: any) => state.validHistory.value)
  return (
    <div className="flex flex-col">
      {/** Heading */}
      <div className="flex flex-row justify-between">
        <div className="p-4">
          <h2 className="text-xl font-bold text-primary">
            Historial de pasajes
          </h2>
        </div>
      </div>

      {/** Select and search input */}
      {/* <div className="flex flex-row justify-between items-center mt-8 mb-8">
        <div className="">
          <div className="flex items-center">
            Mostrar
            <select className="select max-w-xs mx-4">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
            entradas
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div>
            <button className="btn rounded-[12px] bg-bgSearchInput text-sm normal-case font-normal">
              <CalendarIcon /> Filtrar por fechas
            </button>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Buscar"
              className="input bg-bgSearchInput ml-4 pr-10"
            />
            <div className="absolute top-0 right-0">
              <span className="inline-flex items-center justify-center h-12 px-4">
                <SearchIcon />
              </span>
            </div>
          </div>
        </div>
      </div> */}

      {/** Table */}
      <div className="w-full overflow-auto pt-8">
        {/* <Grid
          style={{width: '100%'}}
          data={[
            [
              '70909816',
              'Piero Vasquez Riveros',
              'Lima',
              'Ayacucho',
              'S/. 150.0',
              'Activo',
              _(
                <div className="flex">
                  <button
                    className={
                      'h-10 w-10 border rounded-xl text-white text-xl flex items-center justify-center bg-primary'
                    }
                    onClick={() => {nextPage(false)}}>
                    <HiOutlinePencil />
                  </button>
                 
                  
                </div>,
              ),
            ],
            [
              '45264836',
              'Torres Alayo, Miguel',
              'Carhuamayo, Pasco',
              'trujillo, trujillo',
              'S/. 70.0',
              'Activo',
              _(
                <div className="flex">
                  <button
                    className={
                      'h-10 w-10 border rounded-xl text-white text-xl flex items-center justify-center bg-primary'
                    }
                    onClick={() => {nextPage(false)}}>
                    <HiOutlinePencil />
                  </button>
                 
                </div>,
              ),
            ],
            [
              '45263482',
              'Tamay Garrido, Pamela',
              'ayacucho',
              'trujillo, trujillo',
              'S/. 80.0',
              'Vencido',
              _(
                <div className="flex">
                  <button
                    className={
                      'h-10 w-10 border rounded-xl text-white text-xl flex items-center justify-center bg-primary'
                    }
                    onClick={() => {nextPage(false)}}>
                    <HiOutlinePencil />
                  </button>
                  
                </div>,
              ),
            ],
            [
              '84253616',
              'Sánchez burgos, Diego',
              'Carhuamayo, Pasco',
              'chupaca, junín',
              'S/. 80.0',
              'Anulado',
              _(
                <div className="flex">
                  <button
                    className={
                      'h-10 w-10 border rounded-xl text-white text-xl flex items-center justify-center bg-primary'
                    }
                    onClick={() => {nextPage(true)}}>
                    <HiOutlinePencil />
                  </button>
                </div>,
              ),
            ],
            [
              '70593428',
              'arana rodriguez, luciana ',
              'evitamiento, huancayo',
              'Lima, lima',
              'S/. 20.0',
              'Anulado',
              _(
                <div className="flex">
                  <button
                    className={
                      'h-10 w-10 border rounded-xl text-white text-xl flex items-center justify-center bg-primary'
                    }
                    onClick={() => {nextPage(true)}}>
                    <HiOutlinePencil />
                  </button>
                 
                </div>,
              ),
            ],
          ]}
          columns={[
            'DNI',
            'NOMBRES',
            'ORIGEN',
            'DESTINO',
            'PRECIO',
            'ESTADO',
            'ACCIONES',
          ]}
          search={false}
          pagination={false}
        /> */}
        <TableCustom
          columns={['DOCUMENTO', 'NOMBRE', 'ORIGEN', 'DESTINO', 'ESTADO', 'ANULAR']}
          method={'GET'}
          data={(data: {
            tickets: {
              id_ticket: string
              travel_date: any;
              deleted_at: any;
              sale: any;
              passenger_data: {
                name: string;
                document: string;
                document_type: string;
              };
              booking: {
                itinerary: {
                  route: {
                    office_origin: {
                      office_name: string;
                    };
                    office_destination: {
                      office_name: string;
                    }
                  }
                }
              };

            }[];
          }) =>
            data.tickets.map(
              (tickets: {
                id_ticket: string;
                travel_date: any;
                deleted_at: any;
                sale: any;
                passenger_data: {
                  name: string;
                  document: string;
                  document_type: string;
                };
                booking: {
                  itinerary: {
                    route: {
                      office_origin: {
                        office_name: string;
                      };
                      office_destination: {
                        office_name: string;
                      }
                    }
                  }
                }
              }) => [
                  tickets.passenger_data.document,
                  tickets.passenger_data.name,
                  tickets.booking.itinerary.route.office_origin.office_name,
                  tickets.booking.itinerary.route.office_destination.office_name,
                  _(
                    tickets.deleted_at == null ?
                      new Date(tickets.travel_date) < fechaActual ? <div className='font-bold text-textGreen'>VENCIDO</div> : <div className='font-bold text-textGreen'>ACTIVO</div> : <div className='font-bold text-[#888890]'>ANULADO</div>,
                  ),

                  _(

                    <div className="flex justify-center">
                      <button
                        className={
                          'h-10 w-10 border rounded-xl text-white text-xl flex items-center justify-center bg-bgred'
                        }
                        onClick={async () => {
                          deleteTicket(tickets.id_ticket, tickets.deleted_at)
                        }}>
                        <BiTrash />
                      </button>
                    </div>
                  ),
                ],
            )
          }
          link={`${process.env.API_URL}/tickets/pdf/list`}
        />
      </div>
    </div>
  );
};

export default TicketHistoryPage;