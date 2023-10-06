'use client';

import {Grid} from 'gridjs-react';
import Cookies from 'js-cookie';
import {_} from 'gridjs-react';
// @ts-ignore
import {esES} from 'gridjs/l10n';
import {API_URL} from '@/config/env';
import {DetailsIcon} from '@/components/icon/DetailsIcon';
import Link from 'next/link';

const TableCrew: React.FC = () => {
  const cooktoken = Cookies.get('token');

  return (
    <Grid
      columns={[
        'CARGO',
        'NOMBRES',
        'DNI',
        'TIPO DE LICENCIA',
        'N° DE LICENCIA',
        'CELULAR',
        'ACCIONES',
      ]}
      language={esES}
      resizable={true}
      sort={true}
      footer={false}
      server={{
        method: 'GET',
        headers: {
          Authorization: `Bearer ${cooktoken}`,
          'Content-Type': 'application/json',
        },
        url: `${API_URL}/subusers/list`,
        then: (data: {
          data: {
            subUsers: {
              id_sub_user: number;
              id_company: number;
              id_office: number;
              first_name: string;
              last_name: string;
              birth_date: string;
              phone: string;
              driving_license: string;
              document_number: string;
              images: string;
              role: string;
              created_at: string;
              updated_at: string;
              deleted_at: null | string;
            }[];
            total: number;
          };
        }) =>
          data.data.subUsers.map(subUser => [
            subUser.role,
            `${subUser.last_name}, ${subUser.first_name}`,
            subUser.document_number,
            '-',
            subUser.driving_license,
            subUser.phone,
            _(
              <div className="flex items-center justify-center">
                <Link
                  href={`/crew/${subUser.id_sub_user}`}
                  className="h-10 w-10 border rounded-xl text-white text-xl flex items-center justify-center bg-primary">
                  <DetailsIcon />
                </Link>
              </div>,
            ),
          ]),
        handle: (res: any) => {
          // no matching records found
          if (res.status === 404) return {data: []};
          if (res.ok) return res.json();
          throw Error('oh no :(');
        },
      }}
    />
  );
};

export default TableCrew;
