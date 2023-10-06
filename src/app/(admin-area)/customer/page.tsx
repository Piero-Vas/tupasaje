import {FaPlus} from 'react-icons/fa';
import TableCustomer from '@/app/(admin-area)/customer/components/Table';

const Customer: React.FC = () => {
  return (
    <div>
      <div className="flex flex-row justify-between">
        <div className="p-4">
          <h2 className="text-xl font-bold text-primary">
            Administración de ciudades
          </h2>
        </div>
        <div className="p-4">
          <button className="btn flex flex-row items-center text-white font-bold text-sm bg-primary rounded-full px-4 py-2">
            <FaPlus className="mr-2" />
            <span> Nueva ciudad</span>
          </button>
        </div>
      </div>
      <div className="w-full ">
        <TableCustomer />
      </div>
    </div>
  );
};

export default Customer;
