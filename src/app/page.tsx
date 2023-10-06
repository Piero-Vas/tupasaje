'use client';

import {useId} from 'react';
import {useRouter} from 'next/navigation';
import {useBoolean} from '@/global-hooks/useBoolean';
import {useLoginForm} from '@/forms/login.form';
import Link from 'next/link';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import VisibilityOnEye from '@/assets/svg/visibility.svg';
import VisibilityOffEye from '@/assets/svg/visibility_off.svg';
import {useAxios} from '@/modules/axios/axios.hook';
import {AuthLayout} from '@/layouts/AuthLayout';
import {HOUR_TOKEN, NODE_ENV} from '@/config/env';

export default function LoginPage() {
  const uniqueId = useId();
  const {value: isPasswordVisible, toggle: togglePasswordVisibility} =
    useBoolean(false);
  const {handleSubmit, register, formState} = useLoginForm();
  const [{loading: loginIsLoading}, executeLogin] = useAxios(
    {method: 'POST', url: '/auth/login'},
    {manual: true},
  );
  const router = useRouter();
  const onSubmit = handleSubmit(async ({password, username}) => {
    try {
      const response = await executeLogin({
        data: {username, password},
      });

      const access_token = response.data.access_token as string;

      const expirationDate = new Date();

      expirationDate.setTime(
        expirationDate.getTime() + Number(HOUR_TOKEN) * 60 * 60 * 1000,
      ); // Agregar una hora en milisegundos

      Cookies.set('token', access_token, {
        expires: expirationDate,
        httpOnly: NODE_ENV === 'production',
        secure: NODE_ENV === 'production',
        path: '/',
        sameSite: 'strict',
      });

      router.push('/checkout');
    } catch (error) {
      // Handle login error
      console.error('Login failed:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        timer: 2000,
        text: 'Credenciales incorrectas',
      });
    }
  });

  return (
    <AuthLayout>
      <form onSubmit={onSubmit} className="mt-20">
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

        <div className="my-4">
          <label
            htmlFor={`${uniqueId}-password`}
            className="block mb-1 font-book text-sm">
            Contraseña
          </label>

          <div className="relative">
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              id={`${uniqueId}-password`}
              className="w-full py-3 px-5 rounded-br18 bg-bginput text-sm text-black"
              placeholder="Ingresa tu contraseña"
              required
              {...register('password')}
            />

            <div className="absolute right-0 top-0">
              <button
                type="button"
                className="inline-flex cursor-pointer items-center justify-center h-11 px-4"
                onClick={togglePasswordVisibility}>
                {isPasswordVisible ? (
                  <VisibilityOffEye className="h-5" />
                ) : (
                  <VisibilityOnEye className="h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <Link href="/forgot-password" className="block font-bold text-sm">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <button
          className="btn bg-primary hover:bg-tertiary text-white w-full font-bold py-2 px-4 rounded-br18 transition-colors text-base"
          type="submit"
          disabled={loginIsLoading}>
          {loginIsLoading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            'Ingresar'
          )}
        </button>
      </form>
    </AuthLayout>
  );
}
