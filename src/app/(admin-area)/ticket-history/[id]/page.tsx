'use client';

import {useId} from 'react';
import {useParams} from 'next/navigation';
import {EditIcon} from './components/EditIcon';
import {CalendarIcon} from './components/CalendarIcon';
import {PassengerSeatIcon} from './components/PassengerSeatIcon';
import {BlockIcon} from './components/BlockIcon';
import {ContractIcon} from './components/ContractIcon';
import {cn} from '@/utils/cn';
import {ErrorIcon} from './components/ErrorIcon';
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import validHistorySlice from '../../../../redux/features/historySlice';

const TicketHistoryDetailsPage: React.FC = () => {
  const uniqueId = useId();
  const params = useParams();
  const ticketId = params.id as string;

  const totalSteats = useAppSelector((state: any) => state.validHistory.value)
  console.log(totalSteats)
  const ticketIsCancelled = totalSteats;

  // aquí hacer llamada al backend para saber si este id es válido y si existe
  // ...

  return (
    <div className="flex flex-col pb-32 relative">
      <div className="fixed top-1/3 right-4 sm:right-6 md:right-8">
        <div className="shadow-lg bg-white p-2 rounded-[37px]">
          <ul className="space-y-1">
            {/** TODO: cuando se conecte al backend pasar estos iconos a un arreglo para así poder manejarlo mejor y tener un código más limpio, además también quitar algunos iconos en base a la condición del pasaje (anulado, etc) */}
            <li className="bg-[#4185EF26] rounded-[25px] px-3 py-5 cursor-pointer">
              <EditIcon />
            </li>
            <li className="rounded-[25px] px-3 py-5 cursor-pointer">
              <CalendarIcon />
            </li>
            <li className="rounded-[25px] px-3 py-5 cursor-pointer">
              <PassengerSeatIcon />
            </li>
            <li
              className="rounded-[25px] px-3 py-5 cursor-pointer"
              onClick={() => {
                // @ts-ignore
                window[`${uniqueId}-cancel-ticket-modal`].showModal();
              }}>
              <BlockIcon />
            </li>
            <li className="rounded-[25px] px-3 py-5 cursor-pointer">
              <ContractIcon />
            </li>
          </ul>
        </div>
      </div>
      {/** Heading */}
      <div className="flex flex-row justify-between">
        <div className="flex gap-6 items-end">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold text-textMuted">
              Detalles del pasaje
            </h2>

            <p className="text-sm text-textMuted">
              Boleto: <span className="font-medium">Lopez Santos Martín</span>
            </p>
          </div>

          <span
            className={cn(
              'badge rounded-[16px] px-6 py-4 font-medium cursor-default',
              ticketIsCancelled
                ? 'text-bgAlertMessage bg-[#ED6F471A]'
                : 'bg-[#34D1901A] text-textGreen',
            )}>
            {ticketIsCancelled ? 'Anulado' : 'Activo'}
          </span>
        </div>

        {!ticketIsCancelled ? (
          <div className="flex items-center justify-center">
            <span className="badge text-sm py-6 px-4 border border-borderLayout bg-transparent">
              Ultima modificación:{' '}
              <span className="text-primary ml-1 font-medium">02/08/2023</span>
            </span>
          </div>
        ) : null}
      </div>

      {ticketIsCancelled ? (
        <div className="mt-10">
          <div className="flex border-bgAlertMessage border-[0.5px] rounded-[20px] px-6 py-4 gap-3 items-center">
            <ErrorIcon />

            <div className="flex flex-col gap-1">
              <h3 className="text-textMuted font-medium text-sm">
                Motivo de anulación
              </h3>
              <p className="text-textMuted text-sm">
                Complicaciones en el horario del pasajero.
              </p>
            </div>
          </div>
        </div>
      ) : null}

      {/** Contenido */}
      <div className="mt-10 flex-col flex">
        <div className="flex flex-col">
          <h3 className="text-primary text-sm font-medium uppercase">
            Información de Ticket
          </h3>

          <div className="flex mt-4">
            <div className="flex flex-1">
              <ul className="space-y-2">
                <li className="text-sm text-textMuted">
                  <span className="font-medium">Id Ticket:</span> 637
                </li>
                <li className="text-sm text-textMuted">
                  <span className="font-medium">Estado:</span> Vendido
                </li>
                <li className="text-sm text-textMuted">
                  <span className="font-medium">Fecha de compra:</span>{' '}
                  28/09/2018 01:32PM
                </li>
                <li className="text-sm text-textMuted">
                  <span className="font-medium">Serie - correlativo:</span>{' '}
                  0001-00000245
                </li>
              </ul>
            </div>
            <div className="flex flex-1">
              <ul className="space-y-2">
                <li className="text-sm text-textMuted">
                  <span className="font-medium">Método de pago:</span> Efectivo
                </li>
              </ul>
            </div>

            {/** si no hay para completar debe estar vacío para mantener la jerarquía del flex */}
            <div className="flex flex-1"></div>
          </div>
        </div>

        <div className="divider"></div>

        <div className="flex flex-col">
          <h3 className="text-primary text-sm font-medium uppercase">
            Información de Viaje
          </h3>

          <div className="flex mt-4">
            <div className="flex flex-1">
              <ul className="space-y-2">
                <li className="text-sm text-textMuted">
                  <span className="font-medium">Origen:</span> Trujillo. La
                  Libertad
                </li>
                <li className="text-sm text-textMuted">
                  <span className="font-medium">Of. de origen:</span> -
                </li>
                <li className="text-sm text-textMuted">
                  <span className="font-medium">Destino:</span> Lima, Lima
                </li>
                <li className="text-sm text-textMuted">
                  <span className="font-medium">Oficina de destino:</span> -
                </li>
              </ul>
            </div>
            <div className="flex flex-1">
              <ul className="space-y-2">
                <li className="text-sm text-textMuted">
                  <span className="font-medium">Fecha de viaje:</span>{' '}
                  28/09/2018 01:30 PM
                </li>
                <li className="text-sm text-textMuted">
                  <span className="font-medium">Tipo de Ticket:</span> Normal
                </li>
                <li className="text-sm text-textMuted">
                  <span className="font-medium">Servicio:</span> General
                </li>
                <li className="text-sm text-textMuted">
                  <span className="font-medium">Tarifa base:</span> -
                </li>
              </ul>
            </div>
            <div className="flex flex-1">
              <ul className="space-y-2">
                <li className="text-sm text-textMuted">
                  <span className="font-medium">Asiento:</span> 41
                </li>
                <li className="text-sm text-textMuted">
                  <span className="font-medium">Precio:</span> S/. 30.0
                </li>
                <li className="text-sm text-textMuted">
                  <span className="font-medium">Snack:</span> -
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="divider"></div>

        <div className="flex flex-col">
          <h3 className="text-primary text-sm font-medium uppercase">
            Información de Pasajero
          </h3>

          <div className="flex mt-4">
            <div className="flex flex-1">
              <ul className="space-y-2">
                <li className="text-sm text-textMuted">
                  <span className="font-medium">Pasajero:</span> Lopez Santos
                  Martín
                </li>
                <li className="text-sm text-textMuted">
                  <span className="font-medium">DNI:</span> 75362514
                </li>
                <li className="text-sm text-textMuted">
                  <span className="font-medium">Edad:</span> 26
                </li>
                <li className="text-sm text-textMuted">
                  <span className="font-medium">Celular:</span> 985 963 145
                </li>
              </ul>
            </div>

            <div className="flex flex-1">
              <ul className="space-y-2">
                <li className="text-sm text-textMuted">
                  <span className="font-medium">Email:</span>
                  lopezs@gmail.com
                </li>
                <li className="text-sm text-textMuted">
                  <span className="font-medium">Empresa:</span> -
                </li>
                <li className="text-sm text-textMuted">
                  <span className="font-medium">R.u.c.:</span> -
                </li>
              </ul>
            </div>

            <div className="flex flex-1"></div>
          </div>
        </div>

        <div className="divider"></div>

        <div className="flex flex-col">
          <h3 className="text-primary text-sm font-medium uppercase">
            Información de venta
          </h3>

          <div className="flex mt-4">
            <div className="flex flex-1">
              <ul className="space-y-2">
                <li className="text-sm text-textMuted">
                  <span className="font-medium">Código de reserva:</span> -
                </li>
                <li className="text-sm text-textMuted">
                  <span className="font-medium">Oficina manual:</span> -
                </li>
                <li className="text-sm text-textMuted">
                  <span className="font-medium">Agencia/agente:</span> -
                </li>
                <li className="text-sm text-textMuted">
                  <span className="font-medium">Nro de voucher:</span> -
                </li>
              </ul>
            </div>

            <div className="flex flex-1"></div>
            <div className="flex flex-1"></div>
          </div>
        </div>

        <div className="divider"></div>

        <div className="flex flex-col">
          <h3 className="text-primary text-sm font-medium uppercase">
            Información Pago cupón
          </h3>

          <div className="flex mt-4">
            <div className="flex flex-1">
              <ul className="space-y-2">
                <li className="text-sm text-textMuted">
                  <span className="font-medium">Cupón:</span> -
                </li>
                <li className="text-sm text-textMuted">
                  <span className="font-medium">Descuento por cupón:</span> -
                </li>
                <li className="text-sm text-textMuted">
                  <span className="font-medium">Monto pagado:</span> -
                </li>
              </ul>
            </div>
            <div className="flex flex-1"></div>
            <div className="flex flex-1"></div>
          </div>
        </div>

        <div className="divider"></div>

        <div className="flex flex-col">
          <h3 className="text-primary text-sm font-medium uppercase">
            Información de vendedor
          </h3>

          <div className="flex mt-4">
            <div className="flex flex-1">
              <ul className="space-y-2">
                <li className="text-sm text-textMuted">
                  <span className="font-medium">Oficina:</span>
                  Principal
                </li>
                <li className="text-sm text-textMuted">
                  <span className="font-medium">Vendedor:</span>
                  Administrador METS
                </li>
                <li className="text-sm text-textMuted">
                  <span className="font-medium">Alianza:</span> 26
                </li>
                <li className="text-sm text-textMuted">
                  <span className="font-medium">Observaciones:</span> Se cobró
                  adicional de S/. 0.0 con respecto al boleto original 632
                </li>
              </ul>
            </div>

            <div className="flex flex-1"></div>
            <div className="flex flex-1"></div>
          </div>
        </div>

        <div className="divider"></div>

        <div className="flex items-end justify-end">
          <button className="btn w-40 bg-transparent text-primary border border-primary rounded-[14px] hover:text-white hover:bg-primary">
            Volver
          </button>
        </div>
      </div>
      {/** Cancel Ticket Modal */}
      <dialog id={`${uniqueId}-cancel-ticket-modal`} className="modal">
        <form method="dialog" className="modal-box">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={event => {
              // @ts-ignore
              window[`${uniqueId}-cancel-ticket-modal`].close();
            }}>
            ✕
          </button>

          <h3 className="font-medium text-lg text-center">Anular pasaje</h3>

          <div className="my-10">
            <textarea
              className="textarea w-full bg-bgCommonInput rounded-xl max-h-32 h-32"
              placeholder="Escribe el motivo por el cual se anulará este pasaje"
              required
            />
          </div>

          <button className="btn bg-primary hover:bg-secondary text-white w-full rounded-[14px]">
            Confirmar
          </button>
        </form>
      </dialog>
    </div>
  );
};

export default TicketHistoryDetailsPage;
