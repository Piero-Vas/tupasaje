'use client';
import React from 'react';
import {Grid} from 'gridjs-react';
import 'gridjs/dist/theme/mermaid.css';
import Cookies from 'js-cookie';
import {_} from 'gridjs-react';
// @ts-ignore
import {esES} from 'gridjs/l10n';

const TableCity: React.FC = () => {
  let cooktoken = Cookies.get('token');
  return (
    <Grid
      columns={[
        'NOMBRE',
        'CODIGO',
        'RUC',
        'COUDAD EN RUTA',
        'MOSTRAR EN REPORTES',
        'ACCIONES',
      ]}
      language={esES}
      // resizable= {true}
      width={'auto'}
      server={{
        method: 'GET',
        headers: {
          Authorization: `Bearer ${cooktoken}`,
          'Content-Type': 'application/json',
        },
        url: `${process.env.API_URL}/cities/list/`,
        then: (data: {data: {cities: {city_name: any}[]; total: any}}) =>
          data.data.cities.map((city: {city_name: any}) => [
            city.city_name,
            '-',
            '-',
            _(<input type="checkbox" className="toggle toggle-success" />),
            _(<input type="checkbox" className="toggle toggle-success" />),
            _(
              <button
                className={'py-2 px-4 border rounded-md text-white bg-blue-600'}
                onClick={() => alert('clicked!')}>
                Edit
              </button>,
            ),
          ]),
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
      style={{
        table: {
          width: '100%',
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
          'text-align': 'center',
          'border-color': '#BDD7FF',
          'font-weight': '400',
          'font-size': '12px',
        },
      }}
    />
  );
};

export default TableCity;
