'use client';

import {useState} from 'react';
import {FaPlus} from 'react-icons/fa';
import {Grid} from 'gridjs-react';
import SearchIcon from '@/assets/svg/search.svg';

const Dashboard: React.FC = () => {
  const [entriesCount, setEntriesCount] = useState<number>(1);

  return (
    <div className="flex flex-col">
      {/** Heading */}
      <div className="flex flex-row justify-between">
        <div className="p-4">
          <h2 className="text-xl font-bold text-primary">
            Administración de empresas
          </h2>
        </div>

        <div className="p-4">
          <button className="btn flex flex-row items-center text-white font-bold text-sm bg-primary hover:bg-secondary rounded-full px-4 py-2">
            <FaPlus className="mr-2" />
            <span>Nueva empresa</span>
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
            ['John', '123456', '123456789', '', '', '', '', '', '', '', ''],
          ]}
          columns={[
            'Nombre',
            'Código',
            'RUC',
            'Línea de Crédito Máximo',
            'Número de Boletos Máximo',
            'Decimales (Descuento)',
            'Línea de Crédito',
            'Número de Boletos Disponibles',
            'Línea de Créditos Usados',
            'Número de Boletos Usados',
            'Acciones',
          ]}
          search={false}
          pagination={false}
        />
      </div>
    </div>
  );
};

export default Dashboard;
