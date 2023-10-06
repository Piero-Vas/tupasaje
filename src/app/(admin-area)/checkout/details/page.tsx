'use client';

import {useState, useId, Fragment, SetStateAction, useEffect} from 'react';
import {CoinIcon} from './CoinIcon';
import {cn} from '@/utils/cn';
import {Grid} from 'gridjs-react';
import {useAxios} from '@/modules/axios/axios.hook';
import Cookies from 'js-cookie';
import {useRouter} from 'next/navigation';
// @ts-ignore
import {h} from 'gridjs';
import {
  fetchdata,
  useGetDetailBoxQuery,
} from '../../../../redux/services/checkout/boxDetailApi';
import {useDispatch} from 'react-redux';

type CheckOutMenuTabs = 'ENTRADA' | 'SALIDA';

type CurrencyType = 'SOL' | 'USD';
let entry: {
  type: string;
  currency: string;
  amount: string;
  reason: string;
  hour: string;
}[] = [];
let exit: {
  type: string;
  currency: string;
  amount: string;
  reason: string;
  hour: string;
}[] = [];
let entryTableData: (string | number)[][] = [];
let exitTableData: (string | number)[][] = [];
let boxDetailData: any[][] = [];
let totalEntry = 0;
let totalExit = 0;
const CheckoutDetails: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  let cooktoken = Cookies.get('token');

  const uniqueId = useId();
  const [menuTab, setMenuTab] = useState<CheckOutMenuTabs>('SALIDA');
  const [currencyAmount, setCurrencyAmount] = useState<string>('');
  const [currencyNote, setCurrencyNote] = useState<string>('');
  const [currencyType, setCurrencyType] = useState<CurrencyType>('SOL');
  const [entryTable, setEntryTable] = useState<Object>([]);
  const [exitTable, setExitTable] = useState<Object>([]);
  const [detailBoxTable, setDetailBoxTable] = useState<Object>([]);
  const [totalTableEntry, setTotalEntry] = useState<Number>(0);
  const [totalTableExit, setTotalExit] = useState<Number>(0);

  const [totalDetailEntry, setTotalEntryDetail] = useState<Number>(0);
  const [totalDetailExit, setTotalExitDetail] = useState<Number>(0);
  const [totaDetailTotal, setEntryDetailTotal] = useState<Number>(0);

  const [{loading: isLoading}, executeCashierDetail] = useAxios(
    {
      method: 'POST',
      url: '/cashiershiftdetail/1',
      headers: {Authorization: `Bearer ${cooktoken}`},
    },
    {manual: true},
  );
  const [{loading: CloseIsLoading}, executeCloseBox] = useAxios(
    {
      method: 'POST',
      url: '/cashiershift/close/1',
      headers: {Authorization: `Bearer ${cooktoken}`},
    },
    {manual: true},
  );
  let today = new Date();

  const handleSwitchTab = () => {
    if (menuTab === 'ENTRADA') {
      setMenuTab('SALIDA');
    } else {
      setMenuTab('ENTRADA');
    }
  };

  const handleCurrencyAmountChange = (event: any) => {
    const rawValue = event.target.value;
    // const formattedValue = formatMoneyInput(rawValue);
    // const trimLeadingToZero = trimLeadingZero(formattedValue);
    setCurrencyAmount(rawValue);
  };

  const handleCurrencyNoteChange = (event: any) => {
    const rawValue = event.target.value;
    setCurrencyNote(rawValue);
  };

  const trimLeadingZero = (value: string) => {
    if (value.length > 1 && value[0] === '0') {
      return value.slice(1);
    }
    return value;
  };

  const formatMoneyInput = (value: string) => {
    const cleanValue = value.replace(/[^0-9.]/g, '');

    const parts = cleanValue.split('.');
    let integerPart = parts[0];
    let decimalPart = parts[1] || '';

    decimalPart = decimalPart.slice(0, 2);

    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '');

    return integerPart + (decimalPart ? `.${decimalPart}` : '');
  };

  const handleCurrencyTypeChange = (event: any) => {
    setCurrencyType(event.target.value);
  };

  const handleCloseBox = async (event: any) => {
    // if(entry.length == 0 || exit.length == 0 ){
    //    // @ts-ignore
    //    window[`${uniqueId}-confirm-close-modal`].showModal();
    // }else{
    try {
      const response = await executeCloseBox({
        data: {},
      });
      router.push('/checkout');
    } catch (error) {
      // Handle box error
      console.error('Box Close failed:', error);
    }
    // }
  };

  const handleClick = async () => {
    try {
      const response = await executeCashierDetail({
        data: menuTab === 'ENTRADA' ? entry : exit,
      });
    } catch (error) {
      // Handle box error
      console.error('Box failed:', error);
    }

    if (menuTab == 'ENTRADA') {
      console.log('Entrada');
      setEntryTable([]);
      console.log(entryTable);
      entry = [];
    } else {
      console.log('Salida');
      setExitTable([]);
      console.log(exitTable);
      exit = [];
    }
  };
  let boxDetailApi = [];
  const handleDetailBox = async (e: any) => {
    boxDetailApi = [];
    boxDetailData = [];
    try {
      let params = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${cooktoken}`,
          'Content-Type': 'application/json',
        },
      };
      const check = await fetch(
        `${process.env.API_URL}/cashiershift/detail/1`,
        params,
      );
      const query = await check.json();
      boxDetailApi = query['cashierShiftsDetail']['cashierShiftDetails'];
      boxDetailApi.map((element: any) => {
        return boxDetailData.push([
          element.hour,
          element.hour,
          element.reason,
          element.type == 'entry' ? 'Entrada' : 'Salida',
          element.amount,
        ]);
      });
      console.log(boxDetailApi);
      setDetailBoxTable(boxDetailData);
      setTotalEntryDetail(query['cashierShiftsDetail']['entryAmount']);
      setTotalExitDetail(query['cashierShiftsDetail']['exitAmount']);
      setEntryDetailTotal(query['cashierShiftsDetail']['balance']);
    } catch (error) {
      console.log(error);
    }

    // @ts-ignore
    window[`${uniqueId}-checkout-modal`].showModal();
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    let hour =
      today.getHours() < 10 ? '0' + today.getHours() : today.getHours();
    let minute =
      today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes();
    if (menuTab === 'ENTRADA') {
      entry.push({
        type: 'entry',
        currency: 'SOL',
        amount: currencyAmount,
        reason: currencyNote,
        hour: `${hour}:${minute}`,
      });
      entryTableData.push([
        `${hour}:${minute}`,
        1,
        currencyNote,
        `S/. ${currencyAmount}`,
        'SOL',
      ]);
      totalEntry = totalEntry + parseInt(currencyAmount);
      setTotalEntry(totalEntry);
      setEntryTable(entryTableData);
      console.log(entry);
      console.log(entryTableData);
    } else {
      exit.push({
        type: 'exit',
        currency: 'SOL',
        amount: currencyAmount,
        reason: currencyNote,
        hour: `${hour}:${minute}`,
      });
      exitTableData.push([
        `${hour}:${minute}`,
        1,
        currencyNote,
        `S/. ${currencyAmount}`,
        'SOL',
      ]);
      totalExit = totalExit + parseInt(currencyAmount);
      setTotalExit(totalExit);
      setExitTable(exitTableData);
    }

    setCurrencyAmount('');
    setCurrencyNote('');
  };
  return (
    <Fragment>
      <div className="flex flex-col">
        {/** Heading */}
        <div className="flex flex-row justify-between">
          <div className="p-4">
            <h2 className="text-xl font-bold text-primary">Entradas de caja</h2>
          </div>

          <div className="p-4">
            <button
              onClick={handleDetailBox}
              className="bg-[#36D99521] rounded-3xl btn flex items-center justify-center gap-1 px-4 py-3">
              <CoinIcon className="w-6 h-6" />
              <span className="uppercase font-medium text-base text-textGreen">
                Caja Abierta
              </span>
            </button>
          </div>
        </div>
        {/** Content */}
        <div className="flex justify-between gap-5 mt-4">
          {/** Menu */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col rounded-2xl bg-white border-[0.5px] border-borderPane p-6 shadow w-[364px] min-w-[364px]">
            <div className="tabs tabs-boxed rounded-[14px]">
              <a
                className={cn(
                  'tab grow px-8',
                  menuTab === 'ENTRADA' && 'tab-active',
                )}
                onClick={handleSwitchTab}>
                Entrada
              </a>
              <a
                className={cn(
                  'tab grow px-8',
                  menuTab === 'SALIDA' && 'tab-active',
                )}
                onClick={handleSwitchTab}>
                Salida
              </a>
            </div>

            {/* <div className="mt-6">
              <h4 className="text-sm font-medium text-textMuted">Código</h4>

              <p className="text-textStepsChecked text-sm font-medium mt-1">
                255
              </p>
            </div> */}

            {/** Monto Inicial */}
            <div className="mt-6">
              <h4 className="text-sm font-medium text-textMuted">
                Monto Inicial
              </h4>

              <div className="mt-1 flex gap-2">
                <select
                  className="select max-w-xs bg-bgCommonInput rounded-xl"
                  value={currencyType}
                  onChange={handleCurrencyTypeChange}>
                  <option value="SOL">SOL</option>
                  <option value="USD">USD</option>
                </select>

                <div className="relative">
                  <span className="absolute font-normal text-sm text-textStepsMuted h-full flex items-center left-4 select-none">
                    {currencyType === 'SOL' ? 'S/.' : 'USD'}
                  </span>
                  <input
                    type="number"
                    placeholder="00.0"
                    value={currencyAmount}
                    onChange={handleCurrencyAmountChange}
                    required
                    className="input text-center w-full max-w-xs bg-bgCommonInput rounded-xl"
                  />
                </div>
              </div>
            </div>

            {/** Nota */}
            <div className="mt-6">
              <h4 className="text-sm font-medium text-textMuted">Nota</h4>

              <div className="mt-1">
                <textarea
                  className="textarea w-full bg-bgCommonInput rounded-xl max-h-32 h-32"
                  placeholder="Ingresa una pequeña anotación"
                  value={currencyNote}
                  onChange={handleCurrencyNoteChange}
                  required
                />
              </div>
            </div>

            <div className="mt-8">
              <button className="btn btn-outline w-full rounded-[14px] border-primary hover:border-primary text-primary hover:bg-primary">
                Añadir {menuTab === 'ENTRADA' ? 'Entrada' : 'Salida'}
              </button>
            </div>
          </form>

          {/** Tabla de Registro */}
          <div className="flex flex-col flex-grow rounded-2xl bg-white border-[0.5px] border-borderPane p-6 shadow">
            <div className="flex flex-col">
              <h3 className="text-primary uppercase text-base font-medium">
                Registro de {menuTab === 'ENTRADA' ? 'Entradas' : 'Salidas'}
              </h3>

              {/** Tabla */}
              {menuTab === 'ENTRADA' ? (
                <div className="mt-6 w-full overflow-auto">
                  <Grid
                    style={{width: '100%'}}
                    data={entryTable}
                    columns={[
                      'Hora',
                      'Código',
                      'Motivo',
                      'Monto',
                      'Moneda',
                      {
                        name: 'Acciones',
                        formatter: (cell: any, row: {cells: {data: any}[]}) => {
                          return h(
                            'button',
                            {
                              className:
                                'w-12 mb-4 btn px-4 border rounded-md text-white bg-bgred hover:bg-bgred',
                              onClick: () => {
                                console.log(row);
                              },
                            },
                            '-',
                          );
                        },
                      },
                    ]}
                    search={false}
                    pagination={false}
                  />
                </div>
              ) : (
                <div className="mt-6 w-full overflow-auto">
                  <Grid
                    style={{width: '100%'}}
                    data={exitTable}
                    columns={[
                      'Hora',
                      'Código',
                      'Motivo',
                      'Monto',
                      'Moneda',
                      {
                        name: 'Acciones',
                        formatter: (cell: any, row: {cells: {data: any}[]}) => {
                          return h(
                            'button',
                            {
                              className:
                                'w-12 mb-4 btn px-4 border rounded-md text-white bg-bgred hover:bg-bgred',
                              onClick: () => {
                                console.log(row);
                              },
                            },
                            '-',
                          );
                        },
                      },
                    ]}
                    search={false}
                    pagination={false}
                  />
                </div>
              )}
            </div>

            <div className="flex mt-4 gap-4 flex-col items-end flex-1 justify-end">
              <p className="text-base uppercase">
                Total:{' '}
                <span>
                  S/.{' '}
                  <strong>{`${
                    menuTab === 'ENTRADA' ? totalTableEntry : totalTableExit
                  }`}</strong>
                </span>
              </p>
              <button
                onClick={() => {
                  // @ts-ignore
                  window[`${uniqueId}-confirm-modal`].showModal();
                }}
                className="btn bg-primary text-white hover:bg-secondary rounded-[14px]">
                Confirmar {menuTab === 'ENTRADA' ? 'Entradas' : 'Salidas'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/** Confirmar Modal */}
      <dialog id={`${uniqueId}-confirm-modal`} className="modal rounded-[25px]">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg uppercase text-center">Aviso</h3>
          <p className="py-8 max-w-xs mx-auto text-center">
            ¿Seguro que deseas confirmar estas{' '}
            {menuTab === 'ENTRADA' ? 'entradas' : 'salidas'} de dinero?
          </p>
          <div className="modal-action">
            <button
              className="btn flex-1 btn-outline rounded-[14px] border-primary hover:border-primary text-primary hover:bg-primary"
              onClick={handleClick}>
              Sí, seguro
            </button>

            {/* if there is a button in form, it will close the modal */}
            <button className="btn flex-1 rounded-[14px] bg-primary text-white hover:bg-secondary">
              Cancelar
            </button>
          </div>
        </form>
      </dialog>

      {/* Validacion de Campos vacios */}
      <dialog
        id={`${uniqueId}-confirm-close-modal`}
        className="modal rounded-[25px]">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg uppercase text-center">Aviso</h3>
          <p className="py-8 max-w-xs mx-auto text-center">
            Tiene entradas o salidas por registrar
          </p>
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn flex-1 rounded-[14px] bg-primary text-white hover:bg-secondary">
              Aceptar
            </button>
          </div>
        </form>
      </dialog>

      {/* Cierre de Caja provicional */}
      <dialog
        id={`${uniqueId}-checkout2-modal`}
        className="modal rounded-[25px]">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg uppercase text-center">Aviso</h3>
          <p className="py-8 max-w-xs mx-auto text-center">
            ¿Seguro que deseas cerrar caja?
          </p>
          <div className="modal-action">
            <button
              className="btn flex-1 btn-outline rounded-[14px] border-primary hover:border-primary text-primary hover:bg-primary"
              onClick={handleCloseBox}>
              Sí, seguro
            </button>

            {/* if there is a button in form, it will close the modal */}
            <button className="btn flex-1 rounded-[14px] bg-primary text-white hover:bg-secondary">
              Cancelar
            </button>
          </div>
        </form>
      </dialog>

      {/** Cierre de Caja */}
      <dialog
        id={`${uniqueId}-checkout-modal`}
        className="modal rounded-[25px]">
        <form method="dialog" className="modal-box w-11/12 max-w-5xl">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>

          <div>
            <h3 className="font-bold text-lg">Cierre de caja</h3>

            {/** Tabla */}
            <div className="mt-6 w-full overflow-auto">
              <Grid
                style={{width: '100%'}}
                data={detailBoxTable}
                columns={['Fecha', 'Hora', 'Concepto', 'Tipo', 'Saldo']}
                search={false}
                pagination={false}
              />
            </div>

            <div className="mt-8 flex flex-col items-end justify-end">
              <div>
                <p className="text-sm">
                  Total entradas: S/ {totalDetailEntry.toString()}{' '}
                </p>
                <p className="text-sm">
                  Total salidas: S/{totalDetailExit.toString()}
                </p>
              </div>

              <div>
                <div className="divider"></div>
                <p className="mt-6 text-base uppercase font-bold">
                  Saldo Actual: <span>S/.{totaDetailTotal.toString()}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="modal-action">
            {/* if there is a button, it will close the modal */}
            <button
              onClick={() => {
                // @ts-ignore
                window[`${uniqueId}-checkout2-modal`].showModal();
              }}
              className="btn rounded-[14px] bg-primary text-white hover:bg-secondary">
              Cerrar Caja
            </button>
          </div>
        </form>
      </dialog>
    </Fragment>
  );
};

export default CheckoutDetails;
