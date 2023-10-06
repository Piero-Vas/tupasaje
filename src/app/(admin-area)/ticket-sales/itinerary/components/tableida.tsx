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

const TableItinerariesIda: React.FC = () => {
  let cooktoken = Cookies.get('token');
  const deleteCity = async ({id}: {id: number}) => {
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
          let params = {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${cooktoken}`,
              'Content-Type': 'application/json',
            },
          };
          await fetch(`${process.env.API_URL}/cities/${id}`, params).then(
            response => {
              if (!response.ok) {
                return Promise.reject('some reason');
              }
              Swal.fire('Borrado Correctamente', '', 'success');
              return response.json();
            },
          );
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
      columns={['', 'SALIDA', 'SERVICIO', 'DISPONIBLE', 'PRECIO']}
      language={esES}
      server={{
        method: 'GET',
        headers: {
          Authorization: `Bearer ${cooktoken}`,
          'Content-Type': 'application/json',
        },
        url: `${process.env.API_URL}/companies/list/`,
        then: (data: {
          data: {
            companies: {id_company: any; company_name: any; phone: any}[];
            total: any;
          };
        }) =>
          data.data.companies.map(
            (companies: {id_company: any; company_name: any; phone: any}) => [
              _(
                <div className="flex justify-center">
                  <input
                    type="radio"
                    name="radio-2"
                    className="radio checked:bg-primary"
                  />
                </div>,
              ),
              '8:30 PM',
              _(
                <div>
                  <div>
                    PISO 1 - <span className="font-bold">ESTÁNDAR</span>
                  </div>
                  <div>
                    PISO 2 - <span className="font-bold">VIP</span>
                  </div>
                </div>,
              ),
              _(
                <div className="text-primary font-bold">
                  <div>5 libres</div>
                  <div>12 libres</div>
                </div>,
              ),
              _(
                <div>
                  <div>
                    Desde S/.<span className="font-bold">75.0</span>
                  </div>
                  <div>
                    Desde S/.<span className="font-bold">150.0</span>
                  </div>
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
      // sort= {true}
      // footer = {false}
      style={{
        table: {
          width: '100%',
          'border-raidus': '100px',
        },
        th: {
          'background-color': '#e8f0fd',
          color: ' var(--color-primary--)',
          'font-weight': '500',
          'font-size': '14px',
          'text-align': 'start ',
          'border-color': '#BDD7FF',
        },
        td: {
          padding: '10px',
          'text-align': 'start',
          'border-color': '#BDD7FF',
          'font-weight': '400',
          'font-size': '12px',
        },
      }}
    />
  );
};

export default TableItinerariesIda;
