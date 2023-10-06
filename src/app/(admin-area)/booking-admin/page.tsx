'use client';

import {FaPlus} from 'react-icons/fa';
import {Grid} from 'gridjs-react';
import SearchIcon from '@/assets/svg/search.svg';
import {useRouter} from 'next/navigation';

const BookingManagement: React.FC = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col">
      {/** Heading */}
      <div className="flex flex-row justify-between">
        <div className="p-4">
          <h2 className="text-xl font-bold text-primary">
            Administración de reservas
          </h2>
        </div>

        <div className="p-4">
          <button
            onClick={() => {
              router.push('/booking-admin/payment');
            }}
            className="btn flex flex-row items-center text-white font-bold text-sm bg-primary hover:bg-secondary rounded-full px-4 py-2">
            <FaPlus className="mr-2" />
            <span>Nuevo reserva</span>
          </button>
        </div>
      </div>

      {/** Select and search input */}
      <div className="flex flex-row justify-between items-center mt-8">
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
        <div className="p-4">
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
      </div>

      {/** Table */}
      <div className="w-full overflow-auto">
        <Grid
          style={{width: '100%'}}
          data={[
            [
              '00256348',
              'Lopez santos, Martín',
              '04/07/2023 · 9:45 am',
              '04/07/2023 · 9:45 am',
              'Activo',
              '',
            ],
            [
              '00256356',
              'Torres Alayo, Miguel',
              '04/07/2023 · 9:45 am',
              '04/07/2023 · 9:45 am',
              'Activo',
              '',
            ],
            [
              '00256345',
              'Tamay Garrido, Pamela',
              '04/07/2023 · 9:45 am',
              '04/07/2023 · 9:45 am',
              'Emitido',
              '',
            ],
            [
              '00256379',
              'Sánchez burgos, Diego',
              '04/07/2023 · 9:45 am',
              '04/07/2023 · 9:45 am',
              'Bencido',
              '',
            ],
            [
              '00256326',
              'Arana rodriguez, luciana ',
              '04/07/2023 · 9:45 am',
              '04/07/2023 · 9:45 am',
              'Congelado',
              '',
            ],
          ]}
          columns={[
            'Código de reserva',
            'Nombres',
            'Hora de Salida',
            'Vencimiento',
            'Estado',
            'Acciones',
          ]}
          search={false}
          pagination={false}
        />
      </div>

      <div className="flex mt-8 justify-between flex-row">
        <div></div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Celdas adicionales</span>
            <input type="checkbox" className="toggle ml-4" />
          </label>
        </div>
      </div>
    </div>
  );
};

export default BookingManagement;
