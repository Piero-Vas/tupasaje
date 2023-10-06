'use client';

import {useState} from 'react';
import {UpArrowIcon} from './components/UpArrowIcon';
import {DownArrowIcon} from './components/DownArrowIcon';
import AddImage from '@/assets/svg/addimage.svg';
import {Grid} from 'gridjs-react';
import {RadioGroup} from '@headlessui/react';
import {cn} from '@/utils/cn';
import {CouponIcon} from './components/CouponIcon';
import {useRouter} from 'next/navigation';
import {EditPhotoIcon} from '@/components/icon/EditPhotoIcon';
import {DeletePhotoIcon} from '@/components/icon/DeletePhotoIcon';

const PAYMENT_METHODS = [
  {
    id: 'cash',
    title: 'Efectivo',
    inputs: [
      {
        title: 'Paga con',
        description: null,
        placeholder: '00.0',
        type: 'number',
      },
      {
        title: 'Cambio de',
        description: null,
        placeholder: '00.0',
        type: 'number',
      },
    ],
  },
  {
    id: 'card',
    title: 'Tarjetas de crédito o débito',
    inputs: [
      {
        title: 'Código',
        description: null,
        placeholder: 'Ingresar código del voucher',
        type: 'text',
      },
    ],
  },
  {
    id: 'virtual_wallet',
    title: 'billetera virtual',
    inputs: [
      {
        title: null,
        description: null,
        placeholder:
          'Arrastra y suelta una imagen aquí o haz clic para buscar en tu computadora',
        type: 'file',
      },
    ],
  },
];

type InputValuesType = {
  cashInputPaysWithValue: number;
  cashInputChangeOfValue: number;
  cardInputCodeValue: string;
  walletFileInputValue: File | null;
};

