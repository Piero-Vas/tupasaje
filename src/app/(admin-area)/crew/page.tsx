'use client';

import {FaPlus} from 'react-icons/fa';
import {Grid} from 'gridjs-react';
import {_} from 'gridjs-react';
import {useRouter} from 'next/navigation';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {changeValidHistory} from '@/redux/features/historySlice';
import Link from 'next/link';
import TableCrew from './TableCrew';

const CrewPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const nextPage = (bool: boolean) => {
    // console.log(bool)
    // router.push('/ticket-history/1');
    // dispatch(changeValidHistory(bool))
  };

  const totalSteats = useAppSelector((state: any) => state.validHistory.value);

  return (
    <div className="flex flex-col">
      {/** Heading */}
      <div className="flex flex-row justify-between">
        <div className="p-4">
          <h2 className="text-xl font-bold text-primary">Tripulación</h2>
        </div>
        <div className="p-4">
          <Link
            href="/crew/create"
            className="btn flex flex-row items-center text-white font-bold text-sm bg-primary rounded-full px-4 py-2 hover:bg-secondary">
            <FaPlus className="mr-2" /> Nuevo tripulante
          </Link>
        </div>
      </div>

      {/** Select and search input */}
      <div className="flex flex-row justify-between items-center">
        <div className="p-4">
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
      </div>

      {/** Table */}
      <div className="w-full overflow-auto">
        <TableCrew />
      </div>
    </div>
  );
};

export default CrewPage;
