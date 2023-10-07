'use client';

import {FaTimes} from 'react-icons/fa';
import {AiOutlineArrowUp} from 'react-icons/ai';
import {useRouter} from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useState,useRef  } from 'react';
import { changeDataCustomer } from '@/redux/features/dataCustomerSilce';

const DataCustomer: React.FC = () => {
  const router = useRouter();
  const formRef = useRef(null);

  const destination_name = useAppSelector((state) => state.ItinerarySelected.cityDestination)
  const origin_name = useAppSelector((state) => state.ItinerarySelected.cityOrigin)
  const dateSelected = useAppSelector((state) => state.ItinerarySelected.dateSince)
  const backPage = async () => {
    router.push('/ticket-sales/seatingup');
  };
  const handleSubmit = () => {
    router.push('/ticket-sales/payment');
    

  };
  const totalSteats = useAppSelector((state: any) => state.seatsReserved.totalSeats)
  const seats1 = useAppSelector((state) => state.seatsReserved.seats)
  console.log(seats1)
  const closePage = async () => {
    router.push('/ticket-sales/');
  };

  const numFormularios = totalSteats; // Cambia el número según la cantidad deseada de formularios
  const [datosFormularios, setDatosFormularios] = useState(
    Array(numFormularios).fill({ name: '', document: '',document_type:'DNI' })
  );

  const handleInputChange = (event:any, index:any) => {
    const { name, value } = event.target;
    const nuevosDatos = [...datosFormularios];
    nuevosDatos[index] = {
      ...nuevosDatos[index],
      [name]: value,
    };
    setDatosFormularios(nuevosDatos);
  };
  let dispatch = useAppDispatch()
  const enviarTodosLosDatos = (event:any) => {
    event.preventDefault();
    dispatch(changeDataCustomer(datosFormularios));
    router.push('/ticket-sales/payment');
  };

  const formularios = [];

  for (let i = 0; i < numFormularios; i++) {
    formularios.push(
      <form key={i}>
                 <div className="collapse collapse-plus bg-white shadow mb-4">
             <input type="radio" name={`my-accordion-${i}`} />
             <div className="collapse-title flex">
               <div className="  bg-bgblack text-white py-2 px-5 rounded-xl">
                 PASAJERO {i + 1}
               </div>
             </div>
             <div className="collapse-content">
               <div className="my-2 mb-4">
                 <div className="flex font-medium mb-2">Datos del pasajero</div>
                 <div className="flex space-x-5">
                   <div>
                     <select id={`${i}-document_type`} name={`document_type`} defaultValue={'DNI'} onChange={(e) => handleInputChange(e, i)} className="select select-bordered w-full max-w-xs bg-bginput">
                       <option value={'DNI'} selected>DNI</option>
                    <option value={'PASAPORTE'}>Pasaporte</option>
                   </select>
                  </div>
                  <div className="grow">
                     <input
                      type="text"
                      id={`${i}-document`}
                      name={`document`}
                      onChange={(e) => handleInputChange(e, i)}
                      defaultValue={datosFormularios[i].document || ''}
                      className="w-full py-3 px-5 rounded-lg bg-bginput text-sm "
                      required
                      placeholder="Número de documento"
                    />
                  </div>
  
                  <div className="grow">
                    <input
                      type="text"
                      id={`${i}-name`}
                      name={`name`}
                      onChange={(e) => handleInputChange(e, i)}
                      defaultValue={datosFormularios[i].name || ''}
                      className="w-full py-3 px-5 rounded-lg bg-bginput text-sm "
                      required
                      placeholder="Nombres y apellidos completos"
                    />
                  </div>
                  <div>
                    <select id={`${i}-sexo`} defaultValue={'M'} className="select select-bordered w-full max-w-xs bg-bginput">
                      <option value={' '} selected disabled>
                        Sexo
                      </option>
                      <option value={'H'} >Hombre</option>
                      <option value={'M'} >Mujer</option>
                      <option value={'O'} >Otro</option>
                    </select>
                  </div>
                   {/* <div>
                     <input
                      type="date"
                      id={`${i+1}-birthday`}
                      className="py-3 px-5 rounded-lg bg-bginput text-sm "
                      required
                      placeholder="Ingresa tu nombre de usuario"
                    />
                  </div> */}
                </div>
              </div>
  
              <div className="my-2 mb-4">
                <div className="grid grid-cols-2 ">
                  {/* <div className="pr-5">
                    <div className="flex font-medium mb-2">
                      Datos del facturación
                    </div>
                    <div className="flex space-x-5">
                      <div className="grow">
                        <input
                          type="text"
                          id={`${i+1}-ruc`}
                          className="w-full py-3 px-5 rounded-lg bg-bginput text-sm "
                          // required
                          placeholder="RUC (Opcional)"
                        />
                      </div>
  
                      <div className="grow">
                        <input
                          type="text"
                          id={`${i+1}-social-reason`}
                          className="w-full py-3 px-5 rounded-lg bg-bginput text-sm "
                          required
                          placeholder="Razón social"
                        />
                      </div>
                      <div>
                        <select className="select select-bordered w-full max-w-xs bg-bginput">
                          <option selected disabled>
                            Tipo
                          </option>
                          <option>Boleta</option>
                          <option>Factura</option>
                        </select>
                      </div>
                    </div>
                  </div> */}
                  <div className="">
                    <div className="flex font-medium mb-2">
                      Datos del contacto
                    </div>
                    <div className="flex space-x-5">
                      <div className="grow">
                        <input
                          type="text"
                          id={`${i}-email`}
                          className="w-full py-3 px-5 rounded-lg bg-bginput text-sm "
                          required
                          placeholder="Correo"
                          // value={datosFormularios[i].email}
                          // onChange={(e) => handleInputChange(e, i)}
                        />
                      </div>
  
                      <div className="grow">
                        <input
                          type="text"
                          id={`${i}-phone`}
                          className="w-full py-3 px-5 rounded-lg bg-bginput text-sm "
                          required
                          placeholder="Celular"
                        />
                      </div>
                    </div>
                    <div className="flex text-sm text-red-400 mb-2">
                      *Estos datos son necesarios en caso de alguna emergencia.
                    </div>
                  </div>
                </div>
              </div>
  
              <div className="my-2 mb-4">
                <div className="grid grid-cols-2 ">
                  <div>
                    <div className="pr-5">
                      <div className="flex font-medium mb-2">Datos de viaje</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="pr-8">
                        <div className="font-medium">IDA</div>
                        <div className="font-medium text-primary">
                          {origin_name} - {destination_name}
                        </div>
                        <div className="text-primary mb-4">({dateSelected})</div>
                        <div className="font-book mb-2">Número de asiento</div>
                        <div>
                          <select defaultValue={' '} className="select select-bordered w-full max-w-xs bg-bginput">
                            <option selected disabled>
                              Seleccionar
                            </option>
                            <option value={1}>A1</option>
                            <option value={2}>A2</option>
                            <option value={3}>B1</option>
                            <option value={4}>B2</option>
                          </select>
                        </div>
                      </div>
                      {/* <div className="pl-8">
                        <div className="font-medium">IDA</div>
                        <div className="font-medium text-primary">
                          TRUJILLO-LIMA
                        </div>
                        <div className="text-primary mb-4">(03/07/2023)</div>
                        <div className="font-book mb-2">Número de asiento</div>
                        <div>
                          <select className="select select-bordered w-full max-w-xs bg-bginput">
                            <option selected disabled>
                              Seleccionar
                            </option>
                            <option>09</option>
                            <option>10</option>
                            <option>11</option>
                            <option>12</option>
                          </select>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            </form>
      // <form key={i}>
      //   <h2>Formulario {i + 1}</h2>
      //   <div>
      //     <label htmlFor={`nombre${i}`}>Nombre:</label>
      //     <input
      //       type="text"
      //       id={`nombre${i}`}
      //       name="nombre"
      //       value={datosFormularios[i].nombre}
      //       onChange={(e) => handleInputChange(e, i)}
      //     />
      //   </div>
      //   <div>
      //     <label htmlFor={`email${i}`}>Email:</label>
      //     <input
      //       type="text"
      //       id={`email${i}`}
      //       name="email"
      //       value={datosFormularios[i].email}
      //       onChange={(e) => handleInputChange(e, i)}
      //     />
      //   </div>
      // </form>
    );
  }

  return (
    <div>
             <div className="flex flex-row justify-between p-4">
         <h2 className="text-xl font-bold text-primary">Datos de pasajeros</h2>
         <p>{
seats1
          }</p>
        <button onClick={closePage} className="btn btn-outline py-0 ">
           <FaTimes className="mr-2 " />
           <span> Cancelar</span>
         </button>
      
       </div>
      {formularios}
      <div className="flex justify-end ">
      <div className="grid grid-cols-2 mt-4 w-96 ">
           <button
            onClick={backPage}
            className="w-full m-2 btn btn-outline hover:bg-primary hover:border-white text-primary normal-case font-medium rounded-xl">
            Atrás
          </button>
          <button
          type="submit"
          onClick={enviarTodosLosDatos}
            className="w-full  m-2 btn btn-info bg-primary hover:bg-secondary text-white rounded-xl border-white normal-case font-medium">
            Continuar
          </button>
        </div>
      </div>  
      {/* <button onClick={enviarTodosLosDatos}>Enviar Todos los Datos</button> */}
    </div>
  );
  // return (
  //   <div>
  //     <div className="flex flex-row justify-between p-4">
  //       <h2 className="text-xl font-bold text-primary">Datos de pasajeros</h2>
  //       <button onClick={closePage} className="btn btn-outline py-0 ">
  //         <FaTimes className="mr-2 " />
  //         <span> Cancelar</span>
  //       </button>
      
  //     </div>

      
       
      

  //     <div className="flex flex-col ">
  //     {
  //       Array.from({length: totalSteats}, (_, seatIndex) => {
  //         const seatNumber = 1 + seatIndex;

  //         return (
  //           <form ref={formRef}>
  //               <div className="collapse collapse-plus bg-white shadow mb-4">
  //           <input type="radio" name="my-accordion-2" />
  //           <div className="collapse-title flex">
  //             <div className="  bg-bgblack text-white py-2 px-5 rounded-xl">
  //               PASAJERO {seatNumber}
  //             </div>
  //           </div>
  //           <div className="collapse-content">
  //             <div className="my-2 mb-4">
  //               <div className="flex font-medium mb-2">Datos del pasajero</div>
  //               <div className="flex space-x-5">
  //                 <div>
  //                   <select className="select select-bordered w-full max-w-xs bg-bginput">
  //                     <option selected>DNI</option>
  //                     <option>Pasaporte</option>
  //                   </select>
  //                 </div>
  //                 <div className="grow">
  //                   <input
  //                     type="text"
  //                     id={`${seatNumber}-dni`}
  //                     name={`${seatNumber}-dni`}
  //                     className="w-full py-3 px-5 rounded-lg bg-bginput text-sm "
  //                     required
  //                     placeholder="Número de documento"
  //                   />
  //                 </div>
  
  //                 <div className="grow">
  //                   <input
  //                     type="text"
  //                     id={`${seatNumber}-name`}
  //                     name={`${seatNumber}-name`}
  //                     className="w-full py-3 px-5 rounded-lg bg-bginput text-sm "
  //                     required
  //                     placeholder="Nombres y apellidos completos"
  //                   />
  //                 </div>
  //                 <div>
  //                   <select id={`${seatNumber}-sexo`} className="select select-bordered w-full max-w-xs bg-bginput">
  //                     <option selected disabled>
  //                       Sexo
  //                     </option>
  //                     <option>Hombre</option>
  //                     <option>Mujer</option>
  //                     <option>Otro</option>
  //                   </select>
  //                 </div>
  //                 <div>
  //                   <input
  //                     type="date"
  //                     id={`${seatNumber}-birthday`}
  //                     className="py-3 px-5 rounded-lg bg-bginput text-sm "
  //                     required
  //                     placeholder="Ingresa tu nombre de usuario"
  //                   />
  //                 </div>
  //               </div>
  //             </div>
  
  //             <div className="my-2 mb-4">
  //               <div className="grid grid-cols-2 ">
  //                 <div className="pr-5">
  //                   <div className="flex font-medium mb-2">
  //                     Datos del facturación
  //                   </div>
  //                   <div className="flex space-x-5">
  //                     <div className="grow">
  //                       <input
  //                         type="text"
  //                         id={`${seatNumber}-ruc`}
  //                         className="w-full py-3 px-5 rounded-lg bg-bginput text-sm "
  //                         // required
  //                         placeholder="RUC (Opcional)"
  //                       />
  //                     </div>
  
  //                     <div className="grow">
  //                       <input
  //                         type="text"
  //                         id={`${seatNumber}-social-reason`}
  //                         className="w-full py-3 px-5 rounded-lg bg-bginput text-sm "
  //                         required
  //                         placeholder="Razón social"
  //                       />
  //                     </div>
  //                     <div>
  //                       <select className="select select-bordered w-full max-w-xs bg-bginput">
  //                         <option selected disabled>
  //                           Tipo
  //                         </option>
  //                         <option>Boleta</option>
  //                         <option>Factura</option>
  //                       </select>
  //                     </div>
  //                   </div>
  //                 </div>
  //                 <div className="pl-5">
  //                   <div className="flex font-medium mb-2">
  //                     Datos del contacto
  //                   </div>
  //                   <div className="flex space-x-5">
  //                     <div className="grow">
  //                       <input
  //                         type="text"
  //                         id={`${seatNumber}-email`}
  //                         className="w-full py-3 px-5 rounded-lg bg-bginput text-sm "
  //                         required
  //                         placeholder="Correo"
  //                       />
  //                     </div>
  
  //                     <div className="grow">
  //                       <input
  //                         type="text"
  //                         id={`${seatNumber}-phone`}
  //                         className="w-full py-3 px-5 rounded-lg bg-bginput text-sm "
  //                         required
  //                         placeholder="Celular"
  //                       />
  //                     </div>
  //                   </div>
  //                   <div className="flex text-sm text-red-400 mb-2">
  //                     *Estos datos son necesarios en caso de alguna emergencia.
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  
  //             <div className="my-2 mb-4">
  //               <div className="grid grid-cols-2 ">
  //                 <div>
  //                   <div className="pr-5">
  //                     <div className="flex font-medium mb-2">Datos de viaje</div>
  //                   </div>
  //                   <div className="grid grid-cols-2">
  //                     <div className="pr-8">
  //                       <div className="font-medium">IDA</div>
  //                       <div className="font-medium text-primary">
  //                         {origin_name} - {destination_name}
  //                       </div>
  //                       <div className="text-primary mb-4">({dateSelected})</div>
  //                       <div className="font-book mb-2">Número de asiento</div>
  //                       <div>
  //                         <select className="select select-bordered w-full max-w-xs bg-bginput">
  //                           <option selected disabled>
  //                             Seleccionar
  //                           </option>
  //                           <option value={1}>A1</option>
  //                           <option value={2}>A2</option>
  //                           <option value={3}>B1</option>
  //                           <option value={4}>B2</option>
  //                         </select>
  //                       </div>
  //                     </div>
  //                     {/* <div className="pl-8">
  //                       <div className="font-medium">IDA</div>
  //                       <div className="font-medium text-primary">
  //                         TRUJILLO-LIMA
  //                       </div>
  //                       <div className="text-primary mb-4">(03/07/2023)</div>
  //                       <div className="font-book mb-2">Número de asiento</div>
  //                       <div>
  //                         <select className="select select-bordered w-full max-w-xs bg-bginput">
  //                           <option selected disabled>
  //                             Seleccionar
  //                           </option>
  //                           <option>09</option>
  //                           <option>10</option>
  //                           <option>11</option>
  //                           <option>12</option>
  //                         </select>
  //                       </div>
  //                     </div> */}
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //           </form>
          
  //         );
  //       })}
        
  //     </div>
  //     <div className="flex justify-end ">
  //       <div className="grid grid-cols-2 mt-4 w-96 ">
  //         <button
  //           onClick={backPage}
  //           className="w-full m-2 btn btn-outline hover:bg-primary hover:border-white text-primary normal-case font-medium rounded-xl">
  //           Atrás
  //         </button>
  //         <button
  //         type="submit"
  //         onClick={handleSubmit}
  //           className="w-full  m-2 btn btn-info bg-primary hover:bg-secondary text-white rounded-xl border-white normal-case font-medium">
  //           Continuar
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default DataCustomer;
