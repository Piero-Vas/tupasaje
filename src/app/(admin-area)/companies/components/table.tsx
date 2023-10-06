'use client';

import {Grid} from 'gridjs-react';
// import "gridjs/dist/theme/mermaid.css";
import Cookies from 'js-cookie';
import {_} from 'gridjs-react';
// @ts-ignore
import {esES} from 'gridjs/l10n';
import {BiTrash} from 'react-icons/bi';
import {HiOutlinePencil} from 'react-icons/hi';
import {FiPower} from 'react-icons/fi';
import Swal from 'sweetalert2';
import {useAxios} from '@/modules/axios/axios.hook';

const TableCompanies: React.FC = () => {
  const [{loading: deleteCompanyIsLoading}, executeDeleteCompany] = useAxios(
    {
      method: 'DELETE',
    },
    {
      manual: true,
    },
  );
  let cooktoken = Cookies.get('token');

  const deleteCompany = async (id: number) => {
    Swal.fire({
      icon: 'info',
      title: '¿Esta seguro que quiere eliminar esta empresa?',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar',
    }).then(async result => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        try {
          const deleteCompanyResponse = await executeDeleteCompany({
            url: `/companies/${id}`,
          });

          Swal.fire('Borrado Correctamente', '', 'success');
        } catch (error: any) {
          // Handle Create error
          console.error('Create failed:', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            timer: 2000,
            text: 'Error al borrar compañia',
          });
        }
      }
    });
  };

  return (
    <Grid
      columns={[
        'NOMBRE',
        'CODIGO',
        'RUC',
        // 'LÍNEA DE CRÉDITO MÁXIMO',
        'NÚMERO RESPONSABLE',
        'NOMBRE RESPONSABLE',
        // 'NÚMERO DE BOLETOS MÁXIMOS',
        // 'DECIMALES (DESCUENTO)',
        // 'LÍNEA DE CRÉDITO',
        // 'NÚMERO DE BOLESTOS DISPONIBLES',
        // 'LÍNEA DE CRÉDITO USADOS',
        // 'NÚMERO DE BOLETOS USADOS',
        'ACCIONES',
      ]}
      language={esES}
      width={'auto'}
      server={{
        method: 'GET',
        headers: {
          Authorization: `Bearer ${cooktoken}`,
          'Content-Type': 'application/json',
        },
        url: `${process.env.API_URL}/companies/list/`,
        then: (data: {
          data: {
            companies: {
              id_company: any;
              company_name: any;
              tax_id: any;
              phone: any;
              responsible_name: any;
            }[];
            total: any;
          };
        }) =>
          data.data.companies.map(
            (company: {
              id_company: any;
              company_name: any;
              tax_id: any;
              phone: any;
              responsible_name: any;
            }) => [
              company.company_name,
              company.id_company,
              company.tax_id,
              company.phone,
              company.responsible_name,
              // 'Sin crédito',
              // '-',
              // '-',
              // '-',
              // '-',
              _(
                <div className="flex">
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
                      await deleteCompany(company.id_company);
                    }}>
                    <BiTrash />
                  </button>
                  <button
                    className={
                      'h-10 w-10 border rounded-xl text-white text-xl flex items-center justify-center bg-bggris'
                    }>
                    <FiPower />
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
      resizable={true}
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
      style={false}
    />
  );
};

export default TableCompanies;
