'use client';

import {FaPlus} from 'react-icons/fa';
import {Grid} from 'gridjs-react';
import SearchIcon from '@/assets/svg/search.svg';
import {_} from 'gridjs-react';
import {BiTrash} from 'react-icons/bi';
import {HiOutlinePencil} from 'react-icons/hi';
import {FiMenu, FiPower} from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { changeValidHistory } from '@/redux/features/historySlice';
import { CalendarIcon } from '../ticket-history/[id]/components/CalendarIcon';
import ButtonCreate from '@/components/ButtonCreate';
import TablePassenger from './components/tablePassenger';
const PassengerPage: React.FC = () => {
  const router = useRouter();

  const dispatch = useAppDispatch()
  
  const nextPage = (bool:boolean) => {
    // console.log(bool)
    router.push('/passengers/1');
    // dispatch(changeValidHistory(bool))
  };

  const totalSteats = useAppSelector((state: any) => state.validHistory.value)
  return (
    <div className="flex flex-col">
      {/** Heading */}
      <div className="flex flex-row justify-between">
        <div className="p-4">
          <h2 className="text-xl font-bold text-primary">
            Historial de pasajeros
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
      <div className="w-full overflow-auto">
        {/* <Grid
        search={true}
        
          style={{width: '100%'}}
          data={[
            [
              '65891256',
              'Tamay Garrido, Franco',
              'tg@gmail.com',
              '931883803',
              _(
                <div className="flex">
                  <button
                    className={
                      'h-10 w-10 border rounded-xl text-white text-xl flex items-center justify-center bg-primary'
                    }
                    onClick={() => {nextPage(false)}}>
                   <FiMenu />
                  </button>
                  
                </div>,
              ),
            ],
            [
              '70908716',
              'Sánchez burgos, Diego',
              'sb@gmail.com',
              '931883802',
              _(
                <div className="flex">
                  <button
                    className={
                      'h-10 w-10 border rounded-xl text-white text-xl flex items-center justify-center bg-primary'
                    }
                    onClick={() => {nextPage(true)}}>
                    <FiMenu />
                  </button>
                </div>,
              ),
            ],
            [
              '87946521',   
              'Arana rodriguez, luciana ',
              'ar@gmail.com',
              '931883801',
              _(
                <div className="flex">
                  <button
                    className={
                      'h-10 w-10 border rounded-xl text-white text-xl flex items-center justify-center bg-primary'
                    }
                    onClick={() => {nextPage(true)}}>
                    <FiMenu />
                  </button>
                 
                </div>,
              ),
            ],
          ]}
          columns={[
            'DNI',
            'NOMBRES',
            'CORREO',
            'CELULAR',
            'ACCIONES',
          ]}
          pagination={false}
        /> */}
        <TablePassenger></TablePassenger>
      </div>

     {/*  */}
    </div>
  );
};

export default PassengerPage;