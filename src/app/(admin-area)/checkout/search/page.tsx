'use client';

import {useId, useState} from 'react';
import {Grid} from 'gridjs-react';

const CheckoutSearch: React.FC = () => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <div className="flex h-full">
      <div className="flex w-[400px]">
        <form
          onSubmit={handleSubmit}
          className="bg-white w-full border-r-[0.5px] border-borderLayout px-6 py-10 flex flex-col">
          <h3 className="text-sm font-medium uppercase mb-4">Buscar caja</h3>

          <div className="mt-6">
            <p className="text-sm font-medium">Agencia o punto de venta</p>
            <select className="select w-full mt-2 bg-bgCommonInput rounded-xl">
              <option disabled selected>
                Seleccionar agencia
              </option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
            </select>
          </div>

          <div className="mt-6">
            <p className="text-sm font-medium">N° de caja</p>
            <select className="select w-full mt-2 bg-bgCommonInput rounded-xl">
              <option disabled selected>
                Seleccionar número
              </option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>

          <div className="mt-6">
            <p className="text-sm font-medium">Nombre del vendedor</p>
            <select className="select w-full mt-2 bg-bgCommonInput rounded-xl">
              <option disabled selected>
                Seleccionar vendedor
              </option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>

          <div className="mt-6 flex gap-4 justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium">Desde</p>

              <input
                type="date"
                className="input text-sm max-w-xs mt-2 bg-bgCommonInput rounded-xl"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Hasta</p>

              <input
                type="date"
                placeholder=""
                className="input text-sm max-w-xs mt-2 bg-bgCommonInput rounded-xl"
              />
            </div>
          </div>

          <div className="w-full mt-20">
            <button className="btn w-full bg-primary text-white hover:bg-secondary rounded-[14px]">
              Buscar
            </button>
          </div>
        </form>
      </div>
      <div className="flex flex-1 flex-grow w-full min-h-full justify-center items-center">
        el contenido del resultado de la busqueda va aquí
      </div>
    </div>
  );
};

export default CheckoutSearch;
