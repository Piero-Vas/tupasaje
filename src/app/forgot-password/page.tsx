'use client';

import {useId} from 'react';
import {AuthLayout} from '@/layouts/AuthLayout';
import {useForgotPasswordForm} from '@/forms/forgot-password.form';
import {useBoolean} from '@/global-hooks/useBoolean';
import {useRouter} from 'next/navigation';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const uniqueId = useId();
  const {value: isPasswordVisible, toggle: togglePasswordVisibility} =
    useBoolean(false);
  const {value: isLoading, setValue: setIsLoading} = useBoolean(false);
  const {handleSubmit, register} = useForgotPasswordForm();
  const router = useRouter();

  const onSubmit = handleSubmit(async ({username}) => {});

  return (
    <AuthLayout>
      <h1 className="mt-10 text-2xl font-bold">Recuperar Contraseña</h1>
      <p className="mb-10">
        Ingresa tu nombre de usuario para recuperar tu contraseña
      </p>

      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label
            htmlFor={`${uniqueId}-username`}
            className="block mb-1 font-book text-sm ">
            Usuario
          </label>
          <input
            type="text"
            id={`${uniqueId}-username`}
            className="w-full py-3 px-5 rounded-br18 bg-bginput text-sm text-black"
            placeholder="Ingresa tu nombre de usuario"
            required
            {...register('username')}
          />
        </div>

        <button
          className="btn bg-primary hover:bg-tertiary text-white w-full font-bold py-2 px-4 rounded-br18 transition-colors text-base"
          type="submit"
          disabled={isLoading}>
          {isLoading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            'Recuperar Contraseña'
          )}
        </button>

        <div className="mt-4">
          <Link href="/" className="block font-bold text-sm">
            Iniciar sesión
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
