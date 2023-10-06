import Link from 'next/link';
import {FaPlus} from 'react-icons/fa';
import {TableUsers} from './components/TableUsers';

const UsersPage: React.FC = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <div className="p-4">
          <h2 className="text-xl font-bold text-primary">
            Administración de usuarios
          </h2>
        </div>
        <div className="p-4">
          <Link
            href="/users/create"
            className="btn flex flex-row items-center text-white font-bold text-sm bg-primary rounded-full px-4 py-2 hover:bg-secondary">
            <FaPlus className="mr-2" /> Nuevo usuario
          </Link>
        </div>
      </div>

      {/** Select and search input */}
      <div className="flex flex-row justify-between items-center mt-8">
        <div className="p-4">
          <div className="flex items-center">
            Mostrar
            <select className="select max-w-xs mx-4">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
            entradas
          </div>
        </div>
      </div>

      {/** Table */}
      <div className="w-full mt-4">
        <TableUsers />
      </div>

      <div className="flex mt-8 justify-between flex-row">
        <div></div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Celdas adicionales</span>
            <input type="checkbox" className="toggle ml-4" />
          </label>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
