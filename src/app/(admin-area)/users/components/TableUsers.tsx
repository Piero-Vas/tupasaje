'use client';

import {Grid} from 'gridjs-react';
import Cookies from 'js-cookie';
import {_} from 'gridjs-react';
// @ts-ignore
import {esES} from 'gridjs/l10n';
import {BiTrash} from 'react-icons/bi';
import {HiOutlinePencil} from 'react-icons/hi';
import {FiPower} from 'react-icons/fi';

export const TableUsers: React.FC = () => {
  const cooktoken = Cookies.get('token');

  return (
    <Grid
      columns={[
        'Nombre de usuario',
        'Nombre ',
        'categoría',
        'Oficina',
        'Acciones',
      ]}
      language={esES}
      server={{
        method: 'GET',
        headers: {
          Authorization: `Bearer ${cooktoken}`,
          'Content-Type': 'application/json',
        },
        url: `${process.env.API_URL}/admin/user/list`,
        then: (data: {
          data: {
            users: {
              username: string;
              first_name: string;
              last_name: string;
              role: string;
              id_office: number;
            }[];
            total: number;
          };
        }) =>
          data.data.users.map(
            (user: {
              username: string;
              first_name: string;
              last_name: string;
              role: string;
              id_office: number;
            }) => [
              user.username,
              user.first_name,
              user.last_name,
              user.role,
              user.id_office,
              _(
                <div className="flex">
                  <button
                    className={
                      'h-10 w-10 border rounded-xl text-white text-xl flex items-center justify-center bg-primary'
                    }>
                    <HiOutlinePencil />
                  </button>
                  <button
                    className={
                      'h-10 w-10 border rounded-xl text-white text-xl flex items-center justify-center bg-bgred'
                    }>
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
      search={{}}
      resizable={true}
      sort={true}
      footer={false}
      // style={{
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
