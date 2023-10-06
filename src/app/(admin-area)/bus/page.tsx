'use client';

import SearchIcon from '@/assets/svg/search.svg';
import TableCustom from '@/components/Table';
import {_} from 'gridjs-react';
import {BiTrash} from 'react-icons/bi';
import {HiOutlinePencil} from 'react-icons/hi';
import ButtonCreate from '@/components/ButtonCreate';
import {useBusForm} from '@/forms/bus.form';
import AddImage from '@/assets/svg/addimage.svg';
import {useAxios} from '@/modules/axios/axios.hook';
import {NODE_ENV} from '@/config/env';
import {useRouter} from 'next/navigation';
import Swal from 'sweetalert2';
import {cn} from '@/utils/cn';
import {EditPhotoIcon} from '@/components/icon/EditPhotoIcon';
import {DeletePhotoIcon} from '@/components/icon/DeletePhotoIcon';
import Link from 'next/link';
import {FaPlus} from 'react-icons/fa6';

const Bus: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/** Heading */}
      <div className="flex flex-row justify-between">
        <div className="p-4">
          <h2 className="text-xl font-bold text-primary">
            Administración de buses
          </h2>
        </div>

        <div className="p-4">
          <Link
            href="/bus/create/first-step"
            className="btn flex flex-row items-center text-white font-bold text-sm bg-primary rounded-full px-4 py-2 hover:bg-secondary">
            <FaPlus className="mr-2" />
            Nuevo bus
          </Link>
        </div>
      </div>

      {/** Select and search input */}
      <div className="flex flex-row justify-between items-center mt-8">
        <div className="p-4">
          <div className="flex items-center">
            Mostrar
            <select className="select max-w-xs mx-4">
              <option value="1">1</option>
              <option value="1">2</option>
              <option value="1">3</option>
              <option value="1">4</option>
              <option value="1">5</option>
            </select>
            entradas
          </div>
        </div>
        <div className="p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar"
              className="input input-bordered  ml-4 pr-10"
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
        <TableCustom
          columns={['NOMBRE', 'MODELO', 'PLACA', 'ASIENTOS', 'ACCIONES']}
          method={'GET'}
          data={(data: {
            data: {
              buses: {
                id_bus: any;
                name: any;
                model: String;
                license_plate: String;
              }[];
              total: any;
            };
          }) =>
            data.data.buses.map(
              (bus: {
                id_bus: any;
                name: any;
                model: String;
                license_plate: String;
              }) => [
                bus.name,
                bus.model,
                bus.license_plate,
                // _(<input type="checkbox" className="toggle toggle-success" />),
                // _(<input type="checkbox" className="toggle toggle-success" />),
                '-',
                _(
                  <div className="flex justify-center">
                    <button
                      className={
                        'h-10 w-10 border rounded-xl text-white text-xl flex items-center justify-center bg-primary'
                      }
                      onClick={() => {}}>
                      <HiOutlinePencil />
                    </button>
                    <button
                      className={
                        'h-10 w-10 border rounded-xl text-white text-xl flex items-center justify-center bg-bgred'
                      }
                      onClick={async () => {
                        // await deleteCity(city.id_city);
                      }}>
                      <BiTrash />
                    </button>
                  </div>,
                ),
              ],
            )
          }
          link={`${process.env.API_URL}/buses/list`}
        />
      </div>
    </div>
  );
};

export default Bus;
