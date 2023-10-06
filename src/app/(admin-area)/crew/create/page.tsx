'use client';

import {useId, useState} from 'react';
import {useRouter} from 'next/navigation';
import ButtonCreate from '@/components/ButtonCreate';
import {cn} from '@/utils/cn';
import {useAxios} from '@/modules/axios/axios.hook';

type CheckOutMenuTabs = 'MASCULINO' | 'FEMENINO';

type PERSONAL_TYPE = 'CONDUCTOR' | 'COPILOTO' | 'TERRAMOZA';

const CreateCrewPage: React.FC = () => {
  const [menuTab, setMenuTab] = useState<CheckOutMenuTabs>('FEMENINO');
  const [personalType, setPersonalType] = useState<PERSONAL_TYPE>('CONDUCTOR');
  const [{loading: createCrewIsLoading}, executeCreateCrew] = useAxios(
    {
      method: 'POST',
      url: '/subusers',
    },
    {manual: true},
  );
  const uniqueId = useId();
  const router = useRouter();

  const backPage = async () => {
    router.push('/crew');
  };

  const handleSwitchTab = () => {
    if (menuTab === 'FEMENINO') {
      setMenuTab('MASCULINO');
    } else {
      setMenuTab('FEMENINO');
    }
  };

  const handleSaveCrew = async () => {
    try {
      // executeCreateCrew
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col">
      {/** Heading */}
      <div className="flex flex-row justify-between">
        <div className="pb-4">
          <h2 className="text-xl font-bold text-primary">Tripulación</h2>
        </div>
      </div>

      {/* Body */}

      <form action="">
        <div className="mb-4">
          <div className="w-96 mb-12 ">
            <label
              htmlFor={`${uniqueId}-personal-type-select`}
              className="block mb-1 font-medium text-sm">
              Tipo de personal
            </label>

            <select
              id={`${uniqueId}-personal-type-select`}
              className="select w-full bg-bginput"
              onChange={({target: {value}}) => {
                setPersonalType(value as PERSONAL_TYPE);
              }}>
              <option value="CONDUCTOR">Conductor</option>
              <option value="COPILOTO">Copiloto</option>
              <option value="TERRAMOZA">Terramoza</option>
            </select>
          </div>

          <div className="grid grid-cols-2 mb-4 gap-8">
            <div>
              <div className="text-primary font-medium mb-8">
                DATOS PERSONALES
              </div>

              <div className="mb-4">
                <label
                  htmlFor={`${uniqueId}-office-select`}
                  className="block mb-1 font-medium text-sm ">
                  Documentos
                </label>
                <div className="flex gap-2">
                  <select
                    id={`${uniqueId}-office-select`}
                    className="select w-full bg-bginput">
                    <option value={1}>DNI</option>
                    <option value={2}>RUC</option>
                  </select>
                  <input
                    type="text"
                    id={`${uniqueId}-name-input`}
                    className="w-full py-3 px-5 rounded-br11 bg-bginput text-sm text-black"
                    placeholder="Ingresar n° de documento"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className=" ">
                  <label
                    htmlFor={`${uniqueId}-name-input`}
                    className="block mb-1 font-medium text-sm ">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id={`${uniqueId}-name-input`}
                    className="w-full py-3 px-5 rounded-br11 bg-bginput text-sm text-black"
                    placeholder="Ingresa el nombre"
                    required
                  />
                </div>
                <div className=" ">
                  <label
                    htmlFor={`${uniqueId}-name-input`}
                    className="block mb-1 font-medium text-sm ">
                    Apellidos
                  </label>
                  <input
                    type="text"
                    id={`${uniqueId}-name-input`}
                    className="w-full py-3 px-5 rounded-br11 bg-bginput text-sm text-black"
                    placeholder="Ingresa el apellido"
                    required
                  />
                </div>
                <div className="  col-start-1 col-span-2">
                  <label
                    htmlFor={`${uniqueId}-name-input`}
                    className="block mb-1 font-medium text-sm ">
                    Sexo
                  </label>
                  <div className="">
                    <div className="tabs tabs-boxed rounded-[14px]">
                      <a
                        className={cn(
                          'tab grow px-8',
                          menuTab === 'MASCULINO' && 'tab-active',
                        )}
                        onClick={handleSwitchTab}>
                        MASCULINO
                      </a>
                      <a
                        className={cn(
                          'tab grow px-8',
                          menuTab === 'FEMENINO' && 'tab-active',
                        )}
                        onClick={handleSwitchTab}>
                        FEMENINO
                      </a>
                    </div>
                  </div>
                </div>
                <div className=" ">
                  <label
                    htmlFor={`${uniqueId}-name-input`}
                    className="block mb-1 font-medium text-sm ">
                    Celular
                  </label>
                  <input
                    type="text"
                    id={`${uniqueId}-name-input`}
                    className="w-full py-3 px-5 rounded-br11 bg-bginput text-sm text-black"
                    placeholder="+51"
                    required
                  />
                </div>
                <div className=" ">
                  <label
                    htmlFor={`${uniqueId}-name-input`}
                    className="block mb-1 font-medium text-sm ">
                    Correo
                  </label>
                  <input
                    type="text"
                    id={`${uniqueId}-name-input`}
                    className="w-full py-3 px-5 rounded-br11 bg-bginput text-sm text-black"
                    placeholder="Ingresa correo electrónico"
                    required
                  />
                </div>
                <div className=" ">
                  <label
                    htmlFor={`${uniqueId}-name-input`}
                    className="block mb-1 font-medium text-sm ">
                    Dirección
                  </label>
                  <input
                    type="text"
                    id={`${uniqueId}-name-input`}
                    className="w-full py-3 px-5 rounded-br11 bg-bginput text-sm text-black"
                    placeholder="Ingresar dirección"
                    required
                  />
                </div>
                <div className=" ">
                  <label
                    htmlFor={`${uniqueId}-name-input`}
                    className="block mb-1 font-medium text-sm ">
                    Ciudad
                  </label>
                  <input
                    type="text"
                    id={`${uniqueId}-name-input`}
                    className="w-full py-3 px-5 rounded-br11 bg-bginput text-sm text-black"
                    placeholder="Ingresar ciudad"
                    required
                  />
                </div>
              </div>
            </div>

            {personalType !== 'TERRAMOZA' ? (
              <div>
                <div className="text-primary font-medium mb-8">
                  DATOS TÉCNICOS
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className=" ">
                    <label
                      htmlFor={`${uniqueId}-name-input`}
                      className="block mb-1 font-medium text-sm ">
                      Comisión
                    </label>
                    <input
                      type="text"
                      id={`${uniqueId}-name-input`}
                      className="w-full py-3 px-5 rounded-br11 bg-bginput text-sm text-black"
                      placeholder="0"
                      required
                    />
                  </div>
                  <div></div>
                  <div className=" ">
                    <label
                      htmlFor={`${uniqueId}-name-input`}
                      className="block mb-1 font-medium text-sm ">
                      Tipo de licencia
                    </label>
                    <input
                      type="text"
                      id={`${uniqueId}-name-input`}
                      className="w-full py-3 px-5 rounded-br11 bg-bginput text-sm text-black"
                      placeholder="Ingresar licencia"
                      required
                    />
                  </div>
                  <div className=" ">
                    <label
                      htmlFor={`${uniqueId}-name-input`}
                      className="block mb-1 font-medium text-sm ">
                      N° de licencia
                    </label>
                    <input
                      type="text"
                      id={`${uniqueId}-name-input`}
                      className="w-full py-3 px-5 rounded-br11 bg-bginput text-sm text-black"
                      placeholder="Ingresar número"
                      required
                    />
                  </div>
                  <div className=" ">
                    <label
                      htmlFor={`${uniqueId}-name-input`}
                      className="block mb-1 font-medium text-sm ">
                      Expiración de licencia
                    </label>
                    <input
                      type="date"
                      id={`${uniqueId}-name-input`}
                      className="w-full py-3 px-5 rounded-br11 bg-bginput text-sm text-black"
                      required
                    />
                  </div>
                  <div></div>
                  <div className=" ">
                    <label
                      htmlFor={`${uniqueId}-name-input`}
                      className="block mb-1 font-medium text-sm ">
                      Último examen médico
                    </label>
                    <input
                      type="date"
                      id={`${uniqueId}-name-input`}
                      className="w-full py-3 px-5 rounded-br11 bg-bginput text-sm text-black"
                      placeholder="Ingresa el nombre"
                      required
                    />
                  </div>
                  <div className=" ">
                    <label
                      htmlFor={`${uniqueId}-name-input`}
                      className="block mb-1 font-medium text-sm ">
                      Proximo examen médico
                    </label>
                    <input
                      type="date"
                      id={`${uniqueId}-name-input`}
                      className="w-full py-3 px-5 rounded-br11 bg-bginput text-sm text-black"
                      placeholder="Ingresa el nombre"
                      required
                    />
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          <hr />

          <div className="flex justify-end">
            <button
              onClick={backPage}
              className="w-32 m-2 btn btn-outline hover:bg-primary hover:border-white text-primary normal-case font-medium rounded-xl">
              Atrás
            </button>
            <button
              className="w-32 m-2 btn btn-info bg-primary hover:bg-secondary text-white rounded-xl border-white normal-case font-medium"
              onClick={handleSaveCrew}>
              Guardar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateCrewPage;
