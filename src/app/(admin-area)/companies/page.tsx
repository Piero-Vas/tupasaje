'use client';

import {useId, useState} from 'react';
import ButtonCreate from '@/components/ButtonCreate';
import {IoCloseOutline} from 'react-icons/io5';
import Swal from 'sweetalert2';
import TableCompanies from './components/table';
import {useAxios} from '@/modules/axios/axios.hook';

const DEFAULT_COMPANIES_DATA = {
  company_name: '',
  address: '',
  phone: '',
  tax_id: '',
  email: '',
  responsible_name: '',
  responsible_document: '',
  responsible_phone: '',
};

const Companies: React.FC = () => {
  const uniqueId = useId();
  const [newCompanieData, setNewCompanieData] = useState(
    DEFAULT_COMPANIES_DATA,
  );
  const [{loading: createCompaniesIsLoading}, executeCreateCompanies] =
    useAxios(
      {
        method: 'POST',
        url: '/companies',
      },
      {manual: true},
    );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      const response = await executeCreateCompanies({
        data: {
          company_name: newCompanieData.company_name,
          address: newCompanieData.address,
          phone: newCompanieData.phone,
          tax_id: newCompanieData.tax_id,
          email: newCompanieData.email,
          responsible_name: newCompanieData.responsible_name,
          responsible_document: newCompanieData.responsible_document,
          responsible_phone: newCompanieData.responsible_phone,
        },
      });

      console.log(response.data);

      setNewCompanieData(DEFAULT_COMPANIES_DATA);
    } catch (error) {
      console.error('Create failed:', error);
    }
  };

  return (
    <div>
      <div className="flex flex-row justify-between">
        <div className="p-4">
          <h2 className="text-xl font-bold text-primary">
            Administración de empresas
          </h2>
        </div>
        <div className="p-4">
          <ButtonCreate
            className="rounded-xl"
            name="Nueva Empresa"
            onClick={() => {
              // @ts-ignore
              window[`${uniqueId}-create-companie-modal`].showModal();
            }}
          />
        </div>
      </div>
      <div className="w-full mt-4 overflow-auto ">
        <TableCompanies />
      </div>

      {/* Modal crear ciudad */}
      <dialog
        id={`${uniqueId}-create-companie-modal`}
        className="modal modal-middle">
        <form
          method="dialog"
          className="modal-box w-8/12 max-w-5xl"
          onSubmit={handleSubmit}>
          <div className="flex relative items-center justify-center">
            <div className="grow h-14 flex justify-center items-center font-medium text-xl">
              Nueva Empresa
            </div>

            <button
              onClick={event => {
                event.preventDefault();
                // @ts-ignore
                window[`${uniqueId}-create-companie-modal`].close();
              }}
              className="btn right-0 absolute btn-circle bg-thcolor text-primary text-3xl">
              <IoCloseOutline className="" />
            </button>
          </div>
          <hr />
          <div className="grid grid-cols-2 gap-4 mt-10 mb-10 ">
            <div className="mb-4">
              <label
                htmlFor={`${uniqueId}-create-companie-name`}
                className="block mb-2 font-medium text-sm ">
                Nombre Comercial
              </label>
              <input
                type="text"
                id={`${uniqueId}-create-companie-name`}
                value={newCompanieData.company_name}
                onChange={({target: {value: company_name}}) => {
                  setNewCompanieData({
                    ...newCompanieData,
                    company_name,
                  });
                }}
                className="w-full py-3 px-5 rounded-br11 bg-bginput text-sm "
                required
                placeholder="Ingresa el nombre de la empresa"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor={`${uniqueId}-create-companie-represent`}
                className="block mb-2 font-medium text-sm ">
                Representante legal
              </label>
              <input
                type="text"
                id={`${uniqueId}-create-companie-represent`}
                value={newCompanieData.responsible_name}
                onChange={({target: {value: responsible_name}}) => {
                  setNewCompanieData({
                    ...newCompanieData,
                    responsible_name,
                  });
                }}
                className="w-full py-3 px-5 rounded-br11 bg-bginput text-sm "
                required
                placeholder="Ingresar nombre completo"
              />
            </div>
            <div className="mb-b">
              <label
                htmlFor={`${uniqueId}-create-companie-represent-document`}
                className="block mb-2 font-medium text-sm ">
                Documento del representante
              </label>
              <input
                type="text"
                id={`${uniqueId}-create-companie-represent-document`}
                value={newCompanieData.responsible_document}
                onChange={({target: {value: responsible_document}}) => {
                  setNewCompanieData({
                    ...newCompanieData,
                    responsible_document,
                  });
                }}
                className="w-full py-3 px-5 rounded-br11 bg-bginput text-sm "
                required
                minLength={6}
                placeholder="Ingresa el documento del representante"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor={`${uniqueId}-create-companie-email`}
                className="block mb-2 font-medium text-sm ">
                Correo electrónico
              </label>
              <input
                type="email"
                id={`${uniqueId}-create-companie-email`}
                value={newCompanieData.email}
                onChange={({target: {value: email}}) => {
                  setNewCompanieData({
                    ...newCompanieData,
                    email,
                  });
                }}
                className="w-full py-3 px-5 rounded-br11 bg-bginput text-sm "
                required
                minLength={6}
                placeholder="Ingresa el correo electrónico"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor={`${uniqueId}-create-companie-responsible-phone`}
                className="block mb-2 font-medium text-sm ">
                Celular del representante
              </label>
              <input
                type="text"
                id={`${uniqueId}-create-companie-responsible-phone`}
                value={newCompanieData.responsible_phone}
                onChange={({target: {value: responsible_phone}}) => {
                  setNewCompanieData({
                    ...newCompanieData,
                    responsible_phone,
                  });
                }}
                className="w-full py-3 px-5 rounded-br11 bg-bginput text-sm "
                required
                placeholder="+51"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor={`${uniqueId}-create-companie-phone`}
                className="block mb-2 font-medium text-sm ">
                Celular
              </label>
              <input
                maxLength={9}
                type="text"
                id={`${uniqueId}-create-companie-phone`}
                value={newCompanieData.phone}
                onChange={({target: {value: phone}}) => {
                  setNewCompanieData({
                    ...newCompanieData,
                    phone,
                  });
                }}
                className="w-full py-3 px-5 rounded-br11 bg-bginput text-sm "
                required
                placeholder="+51"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor={`${uniqueId}-create-companie-ruc`}
                className="block mb-2 font-medium text-sm ">
                RUC
              </label>
              <input
                type="text"
                id={`${uniqueId}-create-companie-ruc`}
                value={newCompanieData.tax_id}
                onChange={({target: {value: tax_id}}) => {
                  setNewCompanieData({
                    ...newCompanieData,
                    tax_id,
                  });
                }}
                minLength={6}
                className="w-full py-3 px-5 rounded-br11 bg-bginput text-sm "
                required
                placeholder="Ingresa el RUC"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor={`${uniqueId}-create-companie-address`}
                className="block mb-2 font-medium text-sm ">
                Dirección
              </label>
              <input
                type="text"
                id={`${uniqueId}-create-companie-address`}
                value={newCompanieData.address}
                onChange={({target: {value: address}}) => {
                  setNewCompanieData({
                    ...newCompanieData,
                    address,
                  });
                }}
                className="w-full py-3 px-5 rounded-br11 bg-bginput text-sm "
                required
                placeholder="Ingresa la dirección"
              />
            </div>
          </div>
          <hr />
          <button
            type="submit"
            disabled={createCompaniesIsLoading}
            className="w-full mt-4 bg-primary text-white font-medium py-2 px-4 rounded-br11 hover:bg-tertiary transition-colors text-base">
            Guardar
          </button>
        </form>
      </dialog>
    </div>
  );
};

export default Companies;
