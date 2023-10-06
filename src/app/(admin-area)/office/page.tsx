'use client';

import {FaPlus} from 'react-icons/fa';
import TableOffice from '@/app/(admin-area)/office/components/Table';
import Link from 'next/link';

const Office: React.FC = () => {
  return (
    <div>
      <div className="flex flex-row justify-between">
        <div className="p-4">
          <h2 className="text-xl font-bold text-primary">
            Administración de oficinas
          </h2>
        </div>
        <div className="p-4">
          <Link
            href="/office/create"
            className="btn flex flex-row items-center text-white font-bold text-sm bg-primary px-4 py-2 hover:bg-secondary rounded-xl">
            <FaPlus className="mr-2" />
            Nueva Oficina
          </Link>
        </div>
      </div>
      <div className="w-full mt-4">
        <TableOffice />
      </div>
    </div>
  );
};

export default Office;
