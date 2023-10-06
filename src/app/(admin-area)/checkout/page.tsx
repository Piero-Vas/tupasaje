'use client';

import {useEffect, useState} from 'react';
import {CoinDashedIcon} from './components/CoinDashedIcon';
import {useRouter} from 'next/navigation';
import {useBoxForm} from '@/forms/box.form';
import {useAxios} from '@/modules/axios/axios.hook';
import Cookies from 'js-cookie';
type CurrencyType = 'SOL' | 'USD';

const CheckOut: React.FC = () => {
  let cooktoken = Cookies.get('token');
  // const [currencyAmount, setCurrencyAmount] = useState<string>('');
  const [currencyType, setCurrencyType] = useState<CurrencyType>('SOL');
  const {handleSubmit, register, formState} = useBoxForm();
  const [{loading: isLoading}, executeBoxOpen] = useAxios(
    {
      method: 'POST',
      url: '/cashiershift/open/1',
      headers: {Authorization: `Bearer ${cooktoken}`},
    },
    {manual: true},
  );
  const router = useRouter();
  // const handleCurrencyAmountChange = (event: any) => {
  //   const rawValue = event.target.value;
  //   const formattedValue = formatMoneyInput(rawValue);
  //   const trimLeadingToZero = trimLeadingZero(formattedValue);
  //   setCurrencyAmount(trimLeadingToZero);
  //   register("amount")
  // };

  useEffect(() => {
    validBox();
  }, []);

  const validBox = async () => {
    try {
      let params = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${cooktoken}`,
          'Content-Type': 'application/json',
        },
      };
      const check = await fetch(
        `${process.env.API_URL}/cashierbox/list?id_office=2`,
        params,
      );
      const query = await check.json();
      let boxDetailApi = query['data']['cashierBox'];
      let status = boxDetailApi[0]['state'];
      if (status == 1) {
        router.push('/checkout/details');
      }
    } catch (error) {
      console.log(error);
    }
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

    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return integerPart + (decimalPart ? `.${decimalPart}` : '');
  };

  const handleCurrencyTypeChange = (event: any) => {
    setCurrencyType(event.target.value);
  };

  // Luego reemplazar por react-hook-form
  const onSubmit = handleSubmit(async ({id_cashier_box, amount}) => {
    try {
      const response = await executeBoxOpen({
        data: {id_cashier_box, amount},
      });
      router.push('/checkout/details');
    } catch (error) {
      // Handle box error
      console.error('Box failed:', error);
    }
  });

  return (
    <div className="flex flex-col">
      {/** Heading */}
      <div className="flex flex-row justify-between">
        <div className="p-4">
          <h2 className="text-xl font-bold text-primary">
            Apertura/cierre de caja
          </h2>
        </div>
      </div>

      {/** Content */}
      <div className="flex items-center justify-center mt-8">
        <form
          onSubmit={onSubmit}
          className="rounded-2xl bg-white border-[0.5px] border-borderPane w-[364px] p-6 shadow">
          {/** Título */}
          <h3 className="text-black uppercase text-base font-medium">Estado</h3>

          {/** Alerta */}
          <div className="flex justify-center mt-6">
            <div className="bg-[#ED6F4721] rounded-3xl flex items-center justify-center text-bgAlertMessage gap-1 px-4 py-3">
              <CoinDashedIcon className="w-6 h-6" />
              <span className="uppercase font-medium text-base">
                Caja Cerrada
              </span>
            </div>
          </div>

          {/** Código */}
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
                  type="text"
                  placeholder="00.0"
                  required
                  // value={currencyAmount}
                  // onChange={handleCurrencyAmountChange}
                  className="input text-center w-full max-w-xs bg-bgCommonInput rounded-xl"
                  {...register('amount')}
                />
                <input
                  hidden
                  type="number"
                  value={1}
                  className="input text-center w-full max-w-xs bg-bgCommonInput rounded-xl"
                  {...register('id_cashier_box', {valueAsNumber: true})}
                />
              </div>
            </div>
          </div>

          {/** Button */}
          <div className="mt-8">
            <button
              type="submit"
              className="btn w-full text-white bg-primary hover:bg-secondary rounded-2xl">
              Abrir Caja
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckOut;
