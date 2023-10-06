'use client';

import React from 'react';
import { Grid } from 'gridjs-react';
import Cookies from 'js-cookie';
import { _ } from 'gridjs-react';
// @ts-ignore
import { esES } from 'gridjs/l10n';
import { BiTrash } from 'react-icons/bi';
import { HiOutlinePencil } from 'react-icons/hi';
import { FiPower } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { useAxios } from '@/modules/axios/axios.hook';
import { useRouter } from 'next/navigation';


const TablePassenger: React.FC = () => {
  const [{ loading: deleteCityIsLoading }, executeDeleteCity] = useAxios(
    {
      method: 'DELETE',
    },
    {
      manual: true,
    },
  );
  const cooktoken = Cookies.get('token');
  const router = useRouter();
  const nextPage = () => {
    // console.log(bool)
    router.push('/passengers/1');
    // dispatch(changeValidHistory(bool))
  };
  const deleteCity = async (id: number) => {
    Swal.fire({
      icon: 'info',
      title: '¿Esta seguro que quiere eliminar esta ciudad?',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar',
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          const deleteCityResponse = await executeDeleteCity({
            url: `/customers/${id}`,
          });

          Swal.fire('Borrado Correctamente', '', 'success');
        } catch (error: any) {
          // Handle Create error
          console.error('Create failed:', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            timer: 2000,
            text: 'Credenciales incorrectas',
          });
        }
      }
    });
  };

  return (
    <Grid
      columns={['DNI', 'NOMBRE', 'CORREO', 'CELULAR','ACCIONES']}
      language={esES}
      server={{
        method: 'GET',
        headers: {
          Authorization: `Bearer ${cooktoken}`,
          'Content-Type': 'application/json',
        },
        url: `${process.env.API_URL}/customers/list?current_page=1&page_size=20`,
        then: (data: {
          data: {
            customers: { id_customer: any; name: any; last_name: any; phone: any; email:string, identification_number:string }[];
            total: any;
          };
        }) =>
          data.data.customers.map(
            (customers: { id_customer: any; name: any; last_name: any; phone: any; email:string, identification_number:string }) => [
                customers.identification_number,
                _(customers.name + ' '+ customers.last_name ) , 
                customers.email,
                customers.phone,
                _(
                  <div className="flex justify-center">
                    {/* <button
                      className={
                        'h-10 w-10 border rounded-xl text-white text-xl flex items-center justify-center bg-primary'
                      }
                      onClick={() => {
                        
                      }}>
                      <HiOutlinePencil />
                    </button> */}
                    <button
                      className={
                        'h-10 w-10 border rounded-xl text-white text-xl flex items-center justify-center bg-bgred'
                      }
                    //   disabled={deleteCityIsLoading}
                      onClick={async () => {
                        deleteCity(customers.id_customer)
                      }}>
                      <BiTrash />
                    </button>
                    {/* <button
                      className={
                        'h-10 w-10 border rounded-xl text-white text-xl flex items-center justify-center bg-bggris'
                      }
                      onClick={() => alert(city.department)}>
                      <FiPower />
                    </button> */}
                  </div>,
                ),
              ],
          ),
        handle: (res: any) => {
          // no matching records found
          if (res.status === 404) return { data: [] };
          if (res.ok) return res.json();
          throw Error('oh no :(');
        },
      }}
      search={{}}
      resizable={true}
      sort={true}
      footer={false}
    style={{
      td: {
        'text-align': 'center',
      },
    }}
    />
  );
};

export default TablePassenger;
