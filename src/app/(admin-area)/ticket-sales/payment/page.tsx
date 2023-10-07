'use client';

import { FaTimes } from 'react-icons/fa';
import { AiOutlineArrowUp } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import TableIPayments from '@/components/TablePayment';
import AddImage from '@/assets/svg/addimage.svg';
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { cn } from '@/utils/cn';
import { useState, useId } from 'react';
import {useAxios} from '@/modules/axios/axios.hook';
type CheckOutMenuTabs = 'COMPRAR' | 'RESERVAR';
const DEFAULT_BOOKING_DATA = {
  id_itinerary: 0,
  id_customer: null,
  travel_date: "",
  status: "pending",
  payment_status: "pending",
  code_transaction: "",
  url_image_transaction: "",
  type_pay: "",
  price_final: 0,
  type_document: "BOLETA",
  seats: [],
  customer_info: {}
};
const Payment: React.FC = () => {
  const uniqueId = useId();
  const id_Itinerary = useAppSelector((state) => state.ItinerarySelected.cityDestination)
  const destination_name = useAppSelector((state) => state.ItinerarySelected.cityDestination)
  const origin_name = useAppSelector((state) => state.ItinerarySelected.cityOrigin)
  const dateSelected = useAppSelector((state) => state.ItinerarySelected.dateSince)
  const [menuTab, setMenuTab] = useState<CheckOutMenuTabs>('RESERVAR');
  const [newBookingData, setNewBookingData] = useState(DEFAULT_BOOKING_DATA);
  const router = useRouter();
  const selecttrip = useAppSelector((state: any) => state.selectTrip.value);
  const dataCustomer = useAppSelector((state) => state.dataCustomer.value)
  const [datosFormularios, setFormularios] = useState([
    {
      name: "",
      last_name: "",
      address: "1",
      phone: "",
      email: "",
      identification_number: "",
      identification_type: "DNI"
    }
  ]);
  const [{loading: createBookingIsLoading}, executeCreateBooking] = useAxios(
    {
      method: 'POST',
      url: '/bookings/create',
    },
    {
      manual: true,
    },
  );

  const handleInputChange = (event:any, index:any) => {
    const { name, value } = event.target;
    const nuevosDatos = [...datosFormularios];
    nuevosDatos[index] = {
      ...nuevosDatos[index],
      [name]: value,
    };
    setFormularios(nuevosDatos);
  };

  const handleCreateNewBookingSubmit = async () => {
    
    console.log('Datos de todos los formularios:', datosFormularios);
    let seats= [{
      seat_id: 541,
      passenger_data: dataCustomer[0]
    }]  
    // dataCustomer.map((e)=>{
    //   return seats.push([e.name,e.document,'DNI'])
    // })
    console.log(seats)

    try {
      await executeCreateBooking({
        data: {
          id_itinerary: selecttrip,
          id_customer: null,
          travel_date: dateSelected,
          status: "pending",
          payment_status: "pending",
          code_transaction: "",
          url_image_transaction: "",
          type_pay: "Efectivo",
          price_final: totalSteats * 30,
          type_document: "BOLETA",
          seats: seats,
          customer_info: datosFormularios[0]
        },
      });

      setNewBookingData(DEFAULT_BOOKING_DATA);
      router.push('/ticket-sales/ticket');
    } catch (error) {
      console.error('Create failed:', error);
    }
  };

  // const handleSubmit = async () => {
  //   router.push('/ticket-sales/ticket');
  // };
  const closePage = async () => {
    router.push('/ticket-sales');
  };
  const backPage = async () => {
    router.push('/ticket-sales/datacustomer');
  };
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  
  const totalSteats = useAppSelector((state: any) => state.seatsReserved.totalSeats)
  console.log(totalSteats)

  const changeImage = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFileName(file.name);
      const reader = new FileReader();
      reader.onload = e => {
        setBackgroundImage(`url(${e.target?.result})`);
      };
      reader.readAsDataURL(file);
    }
  }
  const handleSwitchTab = () => {
    if (menuTab === 'RESERVAR') {
      setMenuTab('COMPRAR');
    } else {
      setMenuTab('RESERVAR');
    }
  };
  return (
    <div>
      <div className="flex flex-row justify-between p-4">
        <h2 className="text-xl font-bold text-primary">Pago</h2>
        <button onClick={closePage} className="btn btn-outline py-0 ">
          <FaTimes className="mr-2 " />
          <span> Cancelar</span>
        </button>
      </div>

      <div className=" grid grid-cols-1 xl:grid-cols-2 xl:space-x-4 xl:space-y-0  space-y-4 space-x-0 mr-4 ">
        <div className=" w-full border rounded-lg p-4 bg-white shadow shadow-slate-200 ">
          <div className="mb-8">
            <div className="flex">
              <div className="grow flex items-center">
                <div className="p-1 mr-4 rounded-full bg-bgblack text-sm">
                  <AiOutlineArrowUp className="text-white" />
                </div>

                <div className="">
                  <div className="text-sm">IDA</div>
                  <div className="text-sm text-primary">{origin_name} - {destination_name}</div>
                </div>
              </div>

              <div className="items-center  ">
                <div className="flex">
                  <div className="">SALIDA:</div>
                  <div className="font-bold">{dateSelected}</div>
                </div>
                <div className="flex">
                  <div className="">SUBTOTAL:</div>
                  <div className="font-bold text-primary">S/. {totalSteats * 30}</div>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <TableIPayments />
            </div>
          </div>
          {/* <div className="mb-8">
            <div className="flex">
              <div className="grow flex items-center">
                <div className="p-1 mr-4 rounded-full bg-bgblack text-sm">
                  <AiOutlineArrowUp className="text-white" />
                </div>

                <div className="">
                  <div className="text-sm">RETORNO</div>
                  <div className="text-sm text-primary">LIMA - TRUJILLO</div>
                </div>
              </div>

              <div className="items-center  ">
                <div className="flex">
                  <div className="">SALIDA:</div>
                  <div className="font-bold">03/07/2023</div>
                </div>
                <div className="flex">
                  <div className="">SUBTOTAL:</div>
                  <div className="font-bold text-primary">S/. 300</div>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <TableIPayments />
            </div>
          </div> */}
        </div>
        <div className=" w-full border rounded-lg p-4 bg-white shadow shadow-slate-200 ">
          <div className="bg-textGreen p-4 rounded-xl flex justify-between text-white font-bold">
            <div>MONTO TOTAL A PAGAR</div>
            <div>S/. {totalSteats * 30}</div>
          </div>
          <div className="text-textGreen font-medium py-2 my-2 ">
            DATOS DEL PAGADOR
          </div>
          <form key={1}>
            <div className="grid grid-cols-2 ">
              <div className="pr-2 mt-4">
                <label
                  htmlFor="type_document"
                  className="block mb-1  font-medium text-sm  ">
                  Tipo de documento
                </label>
                <select id={`${uniqueId}-create-booking-type-document`} defaultValue={'DNI'} 
                 className="select select-bordered rounded-xl w-full max-w-xs bg-bginput">
                  <option value={'DNI'} selected>DNI</option>
                  <option value={'DNI'} >Pasaporte</option>
                </select>
              </div>
              <div className="pl-2 mt-4">
                <label
                  htmlFor="dni"
                  className="block mb-1 font-medium text-sm  ">
                  DNI
                </label>
                <input
                id={`${uniqueId}-create-booking-dni`}
                  type="text"
                  className="w-full py-3 px-5 rounded-xl bg-bginput text-sm "
                  required
                  placeholder="Ingresa nro. de DNI"
                  name='identification_number'
                  onChange={(e) => handleInputChange(e, 0)}
                />
              </div>
              <div className="pr-2 mt-4">
                <label
                  htmlFor="name"
                  className="block mb-1  font-medium text-sm  ">
                  Nombres
                </label>
                <input
                id={`${uniqueId}-create-booking-name`}
                  type="text"
                  className="w-full py-3 px-5 rounded-xl bg-bginput text-sm "
                  required
                  placeholder="Ingresa tus nombres"
                  name='name'
                  onChange={(e) => handleInputChange(e, 0)}
                />
              </div>
              <div className="pl-2 mt-4">
                <label
                  htmlFor="lastname"
                  className="block mb-1 font-medium text-sm  ">
                  Apellido
                </label>
                <input
                id={`${uniqueId}-create-booking-lastname`}
                  type="text"
                  className="w-full py-3 px-5 rounded-xl bg-bginput text-sm "
                  required
                  placeholder="Ingresa tus apellidos"
                  name='last_name'
                  onChange={(e) => handleInputChange(e, 0)}
                />
              </div>
              <div className="pr-2 mt-4">
                <label
                  htmlFor="email"
                  className="block mb-1  font-medium text-sm  ">
                  Correo
                </label>
                <input
                id={`${uniqueId}-create-booking-email`}
                  type="text"
                  className="w-full py-3 px-5 rounded-xl bg-bginput text-sm "
                  required
                  placeholder="Ingresa tu correo"
                  name='email'
                  onChange={(e) => handleInputChange(e, 0)}
                />
              </div>
              <div className="pl-2 mt-4">
                <label
                  htmlFor="username"
                  className="block mb-1 font-medium text-sm  ">
                  Telefono
                </label>
                <input
                  type="text"
                  className="w-full py-3 px-5 rounded-xl bg-bginput text-sm "
                  required
                  placeholder="Ingresa tu teléfono"
                  name='phone'
                  onChange={(e) => handleInputChange(e, 0)}
                />
              </div>
            </div>
          </form>


          <hr className="my-5" />
          {/* <div className=" flex px-4 py-2 justify-center">
            <label className="swap bg-bginput  p-1 rounded-xl">
              <input type="checkbox" />
              <div className="swap-on  flex w-64 justify-center ">
                <div className="grow flex justify-center align-center bg-bgblack text-white py-2  rounded-xl">
                  COMPRAR
                </div>
                <div className="grow  flex justify-center align-center py-2 text-slate-400 ">
                  RESERVAR
                </div>
              </div>
              <div className="swap-off  flex w-64 justify-center ">
                <div className="grow  flex justify-center align-center py-2 text-slate-400 ">
                  COMPRAR
                </div>
                <div className="grow flex justify-center align-center bg-bgblack text-white py-2  rounded-xl">
                  RESERVAR
                </div>
              </div>
            </label>
          </div> */}
          <div className='flex justify-center mb-8 bg-red'>
            <div className="tabs tabs-boxed rounded-[14px]">
              <a
                className={cn(
                  'tab grow px-8',
                  menuTab === 'COMPRAR' && 'tab-active',
                )}
                onClick={handleSwitchTab}>
                COMPRAR
              </a>
              <a
                className={cn(
                  'tab grow px-8',
                  menuTab === 'RESERVAR' && 'tab-active',
                )}
                onClick={handleSwitchTab}>
                RESERVAR
              </a>
            </div>
          </div>

          {
            menuTab === 'COMPRAR' ? <div> <div className="text-textGreen font-medium py-2 my-2 ">Pago</div>
              <div className="space-y-2">
                <div className="collapse  bg-white border border-textGreen ">
                  <input type="radio" name="my-accordion-6" />
                  <div className="collapse-title text-sm font-medium flex justify-between">
                    EFECTIVO{' '}
                    <input
                      type="radio"
                      name="my-accordion-6"
                      className="radio border border-textGreen"
                    />
                  </div>
                  <div className="collapse-content">
                    <div className="grid grid-cols-2">
                      <div className="pr-2 mt-4">
                        <label
                          htmlFor="username"
                          className="block mb-1 font-medium text-sm  ">
                          Tipo de documento
                        </label>
                        <input
                          type="text"
                          className="w-full py-3 px-5 rounded-xl bg-bginput text-sm "
                          required
                          placeholder="S/. 00.0"
                        />
                      </div>
                      <div className="pr-2 mt-4">
                        <label
                          htmlFor="username"
                          className="block mb-1 font-medium text-sm  ">
                          Cambio de
                        </label>
                        <input
                          type="text"
                          className="w-full py-3 px-5 rounded-xl bg-bginput text-sm "
                          required
                          placeholder="S/. 00.0"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="collapse bg-white border border-textGreen">
                  <input type="radio" name="my-accordion-6" />
                  <div className="collapse-title text-sm font-medium flex justify-between">
                    TARJETAS DE CRÉDITO O DÉBITO{' '}
                    <input
                      type="radio"
                      name="my-accordion-6"
                      className="radio border border-textGreen"
                    />
                  </div>
                  <div className="collapse-content">
                    <div className="pr-2 mt-4">
                      <label className="block mb-1 font-medium text-sm  ">
                        Cambio de
                      </label>
                      <input
                        type="text"
                        className="w-full py-3 px-5 rounded-xl bg-bginput text-sm "
                        required
                        placeholder="Ingresa el código del voucher"
                      />
                    </div>
                  </div>
                </div>
                <div className="collapse bg-white border border-textGreen">
                  <input type="radio" name="my-accordion-6" />
                  <div className="collapse-title text-sm font-medium flex justify-between">
                    BILLETERA VIRTUAL
                    <input
                      type="radio"
                      name="my-accordion-6"
                      className="radio border border-textGreen"
                    />
                  </div>
                  <div className="collapse-content">
                    {/* <div className="mt-4 py-6 border border-dashed border-2 rounded-xl shadow-sm grid grid-cols-3 items-center justify-center">
                     <div className="flex justify-center">
                       <AddImage />
                     </div>
   
                     <label
                       htmlFor="file-input"
                       className="col-span-2 cursor-pointer text-gray-300 py-2 px-4 ">
                       Arrastra y suelta una imagen aquí o haz clic para buscar en
                       tu computadora
                     </label>
                     <input type="file" id="file-input" className="hidden" />
                   </div> */}
                    <label
                      htmlFor="dropzone-file"
                      className={cn(
                        'flex bg-cover bg-no-repeat bg-center flex-col items-center justify-center w-9/12 h-[20rem] cursor-pointer rounded-lg overflow-hidden',
                        !backgroundImage
                          ? 'border border-dashed border-gray-200'
                          : '',
                      )}
                      style={{
                        backgroundImage: backgroundImage ?? undefined,
                      }}>
                      <div className="flex flex-1">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          {!selectedFileName ? (
                            <>
                              <AddImage className="mb-4" />

                              <p
                                className={cn(
                                  'text-center w-8/12 text-sm',
                                  backgroundImage
                                    ? 'text-white'
                                    : 'text-gray-500',
                                )}>
                                <span className="font-semibold">
                                  Arrastra y suelta
                                </span>{' '}
                                una imagen aquí o haz clic para buscar en tu
                                computadora
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
                        onChange={changeImage}
                      />
                    </label>
                  </div>
                </div>
              </div>  </div> : <p></p>
          }


          <div className="flex justify-end ">
            <div className="grid grid-cols-2  mt-4 w-96 gap-4">
              <button
                onClick={backPage}
                className="w-full m-2 btn btn-outline hover:bg-primary hover:border-white text-primary normal-case font-medium rounded-xl">
                Atrás
              </button>
              <button
                onClick={handleCreateNewBookingSubmit}
                className="w-full  m-2 btn btn-info bg-primary hover:bg-secondary text-white rounded-xl border-white normal-case font-medium">
                Continuar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
