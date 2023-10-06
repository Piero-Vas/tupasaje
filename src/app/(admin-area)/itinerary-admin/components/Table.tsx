'use client';

import React from 'react';
import {Grid} from 'gridjs-react';
import Cookies from 'js-cookie';
import {_} from 'gridjs-react';
// @ts-ignore
import {esES} from 'gridjs/l10n';
import {BiTrash} from 'react-icons/bi';
import {HiOutlinePencil} from 'react-icons/hi';
import {FiPower} from 'react-icons/fi';
import Swal from 'sweetalert2';
import {useAxios} from '@/modules/axios/axios.hook';
// import {CityType} from '../page';

// interface Props {
//   openEditCityModal: () => void;
// }

const TableItinerariesList: React.FC = () => {
  const [{loading: deleteCityIsLoading}, executeDeleteCity] = useAxios(
    {
      method: 'DELETE',
    },
    {
      manual: true,
    },
  );
  const cooktoken = Cookies.get('token');

  // const editCity = (city: CityType) => {
  //   openEditCityModal(city);
  // };

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
            url: `/cities/${id}`,
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
      columns={['NOMBRE', 'FECHA  ', 'RUTA', 'PRECIO','ACCIONES']}
      language={esES}
      server={{
        method: 'GET',
        headers: {
          Authorization: `Bearer ${cooktoken}`,
          'Content-Type': 'application/json',
        },
        url: `${process.env.API_URL}/itineraries/list`,
        then: (data: {
          data: {
            itineraries: {id_itinerary: any; name_itinerary: any; valid_since: any , first_floor_price: any , route: { name_route: any}}[];
            total: any;
          };
        }) =>
          data.data.itineraries.map(
            (itineraries: {
              id_itinerary: number;
              name_itinerary: string;
              valid_since: any;
              first_floor_price: any;
              route: { name_route: any}
            }) => [
              itineraries.name_itinerary,
              itineraries.valid_since.split('T')[0],
              itineraries.route.name_route,
              itineraries.first_floor_price,
              _(
                <div className="flex justify-center">
                  <button
                    className={
                      'h-10 w-10 border rounded-xl text-white text-xl flex items-center justify-center bg-primary'
                    }
                    onClick={() => {
                      // editCity({
                      //   city_name: city.city_name,
                      //   // @ts-ignore
                      //   country: city.country,
                      //   department: city.department,
                      //   id_city: city.id_city,
                      // });
                    }}>
                    <HiOutlinePencil />
                  </button>
                  <button
                    className={
                      'h-10 w-10 border rounded-xl text-white text-xl flex items-center justify-center bg-bgred'
                    }
                    disabled={deleteCityIsLoading}
                    onClick={async () => {
                      await deleteCity(itineraries.id_itinerary);
                    }}>
                    <BiTrash />
                  </button>
                  <button
                    className={
                      'h-10 w-10 border rounded-xl text-white text-xl flex items-center justify-center bg-bggris'
                    }
                    // onClick={() => alert(itineraries.department)}
                    >
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
      search={{}}
      resizable={true}
      sort={true}
      footer={false}
      style={{
      //   table: {
      //     width: '100%',
      //     'border-raidus': '100px',
      //   },
      //   th: {
      //     'background-color': '#e8f0fd',
      //     color: ' var(--color-primary--)',
      //     'font-weight': '500',
      //     'font-size': '14px',
      //     'text-align': 'start ',
      //     'border-color': '#BDD7FF',
      //   },
        td: {
      //     padding: '10px',
          'text-align': 'center',
      //     'border-color': '#BDD7FF',
      //     'font-weight': '400',
      //     'font-size': '12px',
        },
      }}
    />
  );
};

export default TableItinerariesList;
