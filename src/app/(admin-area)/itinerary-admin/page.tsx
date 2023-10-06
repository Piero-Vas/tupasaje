'use client';

import {FaPlus} from 'react-icons/fa';
import {Grid} from 'gridjs-react';
import Link from 'next/link';
import SearchIcon from '@/assets/svg/search.svg';
import {useRouter} from 'next/navigation';
import {CalendarIcon} from '../ticket-history/components/CalendarIcon';
import {ScheduleItineraryIcon} from './components/ScheduleItineraryIcon';
import TableItinerariesList from './components/Table';

const ItineraryAdminPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col">
      {/** Heading */}
      <div className="flex flex-row justify-between">
        <div className="">
          <h2 className="text-xl font-bold text-primary">
            Administración de itinerarios
          </h2>
        </div>

        <div className="flex gap-2 items-center">
          <button className="btn flex flex-row items-center text-white font-bold text-sm bg-primary hover:bg-secondary rounded-full px-4 py-2">
            <ScheduleItineraryIcon className="mr-1" />
            <span>Programar itinerario</span>
          </button>

          <Link
            href="/itinerary-admin/create/first-step"
            className="btn flex flex-row items-center text-white font-bold text-sm bg-primary hover:bg-secondary rounded-full px-4 py-2">
            <FaPlus className="mr-1" />
            <span>Nuevo itinerario</span>
          </Link>
        </div>
      </div>

      {/** Select and search input */}
      {/* <div className="flex flex-row justify-between items-center mt-8">
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
      {/* <div className="w-full overflow-auto">
        <Grid
          style={{width: '100%'}}
          data={[
            [
              'huancayo - lima 1',
              '04/07/2023 · 9:45 am',
              'evitamiento, huancayo',
              'lima, lima',
              'S/. 70.0',
              '',
            ],
            [
              'huancayo - lima 2',
              '05/07/2023 · 11:45 am',
              'evitamiento, huancayo',
              'lima, lima',
              'S/. 150.0',
              '',
            ],
            [
              'huancayo - lima 3',
              '06/07/2023 · 1:45 pm',
              'evitamiento, huancayo',
              'lima, lima',
              'S/. 200.0',
              '',
            ],
            [
              'huancayo - lima 4',
              '06/07/2023 · 4:45 pm',
              'evitamiento, huancayo',
              'lima, lima',
              'S/. 200.0',
              '',
            ],
            [
              'huancayo - lima 5',
              '08/07/2023 · 7:45 am',
              'evitamiento, huancayo',
              'lima, lima',
              'S/. 150.0',
              '',
            ],
          ]}
          columns={['Ruta', 'Fecha', 'Origen', 'Destino', 'Precio', 'Acciones']}
          search={false}
          pagination={false}
        />
      </div> */}
      <div className="w-full overflow-auto mt-8">
        <TableItinerariesList />
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

export default ItineraryAdminPage;
