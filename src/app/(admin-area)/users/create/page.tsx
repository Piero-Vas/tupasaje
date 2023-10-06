'use client';

import {useId, useState} from 'react';
import Link from 'next/link';
import {cn} from '@/utils/cn';
import {FaPlus} from 'react-icons/fa6';
import {EditIcon} from './components/EditIcon';

type PersonGender = 'MASCULINO' | 'FEMENINO';

const CreateUserPage: React.FC = () => {
  const [gender, setGender] = useState<PersonGender>('FEMENINO');
  const uniqueId = useId();

  const handleSwitchGender = () => {
    if (gender === 'FEMENINO') {
      setGender('MASCULINO');
    } else {
      setGender('FEMENINO');
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex">
        <div className="flex flex-col flex-1">
          <h4 className="font-medium text-sm text-textStepsChecked uppercase">
            Datos Personales
          </h4>

          <div className="flex mt-4 gap-4 flex-col">
            <div className="flex items-center justify-center flex-1">
              <div className="avatar relative">
                <div className="w-32 rounded-full">
                  <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>

                <div className="absolute bottom-0 right-0">
                  <button className="rounded-xl p-2 text-white bg-bgblack">
                    <EditIcon />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block mb-2 text-textMuted font-medium text-sm">
                  Nombres
                </label>
                <input
                  type="text"
                  className="input w-full py-3 px-5 rounded-xl bg-bgCommonInput text-sm text-black"
                  placeholder="Ingresa nombres"
                  required
                />
              </div>

              <div className="flex-1">
                <label className="block mb-2 text-textMuted font-medium text-sm">
                  Apellidos
                </label>
                <input
                  type="text"
                  className="input w-full py-3 px-5 rounded-xl bg-bgCommonInput text-sm text-black"
                  placeholder="Ingresa apellidos"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="block text-textMuted font-medium text-sm">
                Sexo
              </label>

              <div className="tabs tabs-boxed rounded-[14px]">
                <a
                  className={cn(
                    'tab grow px-8',
                    gender === 'MASCULINO' && 'tab-active',
                  )}
                  onClick={handleSwitchGender}>
                  Masculino
                </a>
                <a
                  className={cn(
                    'tab grow px-8',
                    gender === 'FEMENINO' && 'tab-active',
                  )}
                  onClick={handleSwitchGender}>
                  Femenino
                </a>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="block mb-2 text-textMuted font-medium text-sm">
                Dirección
              </label>
              <input
                type="text"
                className="input w-full py-3 px-5 rounded-xl bg-bgCommonInput text-sm text-black"
                placeholder="Ingresa dirección"
                required
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block mb-2 text-textMuted font-medium text-sm">
                  País
                </label>
                <input
                  type="text"
                  className="input w-full py-3 px-5 rounded-xl bg-bgCommonInput text-sm text-black"
                  placeholder="Ingresa país"
                  required
                />
              </div>

              <div className="flex-1">
                <label className="block mb-2 text-textMuted font-medium text-sm">
                  Ciudad
                </label>
                <input
                  type="text"
                  className="input w-full py-3 px-5 rounded-xl bg-bgCommonInput text-sm text-black"
                  placeholder="Ingresa ciudad"
                  required
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block mb-2 text-textMuted font-medium text-sm">
                  Código Postal
                </label>
                <input
                  type="text"
                  className="input w-full py-3 px-5 rounded-xl bg-bgCommonInput text-sm text-black"
                  placeholder="Ingresa país"
                  required
                />
              </div>

              <div className="flex-1">
                <label className="block mb-2 text-textMuted font-medium text-sm">
                  Celular
                </label>
                <input
                  type="text"
                  className="input w-full py-3 px-5 rounded-xl bg-bgCommonInput text-sm text-black"
                  placeholder="Ingresa ciudad"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="block mb-2 text-textMuted font-medium text-sm">
                Correo electrónico
              </label>
              <input
                type="text"
                className="input w-full py-3 px-5 rounded-xl bg-bgCommonInput text-sm text-black"
                placeholder="Ingresa correo electrónico"
                required
              />
            </div>
          </div>
        </div>

        <div className="divider divider-horizontal"></div>

        <div className="flex flex-col flex-1">
          <h4 className="font-medium text-sm text-textStepsChecked uppercase">
            Datos de usuario
          </h4>

          <div className="flex mt-4 gap-4 flex-col">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block mb-2 text-textMuted font-medium text-sm">
                  Nombre de Usuario
                </label>
                <input
                  type="text"
                  className="input w-full py-3 px-5 rounded-xl bg-bgCommonInput text-sm text-black"
                  placeholder="Ingresa nombre de usuario"
                  required
                />
              </div>

              <div className="flex-1">
                <label className="block mb-2 text-textMuted font-medium text-sm">
                  Cargo
                </label>
                <input
                  type="text"
                  className="input w-full py-3 px-5 rounded-xl bg-bgCommonInput text-sm text-black"
                  placeholder="Ingresa cargo"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="block mb-2 text-textMuted font-medium text-sm">
                Oficina
              </label>
              <input
                type="text"
                className="input w-full py-3 px-5 rounded-xl bg-bgCommonInput text-sm text-black"
                placeholder="Ingresa oficina"
                required
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block mb-2 text-textMuted font-medium text-sm">
                  Contraseña
                </label>
                <input
                  type="text"
                  className="input w-full py-3 px-5 rounded-xl bg-bgCommonInput text-sm text-black"
                  placeholder="Ingresa nombre de usuario"
                  required
                />
              </div>

              <div className="flex-1">
                <label className="block mb-2 text-textMuted font-medium text-sm">
                  Repetir contraseña
                </label>
                <input
                  type="text"
                  className="input w-full py-3 px-5 rounded-xl bg-bgCommonInput text-sm text-black"
                  placeholder="Ingresa cargo"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="form-control border-textGreen border bg-textGreen/5 rounded-2xl px-4 py-2">
                <label className="cursor-pointer label">
                  <span className="label-text text-textMuted font-medium text-sm">
                    Puede reservar ventas
                  </span>
                  <input type="checkbox" className="toggle toggle-accent" />
                </label>
              </div>

              <div className="form-control border-textGreen border bg-textGreen/5 rounded-2xl px-4 py-2">
                <label className="cursor-pointer label">
                  <span className="label-text text-textMuted font-medium text-sm">
                    Puede imprimir boletos en venta express
                  </span>
                  <input type="checkbox" className="toggle toggle-accent" />
                </label>
              </div>

              <div className="form-control border-textGreen border bg-textGreen/5 rounded-2xl px-4 py-2">
                <label className="cursor-pointer label">
                  <span className="label-text text-textMuted font-medium text-sm">
                    Crear conductor automático
                  </span>
                  <input type="checkbox" className="toggle toggle-accent" />
                </label>
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
            href="/users"
            className="btn rounded-[14px] border border-textStepsChecked bg-transparent text-primary hover:bg-primary hover:text-white">
            Cancelar
          </Link>

          <button className="btn rounded-[14px] bg-primary text-white hover:bg-secondary">
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateUserPage;
