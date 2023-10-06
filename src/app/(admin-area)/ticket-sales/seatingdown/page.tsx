'use client';

import {FaTimes} from 'react-icons/fa';
import Stairs from '@/assets/svg/stairs.svg';
import Stair from '@/assets/svg/stair.svg';
import StairTaken from '@/assets/svg/stairtaken.svg';
import StairSelected from '@/assets/svg/stairselected.svg';
import WC from '@/assets/svg/wc.svg';
import {AiOutlineArrowDown} from 'react-icons/ai';
import {useRouter} from 'next/navigation';

const SeatingUp: React.FC = () => {
  const router = useRouter();
  const backPage = async () => {
    router.push('/seatingup');
  };
  const nextPage = async () => {
    router.push('/datacustomer');
  };
  const closePage = async () => {
    router.push('/pay');
  };
  return (
    <div>
      <div className="flex flex-row justify-between items-center p-4">
        <h2 className="text-xl font-bold text-primary">
          Administración de asientos
        </h2>
        <button onClick={closePage} className="btn btn-outline py-0 ">
          <FaTimes className="mr-2 " />
          <span> Cancelar</span>
        </button>
      </div>
      <div className="flex p-4 bg-bginput rounded-xl">
        <div className="flex items-center mr-8">
          <div className="p-1 mr-4 rounded-full bg-bgblack text-md">
            <AiOutlineArrowDown className="text-white" />
          </div>

          <div className="">
            <div className="text-md">RETORNO</div>
            <div className="text-md text-primary">TRUJILLO - LIMA</div>
          </div>
        </div>
        <div className="grow flex items-center">
          <div className="">
            <div className="text-sm">Salida:</div>
            <div className="text-sm text-primary">
              LUNES 10 JUNIO 2023 - 8:30 PM
            </div>
          </div>
        </div>
        <div className="grow flex items-center">
          <div className="">
            <div className="text-sm">
              <span className="font-bold">Embarque: </span> Av. Paseo la
              Republica
            </div>
            <div className="text-sm">
              <span className="font-bold">Desembarque: </span> Av. America Sur
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 mt-8 space-x-4">
        <div className="bg-local">
          <div className="flex justify-center mb-8">
            <label className="swap bg-bginput  p-1 rounded-xl">
              <input type="checkbox" />
              <div className="swap-on  flex w-64 justify-center ">
                <div className="grow flex justify-center align-center bg-bgblack text-white py-2  rounded-xl">
                  PISO 1
                </div>
                <div className="grow  flex justify-center align-center py-2 font-bold ">
                  PISO 2
                </div>
              </div>
              <div className="swap-off  flex w-64 justify-center ">
                <div className="grow  flex justify-center align-center py-2 font-bold ">
                  PISO 1
                </div>
                <div className="grow flex justify-center align-center bg-bgblack text-white py-2  rounded-xl">
                  PISO 2
                </div>
              </div>
            </label>
          </div>
          <div className="flex justify-center">
            <div className="p-4 border rounded-3xl w-2/4 ">
              <div className="grid grid-cols-2 justify-center ">
                <div className="flex flex-col items-center ">
                  <div className=" w-3/4 border m-4 p-4 rounded-xl flex justify-center">
                    <WC />
                  </div>
                  <div className="grid grid-cols-2 w-3/4 ">
                    <label className="swap">
                      <input type="checkbox" />
                      <div className="swap-off flex justify-center items-center mt-4 ">
                        <div className="stack   items-center">
                          <div className="flex justify-center font-medium  ">
                            01
                          </div>
                          <div className="">
                            <Stair />
                          </div>
                        </div>
                      </div>
                      <div className="swap-on flex justify-center items-center mt-4 text-primary ">
                        <div className="stack   items-center">
                          <div className="flex justify-center font-medium  ">
                            01
                          </div>
                          <div className="">
                            <StairSelected />
                          </div>
                        </div>
                      </div>
                    </label>
                    <label className="swap">
                      <input type="checkbox" />
                      <div className="swap-off flex justify-center items-center mt-4 ">
                        <div className="stack   items-center">
                          <div className="flex justify-center font-medium  ">
                            02
                          </div>
                          <div className="">
                            <Stair />
                          </div>
                        </div>
                      </div>
                      <div className="swap-on flex justify-center items-center mt-4 text-primary ">
                        <div className="stack   items-center">
                          <div className="flex justify-center font-medium  ">
                            02
                          </div>
                          <div className="">
                            <StairSelected />
                          </div>
                        </div>
                      </div>
                    </label>
                    <label className="swap">
                      <input type="checkbox" />
                      <div className="swap-off flex justify-center items-center mt-4 ">
                        <div className="stack   items-center">
                          <div className="flex justify-center font-medium  ">
                            03
                          </div>
                          <div className="">
                            <Stair />
                          </div>
                        </div>
                      </div>
                      <div className="swap-on flex justify-center items-center mt-4 text-primary ">
                        <div className="stack   items-center">
                          <div className="flex justify-center font-medium  ">
                            03
                          </div>
                          <div className="">
                            <StairSelected />
                          </div>
                        </div>
                      </div>
                    </label>
                    <label className="swap">
                      <input type="checkbox" />
                      <div className="swap-off flex justify-center items-center mt-4 ">
                        <div className="stack   items-center">
                          <div className="flex justify-center font-medium  ">
                            04
                          </div>
                          <div className="">
                            <Stair />
                          </div>
                        </div>
                      </div>
                      <div className="swap-on flex justify-center items-center mt-4 text-primary ">
                        <div className="stack   items-center">
                          <div className="flex justify-center font-medium  ">
                            04
                          </div>
                          <div className="">
                            <StairSelected />
                          </div>
                        </div>
                      </div>
                    </label>
                    <label className="swap">
                      <input type="checkbox" />
                      <div className="swap-off flex justify-center items-center mt-4 ">
                        <div className="stack   items-center">
                          <div className="flex justify-center font-medium  ">
                            05
                          </div>
                          <div className="">
                            <Stair />
                          </div>
                        </div>
                      </div>
                      <div className="swap-on flex justify-center items-center mt-4 text-primary ">
                        <div className="stack   items-center">
                          <div className="flex justify-center font-medium  ">
                            05
                          </div>
                          <div className="">
                            <StairSelected />
                          </div>
                        </div>
                      </div>
                    </label>
                    <label className="swap">
                      <input type="checkbox" />
                      <div className="swap-off flex justify-center items-center mt-4 ">
                        <div className="stack   items-center">
                          <div className="flex justify-center font-medium  ">
                            06
                          </div>
                          <div className="">
                            <Stair />
                          </div>
                        </div>
                      </div>
                      <div className="swap-on flex justify-center items-center mt-4 text-primary ">
                        <div className="stack   items-center">
                          <div className="flex justify-center font-medium  ">
                            06
                          </div>
                          <div className="">
                            <StairSelected />
                          </div>
                        </div>
                      </div>
                    </label>
                    <label className="swap">
                      <input type="checkbox" />
                      <div className="swap-off flex justify-center items-center mt-4 ">
                        <div className="stack   items-center">
                          <div className="flex justify-center font-medium  ">
                            07
                          </div>
                          <div className="">
                            <Stair />
                          </div>
                        </div>
                      </div>
                      <div className="swap-on flex justify-center items-center mt-4 text-primary ">
                        <div className="stack   items-center">
                          <div className="flex justify-center font-medium  ">
                            07
                          </div>
                          <div className="">
                            <StairSelected />
                          </div>
                        </div>
                      </div>
                    </label>
                    <label className="swap">
                      <input type="checkbox" />
                      <div className="swap-off flex justify-center items-center mt-4 ">
                        <div className="stack   items-center">
                          <div className="flex justify-center font-medium  ">
                            08
                          </div>
                          <div className="">
                            <Stair />
                          </div>
                        </div>
                      </div>
                      <div className="swap-on flex justify-center items-center mt-4 text-primary ">
                        <div className="stack   items-center">
                          <div className="flex justify-center font-medium  ">
                            08
                          </div>
                          <div className="">
                            <StairSelected />
                          </div>
                        </div>
                      </div>
                    </label>
                    <label className="swap">
                      <input type="checkbox" />
                      <div className="swap-off flex justify-center items-center mt-4 ">
                        <div className="stack   items-center">
                          <div className="flex justify-center font-medium  ">
                            09
                          </div>
                          <div className="">
                            <Stair />
                          </div>
                        </div>
                      </div>
                      <div className="swap-on flex justify-center items-center mt-4 text-primary ">
                        <div className="stack   items-center">
                          <div className="flex justify-center font-medium  ">
                            09
                          </div>
                          <div className="">
                            <StairSelected />
                          </div>
                        </div>
                      </div>
                    </label>
                    <label className="swap">
                      <input type="checkbox" />
                      <div className="swap-off flex justify-center items-center mt-4 ">
                        <div className="stack   items-center">
                          <div className="flex justify-center font-medium  ">
                            10
                          </div>
                          <div className="">
                            <Stair />
                          </div>
                        </div>
                      </div>
                      <div className="swap-on flex justify-center items-center mt-4 text-primary ">
                        <div className="stack   items-center">
                          <div className="flex justify-center font-medium  ">
                            10
                          </div>
                          <div className="">
                            <StairSelected />
                          </div>
                        </div>
                      </div>
                    </label>
                    <label className="swap">
                      <input type="checkbox" />
                      <div className="swap-off flex justify-center items-center mt-4 ">
                        <div className="stack   items-center">
                          <div className="flex justify-center font-medium  ">
                            11
                          </div>
                          <div className="">
                            <Stair />
                          </div>
                        </div>
                      </div>
                      <div className="swap-on flex justify-center items-center mt-4 text-primary ">
                        <div className="stack   items-center">
                          <div className="flex justify-center font-medium  ">
                            11
                          </div>
                          <div className="">
                            <StairSelected />
                          </div>
                        </div>
                      </div>
                    </label>
                    <label className="swap">
                      <input type="checkbox" />
                      <div className="swap-off flex justify-center items-center mt-4 ">
                        <div className="stack   items-center">
                          <div className="flex justify-center font-medium  ">
                            12
                          </div>
                          <div className="">
                            <Stair />
                          </div>
                        </div>
                      </div>
                      <div className="swap-on flex justify-center items-center mt-4 text-primary ">
                        <div className="stack   items-center">
                          <div className="flex justify-center font-medium  ">
                            12
                          </div>
                          <div className="">
                            <StairSelected />
                          </div>
                        </div>
                      </div>
                    </label>
                    <label className="swap">
                      <input type="checkbox" />
                      <div className="swap-off flex justify-center items-center mt-4 ">
                        <div className="stack   items-center">
                          <div className="flex justify-center font-medium  ">
                            13
                          </div>
                          <div className="">
                            <Stair />
                          </div>
                        </div>
                      </div>
                      <div className="swap-on flex justify-center items-center mt-4 text-primary ">
                        <div className="stack   items-center">
                          <div className="flex justify-center font-medium  ">
                            13
                          </div>
                          <div className="">
                            <StairSelected />
                          </div>
                        </div>
                      </div>
                    </label>
                    <label className="swap">
                      <input type="checkbox" />
                      <div className="swap-off flex justify-center items-center mt-4 ">
                        <div className="stack   items-center">
                          <div className="flex justify-center font-medium  ">
                            14
                          </div>
                          <div className="">
                            <Stair />
                          </div>
                        </div>
                      </div>
                      <div className="swap-on flex justify-center items-center mt-4 text-primary ">
                        <div className="stack   items-center">
                          <div className="flex justify-center font-medium  ">
                            14
                          </div>
                          <div className="">
                            <StairSelected />
                          </div>
                        </div>
                      </div>
                    </label>
                    <label className="swap">
                      <input type="checkbox" />
                      <div className="swap-off flex justify-center items-center mt-4 ">
                        <div className="stack   items-center">
                          <div className="flex justify-center font-medium  ">
                            15
                          </div>
                          <div className="">
                            <Stair />
                          </div>
                        </div>
                      </div>
                      <div className="swap-on flex justify-center items-center mt-4 text-primary ">
                        <div className="stack   items-center">
                          <div className="flex justify-center font-medium  ">
                            15
                          </div>
                          <div className="">
                            <StairSelected />
                          </div>
                        </div>
                      </div>
                    </label>
                    <label className="swap">
                      <input type="checkbox" />
                      <div className="swap-off flex justify-center items-center mt-4 ">
                        <div className="stack   items-center">
                          <div className="flex justify-center font-medium  ">
                            16
                          </div>
                          <div className="">
                            <Stair />
                          </div>
                        </div>
                      </div>
                      <div className="swap-on flex justify-center items-center mt-4 text-primary ">
                        <div className="stack   items-center">
                          <div className="flex justify-center font-medium  ">
                            16
                          </div>
                          <div className="">
                            <StairSelected />
                          </div>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className=" w-3/4  border m-4 p-4 rounded-xl flex justify-center">
                    <Stairs />
                  </div>
                  <div className="grid grid-cols-2  w-3/4 mb-8">
                    <div className=" flex justify-center items-center mt-4 ">
                      <div className="stack   items-center">
                        <div className="flex justify-center font-medium text-white">
                          01
                        </div>
                        <div className="">
                          <StairTaken />
                        </div>
                      </div>
                    </div>
                    <div className=" flex justify-center items-center mt-4 ">
                      <div className="stack   items-center">
                        <div className="flex justify-center font-medium text-white">
                          02
                        </div>
                        <div className="">
                          <StairTaken />
                        </div>
                      </div>
                    </div>
                    <div className=" flex justify-center items-center mt-4 ">
                      <div className="stack   items-center">
                        <div className="flex justify-center font-medium text-white">
                          03
                        </div>
                        <div className="">
                          <StairTaken />
                        </div>
                      </div>
                    </div>
                    <div className=" flex justify-center items-center mt-4 ">
                      <div className="stack   items-center">
                        <div className="flex justify-center font-medium text-white">
                          04
                        </div>
                        <div className="">
                          <StairTaken />
                        </div>
                      </div>
                    </div>
                    <div className=" flex justify-center items-center mt-4 ">
                      <div className="stack   items-center">
                        <div className="flex justify-center font-medium text-white">
                          05
                        </div>
                        <div className="">
                          <StairTaken />
                        </div>
                      </div>
                    </div>
                    <div className=" flex justify-center items-center mt-4 ">
                      <div className="stack   items-center">
                        <div className="flex justify-center font-medium text-white">
                          06
                        </div>
                        <div className="">
                          <StairTaken />
                        </div>
                      </div>
                    </div>
                    <div className=" flex justify-center items-center mt-4 ">
                      <div className="stack   items-center">
                        <div className="flex justify-center font-medium text-white">
                          07
                        </div>
                        <div className="">
                          <StairTaken />
                        </div>
                      </div>
                    </div>
                    <div className=" flex justify-center items-center mt-4 ">
                      <div className="stack   items-center">
                        <div className="flex justify-center font-medium text-white">
                          08
                        </div>
                        <div className="">
                          <StairTaken />
                        </div>
                      </div>
                    </div>
                    <div className=" flex justify-center items-center mt-4 ">
                      <div className="stack   items-center">
                        <div className="flex justify-center font-medium text-white">
                          09
                        </div>
                        <div className="">
                          <StairTaken />
                        </div>
                      </div>
                    </div>
                    <div className=" flex justify-center items-center mt-4 ">
                      <div className="stack   items-center">
                        <div className="flex justify-center font-medium text-white">
                          10
                        </div>
                        <div className="">
                          <StairTaken />
                        </div>
                      </div>
                    </div>
                    <div className=" flex justify-center items-center mt-4 ">
                      <div className="stack   items-center">
                        <div className="flex justify-center font-medium text-white">
                          11
                        </div>
                        <div className="">
                          <StairTaken />
                        </div>
                      </div>
                    </div>
                    <div className=" flex justify-center items-center mt-4 ">
                      <div className="stack   items-center">
                        <div className="flex justify-center font-medium text-white">
                          12
                        </div>
                        <div className="">
                          <StairTaken />
                        </div>
                      </div>
                    </div>
                    <div className=" flex justify-center items-center mt-4 ">
                      <div className="stack   items-center">
                        <div className="flex justify-center font-medium text-white">
                          13
                        </div>
                        <div className="">
                          <StairTaken />
                        </div>
                      </div>
                    </div>
                    <div className=" flex justify-center items-center mt-4 ">
                      <div className="stack   items-center">
                        <div className="flex justify-center font-medium text-white">
                          14
                        </div>
                        <div className="">
                          <StairTaken />
                        </div>
                      </div>
                    </div>
                    <div className=" flex justify-center items-center mt-4 ">
                      <div className="stack   items-center">
                        <div className="flex justify-center font-medium text-white">
                          15
                        </div>
                        <div className="">
                          <StairTaken />
                        </div>
                      </div>
                    </div>
                    <div className=" flex justify-center items-center mt-4 ">
                      <div className="stack   items-center">
                        <div className="flex justify-center font-medium text-white">
                          16
                        </div>
                        <div className="">
                          <StairTaken />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="justify-center bg-fixed">
          <div className="grid grid-cols-3 justify-center">
            <div className="flex ">
              <div className="w-5 h-5 border bg-bginput rounded-md mr-4"></div>{' '}
              Libres
            </div>
            <div className="flex ">
              <div className="w-5 h-5 border border-black  bg-bgChipMuted rounded-md mr-4"></div>{' '}
              Ocupados
            </div>
            <div className="flex ">
              <div className="w-5 h-5 border bg-thcolor border-secondary rounded-md mr-4"></div>{' '}
              Seleccionados
            </div>
          </div>

          <div className="bg-white w-full p-4 shadow rounded-xl mt-8">
            <div className="font-medium my-4">ASIENTOS SELECCIONADOS</div>
            <div className="grid grid-cols-2">
              <div className="flex items-center mt-4">
                <div className="flex justify-center items-center rounded-xl border border-primary bg-thcolor w-12 h-12 text-primary font-medium">
                  11
                </div>
                <div className="ml-4">
                  <div className="">Servicio VIP- P1</div>
                  <div className="font-medium">S/.150.0</div>
                </div>
              </div>
              <div className="flex items-center mt-4">
                <div className="flex justify-center items-center rounded-xl border border-primary bg-thcolor w-12 h-12 text-primary font-medium">
                  12
                </div>
                <div className="ml-4">
                  <div className="">Servicio VIP- P1</div>
                  <div className="font-medium">S/.150.0</div>
                </div>
              </div>
              <div className="flex items-center mt-4">
                <div className="flex justify-center items-center rounded-xl border border-primary bg-thcolor w-12 h-12 text-primary font-medium">
                  09
                </div>
                <div className="ml-4">
                  <div className="">Servicio VIP- P1</div>
                  <div className="font-medium">S/.150.0</div>
                </div>
              </div>
              <div className="flex items-center mt-4">
                <div className="flex justify-center items-center rounded-xl border border-primary bg-thcolor w-12 h-12 text-primary font-medium">
                  10
                </div>
                <div className="ml-4">
                  <div className="">Servicio VIP- P1</div>
                  <div className="font-medium">S/.150.0</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2  ">
              <div></div>
              <div className="flex flex-col items-end">
                <div className="">VIAJE DIA</div>
                <div>Subtotal: S/ 620</div>
                <div className="border-t w-full border-black my-2"></div>
                <div className="text-xl font-bold">TOTAL: S/ 620</div>
              </div>
            </div>

            <div className="grid grid-cols-2 mt-8 ">
              <button
                onClick={backPage}
                className="m-2 btn btn-outline hover:bg-primary hover:border-white text-primary normal-case font-medium rounded-xl">
                Atrás
              </button>
              <button
                onClick={nextPage}
                className=" m-2 btn btn-info bg-primary hover:bg-secondary text-white rounded-xl border-white normal-case font-medium">
                Continuar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatingUp;
