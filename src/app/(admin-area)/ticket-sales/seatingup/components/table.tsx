'use client';

import {Grid} from 'gridjs-react';
import Cookies from 'js-cookie';
import {_} from 'gridjs-react';
// @ts-ignore
import {esES} from 'gridjs/l10n';
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { selectItinerarie } from "@/redux/features/selectItinerarieSlice";


const TableItinerariesChange: React.FC = () => {
  let cooktoken = Cookies.get('token');

  const dispatch = useAppDispatch()

  const destination = useAppSelector((state) => state.ItinerarySelected.cityDestinationValue)
  
  const origin = useAppSelector((state) => state.ItinerarySelected.cityDestinationValue)

  const handleSelectChangeDestination = (e: { target: any; }) => {
    console.log(e.target.value)
    const selectedOption = parseInt(e.target.value);
    dispatch(selectItinerarie(selectedOption))
  };

  return (
    <Grid
      columns={['', 'SALIDA', 'SERVICIO', 'DISPONIBLE', 'PRECIO']}
      language={esES}
      server={{
        method: 'GET',
        headers: {
          Authorization: `Bearer ${cooktoken}`,
          'Content-Type': 'application/json',
        },
        url: `${process.env.API_URL}/itineraries/list?city_origin=${origin}&city_destination=${destination}`,
        then: (data: {
          data: {
            itineraries: {id_itinerary: any; departure_time: any; prices: {specifics: any }}[];
            total: any;
          };
        }) =>
          data.data.itineraries.map(
            (itineraries: {id_itinerary: any; departure_time: any; prices: { specifics: any } }) => [
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
              itineraries.departure_time,
              _(
          
                <div>
                  {itineraries.prices.specifics.map((e: { f: any })=>{
                          return <div className="font-bold">
                          PISO {e.f} <span className="font-bold"></span>
                        </div>
                        })}
                </div>,
              ),
              _(
                <div className="text-primary font-bold">
                  {/* <div>5 libres</div> */}
                  <div>12 libres</div>
                </div>,
              ),
              _(
                <div>
                  <div>
                    Desde S/.<span className="font-bold">75.0</span>
                  </div>
                  {/* <div>
                    Desde S/.<span className="font-bold">150.0</span>
                  </div> */}
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
        table: {
          width: '100%',
          'border-raidus': '100px',
        },
        th: {
          'background-color': '#e8f0fd',
          color: ' var(--color-primary--)',
          'font-weight': '500',
          'font-size': '14px',
          'text-align': 'start ',
          'border-color': '#BDD7FF',
        },
        td: {
          padding: '10px',
          'text-align': 'start',
          'border-color': '#BDD7FF',
          'font-weight': '400',
          'font-size': '12px',
        },
      }}
    />
  );
};

export default TableItinerariesChange;
