'use client';

import {FaTimes} from 'react-icons/fa';
import {AiOutlineArrowDown, AiOutlineArrowUp} from 'react-icons/ai';
import TableItineraries from './components/table';
import {useRouter} from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks'


const Itinerary: React.FC = () => {
  const router = useRouter();
  const handleSubmit = async () => {
    router.push('/ticket-sales/seatingup');
  };
  const closePage = async () => {
    router.push('/ticket-sales');
  };

  
  const destination_name = useAppSelector((state) => state.ItinerarySelected.cityDestination)
  const origin_name = useAppSelector((state) => state.ItinerarySelected.cityOrigin)
  const date = useAppSelector((state) => state.ItinerarySelected.dateSince)

  return (
    <div>
      <div className="flex flex-row justify-between p-4">
        <h2 className="text-xl font-bold text-primary">Itinerarios</h2>
        <button onClick={closePage} className="btn btn-outline py-0 ">
          <FaTimes className="mr-2 " />
          <span> Cancelar</span>
        </button>
      </div>
      <div className=" grid grid-cols-1 xl:grid-cols-1 xl:space-x-4 space-x-0 mr-4 ">
        <div className=" w-full border rounded-lg p-4 bg-white shadow shadow-slate-200 ">
          <div className="flex">
            <div className="grow flex items-center">
              <div className="p-2 mr-4 rounded-full bg-bgblack text-xl">
                <AiOutlineArrowUp className="text-white" />
              </div>

              <div className="">
                <div className="text-xl">IDA</div>
                <div className="text-xl text-primary">{origin_name} - {destination_name}</div>
              </div>
            </div>

            <div className="flex items-center  ">
              <div className="">SALIDA:</div>
              <div className="font-bold">{date}</div>
            </div>
          </div>
          <div className="mt-8 overflow-auto">
            <TableItineraries />
          </div>
        </div>
        {/* <div className=" w-full border rounded-lg p-4 bg-white shadow shadow-slate-200 ">
          <div className="flex">
            <div className="grow flex items-center">
              <div className="p-2 mr-4 rounded-full bg-bgblack text-xl">
                <AiOutlineArrowDown className="text-white" />
              </div>

              <div className="">
                <div className="text-xl">RETORNO</div>
                <div className="text-xl text-primary">LIMA - TRUJILLO</div>
              </div>
            </div>

            <div className="flex items-center  ">
              <div className="">SALIDA:</div>
              <div className="font-bold">16/07/2023</div>
            </div>
          </div>
          <div className="mt-8">
            <TableItinerariesIda />
          </div>
        </div> */}
      </div>
      <div className="flex flex-row justify-end p-4">
        <button
          onClick={handleSubmit}
          className=" bg-primary text-white font-medium py-2 px-4 rounded-br11 hover:bg-tertiary transition-colors text-base">
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Itinerary;
