'use client';

import {Grid} from 'gridjs-react';
import Cookies from 'js-cookie';
import {_} from 'gridjs-react';
// @ts-ignore
import {esES} from 'gridjs/l10n';
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { selectItinerarie } from "@/redux/features/selectItinerarieSlice";


const TableItineraries: React.FC = () => {
  let cooktoken = Cookies.get('token');

  const dispatch = useAppDispatch()

  const destination_id = useAppSelector((state) => state.ItinerarySelected.cityDestinationValue)
  const origin_id = useAppSelector((state) => state.ItinerarySelected.cityOriginValue)
  const date = useAppSelector((state) => state.ItinerarySelected.dateSince)

  const handleSelectChangeDestination = (e: { target: any; }) => {
    const selectedOption = parseInt(e.target.value);
    dispatch(selectItinerarie(selectedOption))
  };

  return (
    <Grid
      columns={['', 'SALIDA', 'SERVICIO', 'PRECIO']}
      language={esES}
      server={{
        method: 'GET',
        headers: {
          Authorization: `Bearer ${cooktoken}`,
          'Content-Type': 'application/json',
        },
        url: `${process.env.API_URL}/itineraries/list?city_origin=${origin_id}&city_destination=${destination_id}&selected_date=${date}`,
        // url: `${process.env.API_URL}/itineraries/list?city_origin=1&city_destination=2&selected_date=2023-09-26`,
        then: (data: {
          data: {
            itineraries: {id_itinerary: any; arrival_time: any; first_floor_price: any, second_floor_price: any}[];
            total: any;
          };
        }) =>
          data.data.itineraries.map(
            (itineraries: {id_itinerary: any; arrival_time: any; first_floor_price: any, second_floor_price: any }) => [
              _(
                <div className="flex justify-center">
                  <input
                    value={itineraries.id_itinerary}
                    type="radio"
                    name="radio-1"
                    className="radio checked:bg-primary"
                    onChange={handleSelectChangeDestination}
                  />
                </div>,
              ),
              itineraries.arrival_time,
              _(
          
                <div>
                   <div className="font-bold">
                    PISO 1 <span className="font-bold"></span>
                  </div>
                  {
                    itineraries.second_floor_price != ''?<div className="font-bold">
                    PISO 2 <span className="font-bold"></span>
                  </div>:<div></div>
                  }
                  
                </div>,
              ),
              // _(
              //   <div className="text-primary font-bold">
              //     {/* <div>5 libres</div> */}
              //     <div>12 libres</div>
              //   </div>,
              // ),
              _(
                <div>
                  <div>
                    Desde S/.<span className="font-bold">{itineraries.first_floor_price}</span>
                  </div>
                  {
                    itineraries.second_floor_price != ''?
                    <div>
                    Desde S/.<span className="font-bold">{itineraries.second_floor_price}</span>
                  </div>
                  : <div></div>
                  }
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
      resizable={true}
      // sort= {true}
      // footer = {false}
      style={{
        td: {
          'text-align': 'center',
        },
      }}
    />
  );
};

export default TableItineraries;
