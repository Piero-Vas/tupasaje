'use client';

import {useId, useState} from 'react';
import TableCity from '@/app/(admin-area)/city/components/Table';
import ButtonCreate from '@/components/ButtonCreate';
import {useRouter} from 'next/navigation';
import {IoCloseOutline} from 'react-icons/io5';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import {useAxios} from '@/modules/axios/axios.hook';

const DEFAULT_CITY_DATA = {city: '', department: '', country: ''};

export type CityType = {
  id_city: number;
  city_name: string;
  department: string;
  country: string;
};

export type EditCityType = {
  id: null | number;
  city: string;
  department: string;
  country: string;
};

const City: React.FC = () => {
  const uniqueId = useId();
  const [newCityData, setNewCityData] = useState(DEFAULT_CITY_DATA);
  const [editCityData, setEditCityData] = useState<EditCityType>({
    ...DEFAULT_CITY_DATA,
    id: null,
  });
  const [{loading: createCityIsLoading}, executeCreateCity] = useAxios(
    {
      method: 'POST',
      url: '/cities',
    },
    {
      manual: true,
    },
  );
  const [{loading: editCityIsLoading}, executeEditCity] = useAxios(
    {
      method: 'PUT',
    },
    {
      manual: true,
    },
  );

  const openEditCityModal = (city: CityType) => {
    setEditCityData({
      id: city.id_city,
      city: city.city_name,
      department: city.department,
      country: city.country,
    });
    // @ts-ignore
    window[`${uniqueId}-edit-city-modal`]?.showModal();
  };

  const closeEditCityModal = () => {
    // @ts-ignore
    window[`${uniqueId}-edit-city-modal`]?.close();
    setEditCityData({
      ...DEFAULT_CITY_DATA,
      id: null,
    });
  };

  const handleCreateNewCitySubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    try {
      await executeCreateCity({
        data: {
          city_name: newCityData.city,
          department: newCityData.department,
          country: newCityData.country,
        },
      });

      setNewCityData(DEFAULT_CITY_DATA);
    } catch (error) {
      console.error('Create failed:', error);
    }
  };

  const handleEditCitySubmit = async () => {
    try {
      const editCityResponse = await executeEditCity({
        url: `/cities/${editCityData.id}`,
        data: {
          city_name: editCityData.city,
          department: editCityData.department,
          country: editCityData.country,
        },
      });

      if (editCityResponse.data) {
        closeEditCityModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex flex-row justify-between">
        <div className="p-4">
          <h2 className="text-xl font-bold text-primary">
            Administración de ciudades
          </h2>
        </div>
        <div className="p-4">
          <ButtonCreate
            className="rounded-xl"
            name="Nueva Ciudad"
            onClick={() => {
              // @ts-ignore
              window[`${uniqueId}-create-city-modal`].showModal();
            }}
          />
        </div>
      </div>
      <div className="w-full overflow-auto">
        <TableCity openEditCityModal={openEditCityModal} />
      </div>

      {/* Modal crear ciudad */}
      <dialog
        id={`${uniqueId}-create-city-modal`}
        className="modal modal-middle">
        <form
          method="dialog"
          className="modal-box"
          onSubmit={handleCreateNewCitySubmit}>
          <div className="flex  relative items-center justify-center">
            <div className="grow h-14 flex justify-center items-center font-medium text-xl">
              Nueva Ciudad
            </div>

            <button
              onClick={event => {
                event.preventDefault();
                // @ts-ignore
                window[`${uniqueId}-create-city-modal`].close();
              }}
              className="btn right-0 absolute btn-circle bg-thcolor text-primary text-3xl">
              <IoCloseOutline className="" />
            </button>
          </div>
          <div className="mb-4">
            <label
              htmlFor={`${uniqueId}-create-city-name`}
              className="block mb-2 font-medium text-sm ">
              Ciudad
            </label>
            <input
              type="text"
              id={`${uniqueId}-create-city-name`}
              value={newCityData.city}
              onChange={({target: {value: city}}) => {
                setNewCityData({
                  ...newCityData,
                  city,
                });
              }}
              className="w-full py-3 px-5 rounded-br11 bg-bginput text-sm "
              required
              placeholder="Nombre de la ciudad"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor={`${uniqueId}-create-city-department`}
              className="block mb-2 font-medium text-sm ">
              Departamento
            </label>
            <input
              type="text"
              id={`${uniqueId}-create-city-department`}
              value={newCityData.department}
              onChange={({target: {value: department}}) => {
                setNewCityData({
                  ...newCityData,
                  department,
                });
              }}
              className="w-full py-3 px-5 rounded-br11 bg-bginput text-sm "
              required
              placeholder="Nombre del departamento"
            />
          </div>
          <div className="mb-12">
            <label
              htmlFor={`${uniqueId}-create-city-country`}
              className="block mb-2 font-medium text-sm ">
              País (Abreviatura Ej: PE)
            </label>
            <input
              type="text"
              id={`${uniqueId}-create-city-country`}
              value={newCityData.country}
              onChange={({target: {value: country}}) => {
                setNewCityData({
                  ...newCityData,
                  country,
                });
              }}
              className="w-full py-3 px-5 rounded-br11 bg-bginput text-sm "
              required
              placeholder="Nombre del país"
            />
          </div>

          <button
            type="submit"
            disabled={createCityIsLoading}
            className="w-full bg-primary text-white font-medium py-2 px-4 rounded-br11 hover:bg-tertiary transition-colors text-base">
            Guardar
          </button>
        </form>
      </dialog>

      {/** Modal Editar ciudad */}
      <dialog id={`${uniqueId}-edit-city-modal`} className="modal modal-middle">
        <form
          method="dialog"
          className="modal-box"
          onSubmit={handleEditCitySubmit}>
          <div className="flex relative items-center justify-center">
            <div className="grow h-14 flex justify-center items-center font-medium text-xl">
              Editar Ciudad
            </div>

            <button
              onClick={event => {
                event.preventDefault();
                // @ts-ignore
                window[`${uniqueId}-edit-city-modal`].close();
              }}
              className="btn right-0 absolute btn-circle bg-thcolor text-primary text-3xl">
              <IoCloseOutline className="" />
            </button>
          </div>

          <div className="mb-4">
            <label
              htmlFor={`${uniqueId}-edit-city-name`}
              className="block mb-2 font-medium text-sm ">
              Ciudad
            </label>
            <input
              type="text"
              id={`${uniqueId}-edit-city-name`}
              value={editCityData.city}
              onChange={({target: {value: city}}) => {
                setEditCityData({
                  ...editCityData,
                  city,
                });
              }}
              className="w-full py-3 px-5 rounded-br11 bg-bginput text-sm "
              required
              placeholder="Nombre de la ciudad"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor={`${uniqueId}-create-city-department`}
              className="block mb-2 font-medium text-sm ">
              Departamento
            </label>
            <input
              type="text"
              id={`${uniqueId}-create-city-department`}
              value={editCityData.department}
              onChange={({target: {value: department}}) => {
                setEditCityData({
                  ...editCityData,
                  department,
                });
              }}
              className="w-full py-3 px-5 rounded-br11 bg-bginput text-sm "
              required
              placeholder="Nombre del departamento"
            />
          </div>
          <div className="mb-12">
            <label
              htmlFor={`${uniqueId}-create-city-country`}
              className="block mb-2 font-medium text-sm ">
              País (Abreviatura Ej: PE)
            </label>
            <input
              type="text"
              id={`${uniqueId}-create-city-country`}
              value={editCityData.country}
              onChange={({target: {value: country}}) => {
                setEditCityData({
                  ...editCityData,
                  country,
                });
              }}
              className="w-full py-3 px-5 rounded-br11 bg-bginput text-sm "
              required
              placeholder="Nombre del país"
            />
          </div>

          <button
            type="submit"
            disabled={editCityIsLoading}
            className="w-full bg-primary text-white font-medium py-2 px-4 rounded-br11 hover:bg-tertiary transition-colors text-base">
            Guardar
          </button>
        </form>
      </dialog>
    </div>
  );
};

export default City;
