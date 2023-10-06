'use client';
import React, {useState} from 'react';
import {FaPlus} from 'react-icons/fa';
import {Grid} from 'gridjs-react';
import {esES} from 'gridjs/l10n';
import {BiTrash} from 'react-icons/bi';
import {HiOutlinePencil} from 'react-icons/hi';
import {FiPower} from 'react-icons/fi';
import Cookies from 'js-cookie';

const TableCustom = ({
  columns,
  link,
  data,
  method,
}: {
  columns: any;
  link: string;
  data: any;
  method: string;
}) => {
  let cooktoken = Cookies.get('token');

  return (
    <Grid
      columns={columns}
      language={esES}
      server={{
        method: method,
        headers: {
          Authorization: `Bearer ${cooktoken}`,
          'Content-Type': 'application/json',
        },
        url: link,
        then: data,
        handle: (res: any) => {
          // no matching records found
          if (res.status === 404) return {data: []};
          if (res.ok) return res.json();
          throw Error('oh no :(');
        },
      }}
      resizable={true}
      sort= {true}
      // footer = {false}
      search={true}
      style={false}
    />
  );
};

export default TableCustom;
