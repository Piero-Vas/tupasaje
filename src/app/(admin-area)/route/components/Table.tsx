'use client';

import {Grid} from 'gridjs-react';
// import "gridjs/dist/theme/mermaid.css";
import Cookies from 'js-cookie';
import {_} from 'gridjs-react';
// @ts-ignore
import {esES} from 'gridjs/l10n';
import {BiTrash} from 'react-icons/bi';
import {HiOutlinePencil} from 'react-icons/hi';
import {useRouter} from 'next/navigation';
import Swal from 'sweetalert2';
import {useAxios} from '@/modules/axios/axios.hook';

export type Route = {
  id_route: number;
  parent_route_id: number | null;
  office_destination: {
    office_name:any;
    city:{
      city_name:string
    }
  };
  office_origin: {
    office_name:any;
    city:{
      city_name:string
    }
  };
  name_route: string;
  distance: string;
  estimated_duration: number;
  travel_time: number;
  wait_time: number;
  status: string;
  id_company: number;
  created_at: string;
  updated_at: string;
  deleted_at: null;
};

const TableRoute: React.FC = () => {
  const [, executeDeleteRoute] = useAxios(
    {
      method: 'DELETE',
    },
    {manual: true},
  );
  const router = useRouter();
  const cooktoken = Cookies.get('token');

  const deleteRoute = async (id: number) => {
    Swal.fire({
      icon: 'info',
      title: '¿Esta seguro que quiere eliminar esta ciudad?',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar',
    }).then(async result => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        try {
          const deleteRouteResponse = await executeDeleteRoute({
            url: `/routes/${id}`,
          });

          Swal.fire('Borrado Correctamente', '', 'success');
        } catch (error: any) {
          // Handle Create error
          console.error('Create failed:', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            timer: 2000,
            text: 'Ocurrió un error al eliminar la ruta',
          });
        }
      }
    });
  };

  return (
    <Grid
      columns={[
        'NOMBRE',
        'ORIGEN',
        'DESTINO',
        'DISTANCIA',
        'PARADAS',
        'DURACIÓN ESTIMADA',
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
        url: `${process.env.API_URL}/routes/list`,
        then: (data: {
          data: {
            routes: Route[];
            total: any;
          };
        }) =>
          data.data.routes.map(
            ({
              id_route,
              name_route,
              office_origin ,
              office_destination,
              distance,
              estimated_duration,
              wait_time,
            }) => [
              `${name_route}`,
              `${office_origin.office_name}`,
              `${office_destination.office_name}`,
              `${distance} KM`,
              wait_time,
              `${estimated_duration}`,
              _(
                <div className="flex justify-center">
                  <button
                    className={
                      'h-10 w-10 border rounded-xl text-white text-xl flex items-center justify-center bg-primary'
                    }
                    onClick={() => {
                      // router.push(`/route/${id_route}`);
                    }}>
                    <HiOutlinePencil />
                  </button>
                  <button
                    className={
                      'h-10 w-10 border rounded-xl text-white text-xl flex items-center justify-center bg-bgred'
                    }
                    onClick={async () => {
                      await deleteRoute(id_route);
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
          // throw Error('oh no :(');
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
      style={{
        // table: {
        //   width: '100%',
        //   'border-raidus': '100px',
        // },
        // th: {
        //   'background-color': '#e8f0fd',
        //   color: ' var(--color-primary--)',
        //   'font-weight': '500',
        //   'font-size': '14px',
        //   'text-align': 'start ',
        //   'border-color': '#BDD7FF',
        // },
        td: {
          // padding: '10px',
          'text-align': 'center',
          // 'border-color': '#BDD7FF',
          // 'font-weight': '400',
          // 'font-size': '12px',
        },
      }}
    />
  );
};

export default TableRoute;
