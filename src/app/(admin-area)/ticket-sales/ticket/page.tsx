'use client';

import {AiOutlineArrowUp} from 'react-icons/ai';
import {useRouter} from 'next/navigation';
import Donwload from '@/assets/svg/download.svg';
import Print from '@/assets/svg/print.svg';
import AddImage from '@/assets/svg/addimage.svg';

const Ticket: React.FC = () => {
  const router = useRouter();
  const handleSubmit = async () => {
    router.push('/pay');
  };
  return (
    <div>
      <div className="flex flex-row justify-between p-4">
        <h2 className="text-xl font-bold text-primary">Ticket</h2>
      </div>

      <div className=" grid grid-cols-1 xl:grid-cols-3 xl:space-x-4 xl:space-y-0  space-y-4 space-x-0 mr-4 ">
        <div className="col-span-1 w-full border rounded-lg p-4 bg-white shadow shadow-slate-200 ticket flex ">
          
        </div>
        <div className="col-span-2 border rounded-lg p-4 bg-white shadow shadow-slate-200 ">
          <div className="font-medium">ACCIONES</div>
          <div className="text-textGreen font-medium py-2 my-2 ">
            DATOS DEL PAGADOR
          </div>
          <div className="grid grid-cols-2  space-x-3">
            <button className="btn btn-outline text-sm hover:text-primary hover:border-primary hover:bg-white">
              <div className="hover:text-primary">
                <Print />
              </div>
              IMPRIMIR
            </button>
            <button className="btn btn-outline hover:text-primary hover:border-primary hover:bg-white">
              <Donwload />
              GUARDAR
            </button>
          </div>
          <div className="p-4 border rounded-xl mt-4">
            <div className="font-medium text-primary">ENVIAR POR CORREO</div>
            <label className="block mb-2  mt-3 font-medium text-sm ">
              Email
            </label>
            <div className="flex  ">
              <input
                type="text"
                id="country"
                className="grow mr-4 py-3 px-5 rounded-br11 bg-bginput text-sm col-span-1  "
                // required
                placeholder="Ingresa correco electrónico"
              />
              <button className="px-8 bg-bgblack text-white font-medium rounded-br11 hover:bg-bginput transition-colors text-base">
                Enviar
              </button>
            </div>
          </div>
          <div className="flex flex-row justify-center p-4 mt-8">
            <button
              onClick={handleSubmit}
              className="w-2/4 bg-primary text-white font-medium py-2  rounded-br11 hover:bg-tertiary transition-colors text-base">
              FINALIZAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
