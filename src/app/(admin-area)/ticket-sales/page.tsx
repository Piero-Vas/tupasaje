'use client';

import { useRouter } from 'next/navigation';
import { _ } from 'gridjs-react';
import { useEffect, useId, useState } from 'react';
import { cn } from '@/utils/cn';
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useGetCityQuery, } from '@/redux/services/cityApi';
import { changecityDestination, changecityOrigin, changedateSince, changedateUntil, changeValidTrip, ItinerarySelected } from "@/redux/features/itinerarySelected";

import Cookies from 'js-cookie';

type CheckOutMenuTabs = 'IDA' | 'VUELTA';
const TicketSales: React.FC = () => {
  const uniqueId = useId();
  const router = useRouter();
  let cooktoken = Cookies.get('token');
  const dispatch = useAppDispatch()

  const [menuTab, setMenuTab] = useState<CheckOutMenuTabs>('IDA');

  const { data: city, error, isLoading, isFetching } = useGetCityQuery(null)

  const destination = useAppSelector((state) => state.ItinerarySelected.cityDestinationValue)
  const origin = useAppSelector((state) => state.ItinerarySelected.cityOriginValue)
  const trip = useAppSelector((state) => state.ItinerarySelected.dateSince)
  const trip2 = useAppSelector((state) => state.ItinerarySelected.dateUntil)

  useEffect(() => {
    validBox()
  }, []);

  const validBox =async ()=>{
    // let boxDetailApi = 1;
    try {
      let params = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${cooktoken}`,
          'Content-Type': 'application/json',
        },
      };
      const check = await fetch(`${process.env.API_URL}/cashierbox/list?id_office=2`, params);
      const query = await check.json();
      let boxDetailApi = query['data']["cashierBox"];
     let status = boxDetailApi[0]["state"]
     if (status == 0) {
      router.push('/checkout');
     }
    } catch (error) {
      console.log(error);
    }
  }

  const handleSwitchTab = () => {
    if (menuTab === 'IDA') {
      setMenuTab('VUELTA');
      dispatch(changeValidTrip(true))
    } else {
      dispatch(changeValidTrip(false))
      setMenuTab('IDA');
    }
  };

  const handleSelectChangeOrigin = (e: { target: any; }) => {
    const selectedOption = parseInt(e.target.value);
    const customData = e.target.options[e.target.selectedIndex].getAttribute('data-custom');
    const dataToLoad = {
      cityOriginValue: selectedOption,
      cityOrigin: customData
    };
    dispatch(changecityOrigin(dataToLoad))
  };

  const handleSelectChangeDestination = (e: { target: any; }) => {
    const selectedOption = parseInt(e.target.value);
    const customData = e.target.options[e.target.selectedIndex].getAttribute('data-custom');
    const dataToLoad = {
      cityDestinationValue: selectedOption,
      cityDestination: customData
    };
    dispatch(changecityDestination(dataToLoad))
  };

  const handleDateSince = (e: { target: any; }) => {
    const value = e.target.value;
    dispatch(changedateSince(value))
  };

  const handleDateUntil = (e: { target: any; }) => {
    const value = e.target.value;
    dispatch(changedateUntil(value))
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (destination == 0 || origin == 0) {
      console.log("Seleccione una citudad")
    } else {
      router.push('/ticket-sales/itinerary');
    }
  };

  

  return (

    <div>
      <div className="flex flex-row justify-between">
        <div className="p-4">
          <h2 className="text-xl font-bold text-primary">Búsqueda</h2>
        </div>
      </div>
      <div className="flex justify-center">
        <form
          method="dialog"
          className="modal-box w-8/12 max-w-5xl p-0"
          onSubmit={handleSubmit}>
          <div className="flex justify-center align-center py-7 ">
            <div className="text-black text-xl font-medium ">BUSCAR VIAJES</div>
          </div>

          <div className="flex justify-center">
            {/* <label className="swap bg-bginput  p-1 rounded-xl">
              <input type="checkbox" />
              <div className="swap-on  flex w-64 justify-center ">
                <div className="grow flex justify-center align-center bg-bgblack text-white py-2  rounded-xl">
                  Ida y vuelta
                </div>
                <div className="grow  flex justify-center align-center py-2 text-slate-400 ">
                  Solo ida
                </div>
              </div>
              <div className="swap-off  flex w-64 justify-center ">
                <div className="grow  flex justify-center align-center py-2 text-slate-400 ">
                  Ida y vuelta
                </div>
                <div className="grow flex justify-center align-center bg-bgblack text-white py-2  rounded-xl">
                  Solo ida
                </div>
              </div>
            </label> */}
            <div className="tabs tabs-boxed rounded-[14px]">
              <a
                className={cn(
                  'tab grow px-8',
                  menuTab === 'IDA' && 'tab-active',
                )}
                onClick={handleSwitchTab}>
                Solo ida
              </a>
              <a
                className={cn(
                  'tab grow px-8',
                  menuTab === 'VUELTA' && 'tab-active',
                )}
                onClick={handleSwitchTab}>
                Ida y Vuelta
              </a>
            </div>

          </div>

          <div className="grid grid-cols-1 px-4 py-4">
            <div className="pr-4 ">
              <div className="mb-4">
                <label
                  htmlFor={`${uniqueId}-city-origin`}
                  className="block  mb-2 font-medium text-sm ">
                  Ciudad de origen
                </label>
                <select required defaultValue={0} onChange={handleSelectChangeOrigin} id={`${uniqueId}-city-origin`} className="select select-bordered w-full bg-bginput text-sm">
                  <option key={0} value={0} disabled selected  >
                    Elegir una opcion
                  </option>
                  {
                    city?.data.cities.map((e: { id_city: any }) => (
                      // @ts-ignore
                      <option key={e.id_city} value={e.id_city} data-custom={e.city_name}>{e.city_name}</option>
                    ))

                  }
                </select>
              </div>
              <div className="mb-4">
                <label

                  htmlFor={`${uniqueId}-city-destination`}
                  className="block mb-2 font-medium text-sm ">
                  Ciudad de destino
                </label>
                <select defaultValue={0} id={`${uniqueId}-city-destination`} onChange={handleSelectChangeDestination} className="select select-bordered w-full bg-bginput text-sm" required>
                  <option key={0} value={0} disabled selected>
                    Elegir una opcion
                  </option>
                  {
                    city?.data.cities.map((e: { id_city: any }) => (
                      // @ts-ignore
                      <option key={e.id_city} value={e.id_city} data-custom={e.city_name}>{e.city_name}</option>
                    ))

                  }
                </select>
              </div>
              <div className="grid grid-cols-2">
                <div className="mb-4 mr-4">
                  <label
                    htmlFor="country"
                    className="block mb-2 font-medium text-sm ">
                    Fecha de ida
                  </label>
                  <input
                    type="date"
                    id="country"
                    className="w-full py-3 px-5 rounded-br11 bg-bginput text-sm "
                    required
                    onChange={handleDateSince}
                  />
                </div>
                {
                  menuTab === 'VUELTA' ?
                    <div className="mb-4 mr-4">
                      <label
                        htmlFor="country"
                        className="block mb-2 font-medium text-sm ">
                        Fecha de vuelta
                      </label>
                      <input
                        type="date"
                        id="country"
                        className="w-full py-3 px-5 rounded-br11 bg-bginput text-sm "
                        // required
                        placeholder="Nombre del terminal"
                        onChange={handleDateUntil}
                      />
                    </div> : <div></div>

                }

              </div>
            </div>
          </div>
          <hr />
          <div className="flex justify-end px-4 py-4">
            <button
              type="submit"
              className=" bg-primary text-white font-medium py-2 px-4 rounded-br11 hover:bg-tertiary transition-colors text-base">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TicketSales;
