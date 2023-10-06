'use client';

import {Grid} from 'gridjs-react';
// import "gridjs/dist/theme/mermaid.css";
import Cookies from 'js-cookie';
import {_} from 'gridjs-react';
// @ts-ignore
import {esES} from 'gridjs/l10n';
import {BiTrash} from 'react-icons/bi';
import {useRouter} from 'next/navigation';
import {HiOutlinePencil} from 'react-icons/hi';
import Swal from 'sweetalert2';
import {useAxios} from '@/modules/axios/axios.hook';

const TableOffice: React.FC = () => {
  const [{loading: deleteOfficeIsLoading}, executeDeleteOffice] = useAxios(
    {
      method: 'DELETE',
    },
    {
      manual: true,
    },
  );
  const router = useRouter();
  const cooktoken = Cookies.get('token');

  const deleteOffice = async (id: number) => {
    Swal.fire({
      icon: 'info',
      title: '¿Esta seguro que quiere eliminar esta oficina?',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar',
    }).then(async result => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        try {
          const deleteOfficeResponse = await executeDeleteOffice({
            url: `/office/${id}`,
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
      columns={['NOMBRE', 'DIRECCION', 'TELÉFONO', 'ACCIONES']}
      language={esES}
      width={'auto'}
      server={{
        method: 'GET',
        headers: {
          Authorization: `Bearer ${cooktoken}`,
          'Content-Type': 'application/json',
        },
        url: `${process.env.API_URL}/office/list`,
        then: (data: {
          data: {
            offices: {
              id_office: any;
              office_name: any;
              address: any;
              phone: any;
            }[];
            total: any;
          };
        }) =>
          data.data.offices.map(
            (office: {
              id_office: any;
              office_name: any;
              address: any;
              phone: any;
            }) => [
              office.office_name,
              office.address,
              office.phone,
              // _(<input type="checkbox" className="toggle toggle-success" />),
              _(
                <div className="flex justify-center">
                  <button
                    className={
                      'h-10 w-10 border rounded-xl text-white text-xl flex items-center justify-center bg-primary'
                    }
                    onClick={() => {
                      router.push(`/office/${office.id_office}`);
                    }}>
                    <HiOutlinePencil />
                  </button>
                  <button
                    className={
                      'h-10 w-10 border rounded-xl text-white text-xl flex items-center justify-center bg-bgred'
                    }
                    onClick={async () => {
                      await deleteOffice(office.id_office);
                    }}>
                    <BiTrash />
                  </button>
                </div>,
              ),
            ],
          ),
        handle: (res: any) => {
          // no matching records found
          if (res.status === 404) return {data: []};
          if (res.ok) return res.json();
          throw Error('oh no :(');
        },
      }}
      // pagination= {true}
      search={{}}
      // pagination={{
      //     limit: 10
      // }}
      // className = {{
      //     container: '',
      //     table: 'table-auto shadow my-5  ',
      //     thead: '',
      //     tbody: '',
      //     th: ' text-start text-sm px-3 py-4 text-primary font-medium',
      //     td: '   text-sm px-3 py-4 font-book ',
      //     search : ' ',
      //     header : ''

      // }}
      sort={true}
      footer={false}
      // style={{
      //   table: {
      //     width: '100%',
      //   },
      //   th: {
      //     'background-color': '#e8f0fd',
      //     color: ' var(--color-primary--)',
      //     'font-weight': '500',
      //     'font-size': '14px',
      //     'text-align': 'start ',
      //     'border-color': '#BDD7FF',
      //   },
      //   td: {
      //     padding: '10px',
      //     'text-align': 'start',
      //     'border-color': '#BDD7FF',
      //     'font-weight': '400',
      //     'font-size': '12px',
      //   },
      // }}
    />
  );
};

export default TableOffice;
