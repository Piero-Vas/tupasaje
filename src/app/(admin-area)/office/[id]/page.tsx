'use client';

import {useEffect, useId, useState} from 'react';
import {useRouter} from 'next/navigation';
import {isValidNumber} from '@/utils/string';
import {useAxios} from '@/modules/axios/axios.hook';
import Link from 'next/link';
import Swal from 'sweetalert2';

type Office = {
  id_office: number;
  id_company: number;
  id_city: number;
  office_name: string;
  address: string;
  phone: string;
  id_terminal: number | null;
  latitude: number;
  longitude: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  // city: {
  //   city_name: string;
  // };
};

type OfficeResponse = {
  office: Office;
};

const DEFAULT_OFFICE_DATA = {
  office_name: '',
  address: '',
  phone: '',
  latitude: 8.1,
  longitude: 8.1,
  id_city: 1,
  id_office: 0,
  id_company: 0,
  id_terminal: null,
  created_at: '',
  updated_at: '',
  deleted_at: null,
  city: {
    city_name: '',
  },
};

const OfficePage: React.FC<{params: {id: string}}> = ({params}) => {
  const id = params.id;
  const uniqueId = useId();
  const router = useRouter();
  const [{loading: officeIsLoading, data: officeResponse}] =
    useAxios<OfficeResponse>(`/office/detail/${id}`, {useCache: false});
  const [{loading: updateOfficeIsLoading}, executeEditOffice] = useAxios(
    {
      method: 'PUT',
      url: `/office/${id}`,
    },
    {manual: true},
  );
  const [office, setOffice] = useState<Office | null>(
    officeResponse?.office || DEFAULT_OFFICE_DATA,
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const editedOfficeResponse = await executeEditOffice({
        data: {
          id_company: 1,
          office_name: office?.office_name,
          address: office?.address,
          phone: office?.phone,
          latitude: office?.latitude ?? 8.1000001,
          longitude: office?.longitude ?? 8.200001,
          id_city: 1,
        },
      });

      Swal.fire('Oficina editada correctamente', '', 'success').then(() => {
        router.push('/office');
      });
    } catch (error) {
      console.error('Update failed', error);
    }
  };

  useEffect(() => {
    const isValidId = isValidNumber(id);

    if (!isValidId) {
      router.replace('/office');
      return;
    }
  }, [router, id]);

  useEffect(() => {
    if (officeIsLoading) {
      return;
    }

    if (!officeResponse?.office) {
      router.replace('/office');
      return;
    }

    setOffice(officeResponse.office);
  }, [officeResponse, officeIsLoading, router]);

  return (
    <div className="flex flex-col">
      {/** Heading */}
      <div className="flex flex-row justify-between">
        <div className="">
          <h2 className="text-xl text-primary">
            Editar <span className="font-bold">{office?.office_name}</span>
          </h2>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex mt-8 gap-4">
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
                      value={office?.office_name}
                      onChange={({target: {value: office_name}}) => {
                        setOffice({
                          ...office!,
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
                      value={office?.phone}
                      onChange={({target: {value: phone}}) => {
                        setOffice({
                          ...office!,
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
                      value={office?.address}
                      onChange={({target: {value: address}}) => {
                        setOffice({
                          ...office!,
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
              disabled={updateOfficeIsLoading}>
              {updateOfficeIsLoading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                'Actualizar'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default OfficePage;
