'use client';


import { Grid } from 'gridjs-react';
import { _ } from 'gridjs-react';
import { FiMenu, FiPower } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import AvatarImage from '@/assets/img/loginbg.png';
import Image from 'next/image';
import { FaPlus } from 'react-icons/fa6';
import { cn } from '@/utils/cn';
import { BiSolidEditAlt } from 'react-icons/bi';
import { useId } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
const PassengerDetailPage: React.FC = () => {
    const router = useRouter();

    const dispatch = useAppDispatch()
    const uniqueId = useId();
    const ConfirmPage = () => {
        // console.log(bool)
        router.push('/passengers');
        // dispatch(changeValidHistory(bool))
    };
    const NextPage = () => {
      // console.log(bool)
      router.push('/ticket-history/1');
      // dispatch(changeValidHistory(bool))
  };

    const totalSteats = useAppSelector((state: any) => state.validHistory.value)
    return (
        <div className="flex flex-col">
            {/** Heading */}

            <div className='bg-bgCommonInput p-4 flex flex-wrap gap-4'>
                <div className="avatar">
                    <div className=" rounded-full ring-offset-base-2 ring-offset-1 cursor-pointer">
                        <Image
                            src={AvatarImage}
                            alt="TuPasaje Avatar"
                            width={80}
                            height={80}
                            className="h-8 w-24"
                        />
                    </div>
                </div>
                <div className=' ml-4 font-black flex flex-col justify-center grow '>
                    Tamay Garrido, Franco
                </div>
                <div className='flex flex-col justify-center gap-2 grow '>
                    <div className='flex gap-10'>
                        <div className='font-medium'>
                            DNI
                        </div>
                        <div>
                            65891256
                        </div>
                    </div>
                    <div className='flex gap-10'>
                        <div className='font-medium'>
                            RUC
                        </div>
                        <div>
                            -
                        </div>
                    </div>
                </div>
                <div className='flex flex-col justify-center gap-2 grow '>
                    <div className='flex gap-10'>
                        <div className='font-medium'>
                            Correo
                        </div>
                        <div>
                            tg@gmail.com
                        </div>
                    </div>
                    <div className='flex gap-10'>
                        <div className='font-medium'>
                            Celular
                        </div>
                        <div>
                            931883903
                        </div>
                    </div>
                </div>
                <div className='flex flex-col justify-center gap-2 '>
                    <button
                    onClick={()=>{ 
                        // @ts-ignore
                        window[`${uniqueId}-edit-passenger-modal`].showModal();
                        }}
                        className={cn(
                            'btn flex flex-row items-center text-white font-bold text-sm bg-bgblack rounded-full px-4 py-2 hover:bg-bggris',
                            'rounded-xl',
                        )}>
                        <BiSolidEditAlt className="mr-2" />
                        <span>EDITAR DATOS</span>
                        
                    </button>
                </div>
            </div>

            <div className='p-4 mt-8'>

            <div className="flex flex-row justify-between">
                <div className="pb-4">
                    <h2 className="text-xl font-bold text-bgblack">
                        Historial de viajes
                    </h2>
                </div>
            </div>
                {/** Table */}
                <div className="w-full overflow-auto">
                    <Grid
                        search={true}

                        style={{ width: '100%' }}
                        data={[
                            [
                                '0000001',
                                '28/08/2023 16:30',
                                'LIMA',
                                'AYACUCHO',
                                'S/. 50.0',
                                _(
                                    <div className="text-primary font-medium">
                                        EMITIDO

                                    </div>,
                                ),
                                _(
                                    <div className="flex">
                                        <button
                                            className={
                                                'h-10 w-10 border rounded-xl text-white text-xl flex items-center justify-center bg-primary'
                                            }
                                            onClick={() => { NextPage() }}
                                            >
                                            <FiMenu />
                                        </button>

                                    </div>,
                                ),
                            ],
                            [
                                '0000002',
                                '29/08/2023 12:30',
                                'AYACUCHO',
                                'LIMA',
                                'S/. 50.0',
                                _(
                                    <div className="text-primary font-medium">
                                        EMITIDO

                                    </div>,
                                ),
                                _(
                                    <div className="flex">
                                        <button
                                            className={
                                                'h-10 w-10 border rounded-xl text-white text-xl flex items-center justify-center bg-primary'
                                            }
                                            onClick={() => { NextPage() }}
                                            >
                                            <FiMenu />
                                        </button>
                                    </div>,
                                ),
                            ],
                            [
                                '0000003',
                                '09/09/2023 18:30',
                                'LIMA',
                                'AYACUCHO',
                                'S/. 50.0',
                                _(
                                    <div className="text-textGreen font-medium">
                                        ACTIVO

                                    </div>,
                                ),
                                _(
                                    <div className="flex">
                                        <button
                                            className={
                                                'h-10 w-10 border rounded-xl text-white text-xl flex items-center justify-center bg-primary'
                                            }
                                            onClick={() => { NextPage() }}
                                            >
                                            <FiMenu />
                                        </button>

                                    </div>,
                                ),
                            ],
                        ]}
                        columns={[
                            'ID TICKET',
                            'FECHA',
                            'ORIGEN',
                            'DESTINO',
                            'PRECIO',
                            'ESTADO',
                            'ACCIONES',
                        ]}
                        pagination={false}
                        sort={true}
                    />
                </div>
            </div>

             {/* Modal crear ciudad */}
      <dialog
        id={`${uniqueId}-edit-passenger-modal`}
        className="modal modal-middle">
        <form
          method="dialog"
          className="modal-box w-8/12 max-w-5xl"
        //   onSubmit={handleSubmit}
          >
          <div className="flex relative items-center justify-center">
            <div className="grow h-14 flex justify-center items-center font-medium text-xl">
              Nueva Empresa
            </div>

            <button
              onClick={event => {
                event.preventDefault();
                // @ts-ignore
                window[`${uniqueId}-edit-passenger-modal`].close();
              }}
              className="btn right-0 absolute btn-circle bg-thcolor text-primary text-3xl">
              <IoCloseOutline className="" />
            </button>
          </div>
          <hr />
          <div className='grid grid-cols-2 gap-4 mt-10 mb-10 '>
             
              <div className="mb-4">
            <label
              htmlFor={`${uniqueId}-create-companie-name`}
              className="block mb-2 font-medium text-sm ">
              Nombre 
            </label>
            <input
              type="text"
              id={`${uniqueId}-create-companie-name`}
            //   value={newCompanieData.company_name}
            //   onChange={({target: {value: company_name}}) => {
            //     setNewCompanieData({
            //       ...newCompanieData,
            //       company_name,
            //     });
            //   }}
              className="w-full py-3 px-5 rounded-br11 bg-bginput text-sm "
              required
              placeholder="Ingresar nombre"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor={`${uniqueId}-create-companie-represent`}
              className="block mb-2 font-medium text-sm ">
              Apellido
            </label>
            <input
              type="text"
              id={`${uniqueId}-create-companie-represent`}
            //   value={newCompanieData.responsible_name}
            //   onChange={({target: {value: responsible_name}}) => {
            //     setNewCompanieData({
            //       ...newCompanieData,
            //       responsible_name,
            //     });
            //   }}
              className="w-full py-3 px-5 rounded-br11 bg-bginput text-sm "
              required
              placeholder="Ingresar apellidos"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor={`${uniqueId}-create-companie-reason`}
              className="block mb-2 font-medium text-sm ">
              DNI
            </label>
            <input
              type="text"
              id={`${uniqueId}-create-companie-reason`}
              // value={newCompanieData.tax_id}
              // onChange={({target: {value: tax_id}}) => {
              //   setNewCompanieData({
              //     ...newCompanieData,
              //     tax_id,
              //   });
              // }}
              className="w-full py-3 px-5 rounded-br11 bg-bginput text-sm "
              required
              placeholder="Ingresar DNI"
            />
          </div>
           
             
              <div className="mb-4">
            <label
              htmlFor={`${uniqueId}-create-companie-phone`}
              className="block mb-2 font-medium text-sm ">
              RUC
            </label>
            <input
            maxLength={9}
              type="text"
              id={`${uniqueId}-create-companie-phone`}
            //   value={newCompanieData.phone}
            //   onChange={({target: {value: phone}}) => {
            //     setNewCompanieData({
            //       ...newCompanieData,
            //       phone,
            //     });
            //   }}
              className="w-full py-3 px-5 rounded-br11 bg-bginput text-sm "
              required
              placeholder="Ingresar RUC"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor={`${uniqueId}-create-companie-ruc`}
              className="block mb-2 font-medium text-sm ">
              Celular
            </label>
            <input
              type="text"
              id={`${uniqueId}-create-companie-ruc`}
            //   value={newCompanieData.tax_id}
            //   onChange={({target: {value: tax_id}}) => {
            //     setNewCompanieData({
            //       ...newCompanieData,
            //       tax_id,
            //     });
            //   }}
              className="w-full py-3 px-5 rounded-br11 bg-bginput text-sm "
              required
              placeholder="+51"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor={`${uniqueId}-create-companie-address`}
              className="block mb-2 font-medium text-sm ">
              Correo
            </label>
            <input
              type="text"
              id={`${uniqueId}-create-companie-address`}
            //   value={newCompanieData.address}
            //   onChange={({target: {value: address}}) => {
            //     setNewCompanieData({
            //       ...newCompanieData,
            //       address,
            //     });
            //   }}
              className="w-full py-3 px-5 rounded-br11 bg-bginput text-sm "
              required
              placeholder="Ingresar correo"
            />
          </div>
             
          </div>
          <hr />
          <button
            type="submit"
            // disabled={createCompaniesIsLoading}
            className="w-full mt-4 bg-primary text-white font-medium py-2 px-4 rounded-br11 hover:bg-tertiary transition-colors text-base">
            Guardar
          </button>
        </form>
      </dialog>
      <hr className='mt-8' />
      <div className="flex justify-end mb-4">
              <button
                onClick={ConfirmPage}
                className="w-32 m-2 btn btn-info bg-primary hover:bg-secondary text-white rounded-xl border-white normal-case font-medium">
                Confirmar
              </button>
            </div>
        </div>
    );
};

export default PassengerDetailPage;