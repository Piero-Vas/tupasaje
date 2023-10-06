'use client';

import {useId, useState} from 'react';
import {useRouter} from 'next/navigation';
import {useAxios} from '@/modules/axios/axios.hook';
import Link from 'next/link';
import Swal from 'sweetalert2';

const DEFAULT_OFFICE_DATA = {
  office_name: '',
  address: '',
  phone: '',
  latitude: 8.1,
  longitude: 8.1,
  id_city: 1,
};

const CreateOfficePage: React.FC = () => {
  const uniqueId = useId();
  const router = useRouter();
  const [newOfficeData, setnewOfficeData] = useState(DEFAULT_OFFICE_DATA);
  const [{loading: createCityIsLoading}, executeCreateOffice] = useAxios(
    {
      method: 'POST',
      url: '/office',
    },
    {
      manual: true,
    },
  );
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const createdOfficeResponse = await executeCreateOffice({
        data: {
          id_company: 1,
          office_name: newOfficeData.office_name,
          address: newOfficeData.address,
          phone: newOfficeData.phone,
          latitude: newOfficeData.latitude,
          longitude: newOfficeData.longitude,
          id_city: 1,
        },
      });

      setnewOfficeData(DEFAULT_OFFICE_DATA);

      Swal.fire('Oficina creada correctamente', '', 'success').then(() => {
        router.push('/office');
      });
    } catch (error) {
      console.error('Create failed:', error);
    }
  };
  return (
    <div className="flex flex-col">
      {/** Heading */}
      <div className="flex flex-row justify-between">
        <div className="">
          <h2 className="text-xl font-bold text-primary">Nueva oficina</h2>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex mt-8 gap-4">
          {/** info */}
          {/* <div className="">
          <ul className="steps steps-vertical">
            <li className="step step-primary text-textStepsChecked font-medium">
              Datos generales
            </li>
            <li className="step text-textStepsMuted">Ubicar en el mapa</li>
          </ul>
        </div> */}

          <div className="flex flex-1">
            <div className="bg-white shadow rounded-[25px] border-[0.5px] border-borderPane flex flex-1 px-6 py-8 ">
              <div className="flex flex-grow flex-col">
                <h3 className="font-medium text-sm text-textMuted uppercase">
                  Detalles
                </h3>

                <div className="mt-6">
                  <div className="mb-4">
                    <label
                      htmlFor={`${uniqueId}-office-name-input`}
                      className="block mb-1 font-medium text-sm text-textMuted">
                      Nombre de la oficina
                    </label>

                    <input
                      type="text"
                      id={`${uniqueId}-office-name-input`}
                      className="input w-full py-3 px-5 rounded-br11 bg-bgCommonInput text-sm text-black"
                      placeholder="Agencia de encomiendas"
                      value={newOfficeData.office_name}
                      onChange={({target: {value: office_name}}) => {
                        setnewOfficeData({
                          ...newOfficeData,
                          office_name,
                        });
                      }}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor={`${uniqueId}-phone-number-input`}
                      className="block mb-1 font-medium text-sm text-textMuted">
                      Celular
                    </label>

                    <input
                      type="text"
                      id={`${uniqueId}-phone-number-input`}
                      className="input w-full py-3 px-5 rounded-br11 bg-bgCommonInput text-sm text-black"
                      placeholder="+51"
                      value={newOfficeData.phone}
                      onChange={({target: {value: phone}}) => {
                        setnewOfficeData({
                          ...newOfficeData,
                          phone,
                        });
                      }}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor={`${uniqueId}-address-input`}
                      className="block mb-1 font-medium text-sm text-textMuted">
                      Dirección
                    </label>

                    <input
                      type="text"
                      id={`${uniqueId}-address-input`}
                      className="input w-full py-3 px-5 rounded-br11 bg-bgCommonInput text-sm text-black"
                      placeholder="Av. Manuel Echeandia"
                      value={newOfficeData.address}
                      onChange={({target: {value: address}}) => {
                        setnewOfficeData({
                          ...newOfficeData,
                          address,
                        });
                      }}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="divider divider-horizontal"></div>

              <div className="flex flex-grow flex-col">
                <h3 className="font-medium text-sm text-textMuted uppercase">
                  Localización
                </h3>

                <div className="mt-6">
                  <div className="mb-4">
                    <label
                      htmlFor={`${uniqueId}-departament-input`}
                      className="block mb-1 font-medium text-sm text-textMuted">
                      Departamento
                    </label>

                    <select
                      id={`${uniqueId}-departament-input`}
                      className="select w-full bg-bgCommonInput rounded-xl">
                      <option value="LIMA">Lima</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor={`${uniqueId}-provincia-input`}
                      className="block mb-1 font-medium text-sm text-textMuted">
                      Provincia
                    </label>

                    <select
                      id={`${uniqueId}-provincia-input`}
                      className="select w-full bg-bgCommonInput rounded-xl">
                      <option value="LIMA">Lima</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor={`${uniqueId}-distrito-input`}
                      className="block mb-1 font-medium text-sm text-textMuted">
                      Distrito
                    </label>

                    <select
                      id={`${uniqueId}-distrito-input`}
                      className="select w-full bg-bgCommonInput rounded-xl">
                      <option value="LaVictoria">La Victoria</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="divider"></div>

        <div className="flex justify-between">
          <div></div>

          <div className="flex gap-4">
            <Link
              className="btn rounded-[14px] border border-textStepsChecked bg-transparent text-primary hover:bg-primary hover:text-white"
              href="/office">
              Cancelar
            </Link>

            <button
              type="submit"
              className="btn rounded-[14px] bg-primary text-white hover:bg-secondary"
              disabled={createCityIsLoading}>
              {createCityIsLoading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                'Guardar'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateOfficePage;