const BookingManagementPayment: React.FC = () => {
  const [paymentMethodSelected, setPaymentMethodSelected] = useState(
    PAYMENT_METHODS[0],
  );
  const [inputValues, setInputValues] = useState<InputValuesType>({
    cashInputPaysWithValue: 0,
    cashInputChangeOfValue: 0,
    cardInputCodeValue: '',
    walletFileInputValue: null,
  });
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [discountAmountData, setDiscountAmountData] = useState({
    amount: 0,
    isVisible: false,
  });
  const router = useRouter();

  return (
    <div className="flex flex-col pb-20">
      {/** Heading */}
      <div className="flex flex-row justify-between">
        <h2 className="text-xl font-bold text-primary">Pago</h2>
      </div>

      {/** Contenido */}
      <div className="flex gap-6 mt-6">
        <div className="flex flex-1 bg-white rounded-[25px] border-[0.5px] border-borderPane px-4 py-6 flex-col shadow gap-8">
          {/** IDA */}
          <div className="flex flex-col gap-4">
            {/** Heading */}
            <div className="flex justify-between">
              {/** Ida contenido */}
              <div className="flex gap-2 items-center">
                <UpArrowIcon className="w-10 h-10" />

                <div className="flex flex-col">
                  <h3 className="text-textMuted text-lg">IDA</h3>
                  <p className="text-lg font-medium text-primary">
                    Trujillo - Lima
                  </p>
                </div>
              </div>

              {/** Ida fecha y subtotal */}
              <div className="flex flex-col gap-2">
                <p className="text-sm uppercase">
                  Salida: <strong>03/07/2023</strong>
                </p>
                <p className="text-sm uppercase">
                  Subtotal: <strong className="text-primary">S/. 620.0</strong>
                </p>
              </div>
            </div>

            {/** Table */}
            <Grid
              style={{maxWidth: '100%'}}
              data={[
                ['ÁLVARO SANTILLÁN COTRINA', 'VIP', '1', '09', 'S/. 150.0'],
                ['CRISTINA PÉREZ SERNA', 'VIP', '1', '09', 'S/. 150.0'],
                ['CINTHIA ÁVALOS CABRERA', 'Estándar', '2', '09', 'S/. 80.0'],
                ['LUCIANO VARGAS PAJARES', 'Estándar', '2', '09', 'S/. 80.0'],
                ['STEVEN CARRIÓN ZUÑIGA', 'Estándar', '2', '09', 'S/. 80.0'],
                [
                  'TATIANA RODRIGUEZ VÁSQUEZ',
                  'Estándar',
                  '2',
                  '09',
                  'S/. 80.0',
                ],
              ]}
              columns={['Nombre', 'Servicio', 'Piso', 'N° Asiento', 'Tarifa']}
              search={false}
              pagination={false}
            />
          </div>

          {/** Retorno */}
          <div className="flex flex-col gap-4">
            {/** Heading */}
            <div className="flex justify-between">
              {/** Ida contenido */}
              <div className="flex gap-2 items-center">
                <DownArrowIcon className="w-10 h-10" />

                <div className="flex flex-col">
                  <h3 className="text-textMuted text-lg">IDA</h3>
                  <p className="text-lg font-medium text-primary">
                    Lima - Trujillo
                  </p>
                </div>
              </div>

              {/** Ida fecha y subtotal */}
              <div className="flex flex-col gap-2">
                <p className="text-sm uppercase">
                  Salida: <strong>10/07/2023</strong>
                </p>
                <p className="text-sm uppercase">
                  Subtotal: <strong className="text-primary">S/. 620.0</strong>
                </p>
              </div>
            </div>

            {/** Table */}
            <Grid
              style={{maxWidth: '100%'}}
              data={[
                ['ÁLVARO SANTILLÁN COTRINA', 'VIP', '1', '09', 'S/. 150.0'],
                ['CRISTINA PÉREZ SERNA', 'VIP', '1', '09', 'S/. 150.0'],
                ['CINTHIA ÁVALOS CABRERA', 'Estándar', '2', '09', 'S/. 75.0'],
                ['LUCIANO VARGAS PAJARES', 'Estándar', '2', '09', 'S/. 75.0'],
                ['STEVEN CARRIÓN ZUÑIGA', 'Estándar', '2', '09', 'S/. 75.0'],
                [
                  'TATIANA RODRIGUEZ VÁSQUEZ',
                  'Estándar',
                  '2',
                  '09',
                  'S/. 75.0',
                ],
              ]}
              columns={['Nombre', 'Servicio', 'Piso', 'N° Asiento', 'Tarifa']}
              search={false}
              pagination={false}
            />
          </div>
        </div>

        {/** Detalles */}
        <div className="flex flex-1 bg-white rounded-[25px] border-[0.5px] border-borderPane px-4 py-6 flex-col shadow gap-8">
          {/** Monto total a pagar */}
          <div className="bg-textGreen flex justify-between px-4 py-6 rounded-[17px]">
            <p className="text-white text-lg font-bold uppercase">
              monto total a pagar
            </p>

            <span className="text-white text-lg font-bold">S/. 1240.0</span>
          </div>

          {/** Datos del pagador */}
          <div>
            <h4 className="text-textGreen uppercase text-sm font-medium">
              Datos del Pagador
            </h4>

            <div className="flex mt-8 gap-4">
              <div className="flex flex-1 flex-col gap-6">
                <div>
                  <h5 className="text-textMuted font-medium text-sm">
                    Tipo de documento
                  </h5>
                  <p className="text-textMutedStrong text-sm">DNI</p>
                </div>
                <div>
                  <h5 className="text-textMuted font-medium">
                    Nombres completos
                  </h5>
                  <p className="text-textMutedStrong text-sm">Carlos Enrique</p>
                </div>
                <div>
                  <h5 className="text-textMuted font-medium">Email</h5>
                  <p className="text-textMutedStrong text-sm">
                    ccastillos@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-6">
                <div>
                  <h5 className="text-textMuted font-medium">
                    Número de documento
                  </h5>
                  <p className="text-textMutedStrong text-sm">78521463</p>
                </div>
                <div>
                  <h5 className="text-textMuted font-medium">
                    Apellidos completos
                  </h5>
                  <p className="text-textMutedStrong text-sm">
                    Castillo Sánchez
                  </p>
                </div>
                <div>
                  <h5 className="text-textMuted font-medium">Teléfono</h5>
                  <p className="text-textMutedStrong text-sm">
                    +51 965 124 305
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/** Separador */}
          <hr />

          {/** Pago */}
          <div>
            <h4 className="text-textGreen uppercase text-sm font-medium">
              Pago
            </h4>

            <RadioGroup
              className="mt-4"
              value={paymentMethodSelected}
              onChange={setPaymentMethodSelected}>
              <RadioGroup.Label className="sr-only">
                Métodos de Pago
              </RadioGroup.Label>

              <div className="space-y-4">
                {PAYMENT_METHODS.map(paymentMethod => {
                  return (
                    <RadioGroup.Option
                      key={`key-${paymentMethod.id}`}
                      value={paymentMethod}
                      className={({checked}) =>
                        cn(
                          'relative flex cursor-pointer rounded-[16px] px-5 py-4 border-[1.2px] border-textGreen focus:outline-none',
                          checked ? 'bg-white' : 'bg-[#36D99514]',
                        )
                      }>
                      {({checked}) => (
                        <div className="flex flex-col gap-5 w-full">
                          <div className="flex w-full items-center justify-between">
                            <RadioGroup.Label
                              as="p"
                              className={cn(
                                'font-medium uppercase text-sm text-black',
                              )}>
                              {paymentMethod.title}
                            </RadioGroup.Label>

                            <div
                              className={cn(
                                'w-5 h-5 rounded-full border-[1.2px] border-textGreen',
                                checked ? 'bg-textGreen' : 'bg-white',
                              )}></div>
                          </div>

                          {checked ? (
                            <div className="flex flex-row gap-4 flex-1">
                              {paymentMethod.inputs.map(
                                (
                                  {title, description, placeholder, type},
                                  key,
                                ) => {
                                  const isFileInput = type === 'file';
                                  const isCashInputs =
                                    paymentMethod.id === 'cash';
                                  const isCardInput =
                                    paymentMethod.id === 'card';
                                  const isNumericInput = type === 'number';

                                  return (
                                    <div
                                      key={key}
                                      className="flex flex-1 flex-col gap-2">
                                      {title ? (
                                        <label
                                          className="block text-textMuted text-sm font-medium"
                                          htmlFor={`${
                                            paymentMethod.id
                                          }-${type}-input-${key + 1}`}>
                                          {title}
                                        </label>
                                      ) : null}

                                      <div className="relative">
                                        {isCashInputs ? (
                                          <span className="absolute font-normal text-sm text-textStepsMuted h-full flex items-center left-4 select-none">
                                            S/.
                                          </span>
                                        ) : null}

                                        {isFileInput ? (
                                          <>
                                            {selectedFileName ? (
                                              <div className="flex justify-between items-center my-6">
                                                <p className="truncate">
                                                  {selectedFileName}
                                                </p>

                                                <div className="flex gap-2">
                                                  <button
                                                    type="button"
                                                    className="btn bg-bgblack hover:bg-bgblack/90 rounded-xl"
                                                    onClick={() => {
                                                      window[
                                                        // @ts-ignore
                                                        'dropzone-file'
                                                      ].click();
                                                    }}>
                                                    <EditPhotoIcon />
                                                  </button>

                                                  <button
                                                    type="button"
                                                    className="btn bg-transparent border border-bgblack rounded-xl"
                                                    onClick={() => {
                                                      setBackgroundImage(null);
                                                      setSelectedFileName(null);

                                                      setInputValues({
                                                        ...inputValues,
                                                        walletFileInputValue:
                                                          null,
                                                      });
                                                    }}>
                                                    <DeletePhotoIcon />
                                                  </button>
                                                </div>
                                              </div>
                                            ) : null}

                                            <div className="flex items-center justify-center w-full">
                                              <label
                                                htmlFor="dropzone-file"
                                                className={cn(
                                                  'flex bg-cover bg-no-repeat bg-center w-full flex-col items-center justify-center cursor-pointer rounded-2xl overflow-hidden',
                                                  !backgroundImage
                                                    ? 'border border-dashed border-gray-200'
                                                    : 'h-96',
                                                )}
                                                style={{
                                                  backgroundImage:
                                                    backgroundImage ??
                                                    undefined,
                                                }}>
                                                <div className="flex flex-1">
                                                  <div className="flex flex-row gap-8 items-center justify-center py-10 px-5">
                                                    {!selectedFileName ? (
                                                      <>
                                                        <AddImage className="mb-4" />

                                                        <p className="text-textStepsMuted w-8/12 text-center text-sm">
                                                          {placeholder}
                                                        </p>
                                                      </>
                                                    ) : null}
                                                  </div>
                                                </div>
                                                <input
                                                  id="dropzone-file"
                                                  type="file"
                                                  className="hidden"
                                                  accept=".png, .jpg, .jpeg"
                                                  onChange={({
                                                    target: {files},
                                                  }) => {
                                                    const file = files![0];
                                                    console.log(file);

                                                    if (file) {
                                                      setSelectedFileName(
                                                        file.name,
                                                      );
                                                      const reader =
                                                        new FileReader();
                                                      reader.onload = e => {
                                                        setBackgroundImage(
                                                          `url(${e.target?.result})`,
                                                        );
                                                      };
                                                      reader.readAsDataURL(
                                                        file,
                                                      );

                                                      setInputValues({
                                                        ...inputValues,
                                                        walletFileInputValue:
                                                          file,
                                                      });
                                                    }
                                                  }}
                                                />
                                              </label>
                                            </div>
                                          </>
                                        ) : (
                                          <input
                                            id={`${
                                              paymentMethod.id
                                            }-${type}-input-${key + 1}`}
                                            type={type}
                                            placeholder={placeholder}
                                            className={cn(
                                              'input w-full bg-bgCommonInput rounded-xl',
                                              isCashInputs && 'text-center',
                                            )}
                                            value={
                                              isCardInput
                                                ? inputValues.cardInputCodeValue
                                                : key === 0
                                                ? inputValues.cashInputPaysWithValue
                                                : inputValues.cashInputChangeOfValue
                                            }
                                            onChange={({target: {value}}) => {
                                              if (isCardInput) {
                                                setInputValues({
                                                  ...inputValues,
                                                  cardInputCodeValue: value,
                                                });
                                              } else {
                                                const castedValue =
                                                  parseFloat(value);
                                                const isNumber =
                                                  isNumericInput &&
                                                  !isNaN(castedValue);

                                                if (!isNumber) return;

                                                // es ´Paga con´
                                                if (isCashInputs && key === 0) {
                                                  setInputValues({
                                                    ...inputValues,
                                                    cashInputPaysWithValue:
                                                      castedValue,
                                                  });
                                                } else if (
                                                  isCashInputs &&
                                                  key === 1
                                                ) {
                                                  // es ´Cambio de´
                                                  setInputValues({
                                                    ...inputValues,
                                                    cashInputChangeOfValue:
                                                      castedValue,
                                                  });
                                                }
                                              }
                                            }}
                                            required
                                            {...(isNumericInput
                                              ? {
                                                  min: 0,
                                                }
                                              : {})}
                                          />
                                        )}
                                      </div>
                                    </div>
                                  );
                                },
                              )}
                            </div>
                          ) : null}
                        </div>
                      )}
                    </RadioGroup.Option>
                  );
                })}
              </div>
            </RadioGroup>

            <div className="mt-6 flex gap-4 flex-col">
              <button
                className="flex items-center gap-2"
                onClick={() => {
                  setDiscountAmountData({
                    ...discountAmountData,
                    isVisible: !discountAmountData.isVisible,
                  });
                }}>
                <CouponIcon className="w-6 h-6" />

                <span className="font-medium text-textStepsChecked">
                  Ingresar monto de descuento
                </span>

                <svg
                  width="14"
                  height="8"
                  viewBox="0 0 14 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={cn(
                    'transform',
                    discountAmountData.isVisible && 'rotate-180',
                  )}>
                  <path
                    d="M12 1.55556L6.99814 6L2 1.55556"
                    stroke="#4185EF"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                    strokeLinecap="square"
                  />
                </svg>
              </button>

              {discountAmountData.isVisible ? (
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <span className="absolute font-normal text-sm text-textStepsMuted h-full flex items-center left-4 select-none">
                      S/.
                    </span>

                    <input
                      type="number"
                      placeholder="00.0"
                      className={cn(
                        'input w-full bg-bgCommonInput rounded-xl text-center',
                      )}
                      value={discountAmountData.amount}
                      onChange={({target: {value}}) => {}}
                      required
                      min={0}
                    />
                  </div>

                  <button className="btn rounded-[13px] bg-primary hover:bg-secondary text-white">
                    Aplicar
                  </button>
                </div>
              ) : null}
            </div>

            <div className="mt-24 flex gap-4">
              <button
                onClick={() => {
                  router.push('/booking-admin');
                }}
                className="btn flex-1 btn-outline rounded-[15px] text-primary border-primary bg-white hover:bg-primary">
                Cancelar
              </button>

              <button
                className="btn flex-1 rounded-[15px] bg-primary hover:bg-secondary text-white"
                disabled>
                Continuar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingManagementPayment;
