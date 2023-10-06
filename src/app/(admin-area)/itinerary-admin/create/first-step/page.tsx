'use client';

import {useId, useState, useEffect} from 'react';
import Link from 'next/link';
import {Steps} from '../Steps';
import {CancelIcon} from '@/components/icon/CancelIcon';
import {useAxios} from '@/modules/axios/axios.hook';

type RouteListResponse = {
  data: {
    routes: {
      // se puede agregar más parametros, pero por ahora estos son suficientes
      id_route: number;
      name_route: string;
    }[];
  };
};

type BusesListResponse = {
  data: {
    buses: {
      // se puede agregar más parametros, pero por ahora estos son suficientes
      id_bus: number;
      name: string;
    }[];
  };
};

type Form = {
  routeId: number | null;
  name: string;
  initialDate: string;
  boardingTime: string;
  busId: number | null;
  driverId: number | null;
  copilotId: number | null;
  subuserId: number | null;
};

const CreateItineraryFirstPage: React.FC = () => {
  const uniqueId = useId();
  const [{data: routesListData}] = useAxios<RouteListResponse>('/routes/list');
  const [{data: busesListData}] = useAxios<BusesListResponse>('/buses/list');
  const [form, setForm] = useState<Form>({
    routeId: null,
    name: '',
    initialDate: '',
    boardingTime: '',
    busId: null,
    driverId: null,
    copilotId: null,
    subuserId: null,
  });
  const [nextUrl, setNextUrl] = useState<string>(
    '/itinerary-admin/create/second-step',
  );

  const routesList = routesListData?.data.routes ?? [];
  const busesList = busesListData?.data.buses ?? [];

  useEffect(() => {
    const newUrlParams = new URLSearchParams();
    const keys = Object.entries(form);

    keys.forEach(([key, value]) => {
      // @ts-ignore
      newUrlParams.append(key, value);
    });

    const newURL = `/itinerary-admin/create/second-step?${newUrlParams.toString()}`;

    setNextUrl(newURL);
  }, [form]);

  return (
    <div className="flex flex-col">
      {/** Heading */}
      <div className="flex flex-row justify-between">
        <div className="">
          <h2 className="text-xl font-bold text-primary">Nuevo itinerario</h2>
        </div>

        <div>
          <Link
            href="/itinerary-admin"
            className="btn flex-1 btn-outline rounded-[12px] bg-white hover:bg-white hover:text-black text-sm">
            <CancelIcon />
            Cancelar
          </Link>
        </div>
      </div>

      <div className="flex mt-8 gap-4">
        {/** info */}
        <Steps />

        {/** tabla */}
        <div className="flex flex-1">
          <div className="bg-white shadow rounded-[25px] border-[0.5px] border-borderPane flex flex-col flex-1 px-6 py-8">
            <div className="">
              <h3 className="font-medium text-sm text-textMuted uppercase">
                Datos generales
              </h3>
            </div>

            <div className="flex flex-1 gap-10">
              <div className="flex flex-1 flex-col">
                <div className="mt-6">
                  <div className="mb-4">
                    <label
                      htmlFor={`${uniqueId}-ruta-select`}
                      className="block mb-1 font-medium text-sm text-textMuted">
                      Ruta
                    </label>

                    <select
                      id={`${uniqueId}-ruta-select`}
                      className="select w-full bg-bgCommonInput rounded-xl"
                      placeholder="Seleccionar ruta"
                      value={form.routeId ?? undefined}
                      onChange={({target: {value}}) => {
                        const castedValue = parseFloat(value);
                        const isNumber = !isNaN(castedValue);

                        if (!isNumber) return;

                        setForm({
                          ...form,
                          routeId: castedValue,
                        });
                      }}>
                      <option>Seleccionar ruta</option>

                      {routesList.map(({id_route, name_route}, key) => (
                        <option key={key} value={id_route}>
                          {name_route}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor={`${uniqueId}-ruta-name-input`}
                      className="block mb-1 font-medium text-sm text-textMuted">
                      Nombre de Itinerario
                    </label>

                    <input
                      type="text"
                      id={`${uniqueId}-ruta-name-input`}
                      className="input w-full py-3 px-5 rounded-br11 bg-bgCommonInput text-sm text-black"
                      placeholder="Ingresa el nombre del itinerario"
                      value={form.name}
                      onChange={({target: {value}}) => {
                        setForm({
                          ...form,
                          name: value,
                        });
                      }}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor={`${uniqueId}-start-date-input`}
                      className="block mb-1 font-medium text-sm text-textMuted">
                      Fecha inicial
                    </label>

                    <input
                      type="date"
                      id={`${uniqueId}-start-date-input`}
                      className="input w-full py-3 px-5 rounded-br11 bg-bgCommonInput text-sm text-black"
                      placeholder="Establecer fecha inicial"
                      value={form.initialDate}
                      onChange={({target: {value}}) => {
                        setForm({...form, initialDate: value});
                      }}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor={`${uniqueId}-embarque-time-input`}
                      className="block mb-1 font-medium text-sm text-textMuted">
                      Hora de embarque
                    </label>

                    <input
                      type="time"
                      id={`${uniqueId}-embarque-time-input`}
                      className="input w-full py-3 px-5 rounded-br11 bg-bgCommonInput text-sm text-black"
                      placeholder="00:00"
                      value={form.boardingTime}
                      onChange={({target: {value}}) => {
                        setForm({...form, boardingTime: value});
                      }}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor={`${uniqueId}-asigned-bus-select`}
                      className="block mb-1 font-medium text-sm text-textMuted">
                      Bus asignado
                    </label>

                    <select
                      id={`${uniqueId}-asigned-bus-select`}
                      className="select w-full bg-bgCommonInput rounded-xl"
                      placeholder="Selecciona el bus"
                      value={form.busId ?? undefined}
                      onChange={({target: {value}}) => {
                        const castedValue = parseFloat(value);
                        const isNumber = !isNaN(castedValue);

                        if (!isNumber) return;

                        setForm({
                          ...form,
                          busId: castedValue,
                        });
                      }}>
                      <option>Seleccionar bus</option>

                      {busesList.map(({id_bus, name}, key) => (
                        <option key={key} value={id_bus}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col">
                <div className="mt-6">
                  <div className="mb-4">
                    <label
                      htmlFor={`${uniqueId}-driver-select`}
                      className="block mb-1 font-medium text-sm text-textMuted">
                      Chofer
                    </label>

                    <select
                      id={`${uniqueId}-driver-select`}
                      className="select w-full bg-bgCommonInput rounded-xl"
                      placeholder="Seleccionar el chofer"
                      value={form.driverId ?? undefined}
                      onChange={({target: {value}}) => {
                        const castedValue = parseFloat(value);
                        const isNumber = !isNaN(castedValue);

                        if (!isNumber) return;

                        setForm({
                          ...form,
                          driverId: castedValue,
                        });
                      }}>
                      <option>Seleccionar el chofer</option>
                      <option value={1}>chofer 1</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor={`${uniqueId}-copilot-select`}
                      className="block mb-1 font-medium text-sm text-textMuted">
                      Copiloto
                    </label>

                    <select
                      id={`${uniqueId}-copilot-1-select`}
                      className="select w-full bg-bgCommonInput rounded-xl"
                      placeholder="Selecciona el copiloto"
                      value={form.copilotId ?? undefined}
                      onChange={({target: {value}}) => {
                        const castedValue = parseFloat(value);
                        const isNumber = !isNaN(castedValue);

                        if (!isNumber) return;

                        setForm({
                          ...form,
                          copilotId: castedValue,
                        });
                      }}>
                      <option>Selecciona el copiloto</option>
                      <option value={1}>Copiloto 1</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor={`${uniqueId}-terramoza-select`}
                      className="block mb-1 font-medium text-sm text-textMuted">
                      Terramoza
                    </label>

                    <select
                      id={`${uniqueId}-terramoza-select`}
                      className="select w-full bg-bgCommonInput rounded-xl"
                      placeholder="Seleccionar terramoza"
                      value={form.subuserId ?? undefined}
                      onChange={({target: {value}}) => {
                        const castedValue = parseFloat(value);
                        const isNumber = !isNaN(castedValue);

                        if (!isNumber) return;

                        setForm({
                          ...form,
                          subuserId: castedValue,
                        });
                      }}>
                      <option>Seleccionar terramoza</option>
                      <option value={1}>Terramoza 1</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="divider"></div>

      <div className="flex justify-between mb-10">
        <div></div>

        <div className="flex gap-4">
          <Link
            className="btn rounded-[14px] border border-textStepsChecked bg-transparent text-primary hover:bg-primary hover:text-white"
            href="/itinerary-admin">
            Cancelar
          </Link>

          <Link
            href={nextUrl}
            className="btn rounded-[14px] bg-primary text-white hover:bg-secondary">
            Continuar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateItineraryFirstPage;
