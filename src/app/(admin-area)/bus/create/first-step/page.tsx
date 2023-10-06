'use client';

import {useId, useState} from 'react';
import Link from 'next/link';
import {useBusForm} from '@/forms/bus.form';
import {useRouter} from 'next/navigation';
import Swal from 'sweetalert2';
import {useAxios} from '@/modules/axios/axios.hook';
import AddImage from '@/assets/svg/addimage.svg';
import {EditPhotoIcon} from '@/components/icon/EditPhotoIcon';
import {DeletePhotoIcon} from '@/components/icon/DeletePhotoIcon';
import {cn} from '@/utils/cn';

type OfficeListResponse = {
  data: {
    offices: {
      id_office: number;
      id_company: number;
      id_city: number;
      office_name: string;
      address: string;
      phone: string;
      id_terminal: null | number;
      latitude: number;
      longitude: number;
      created_at: string;
      updated_at: string;
      deleted_at: string | null;
    }[];
  };
};

const CreateBusFirstPage: React.FC = () => {
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const uniqueId = useId();
  const router = useRouter();
  const {handleSubmit, register, setValue} = useBusForm();
  const [{loading: officeListIsLoading, data: officeListData}] =
    useAxios<OfficeListResponse>('/office/list');
  const [{loading: busIsLoading}, executeCreateBus] = useAxios(
    {
      method: 'POST',
      url: '/buses/create',
    },
    {
      manual: true,
    },
  );
  const [{loading: uploadImageBusIsLoading}, executeUploadBusImage] = useAxios(
    {
      method: 'POST',
      url: '/company/user/upload',
    },
    {
      manual: true,
    },
  );
  const [{loading: configBusSeatsIsLoading}, executeConfigBusSeats] = useAxios(
    {
      method: 'PUT',
      url: '/buses/seats/copy',
    },
    {
      manual: true,
    },
  );
  const isLoading =
    busIsLoading ||
    uploadImageBusIsLoading ||
    configBusSeatsIsLoading ||
    officeListIsLoading;
  const officeList = officeListData?.data?.offices ?? [];

  const onSubmit = handleSubmit(
    async ({
      name,
      brand,
      model,
      licensePlate,
      certificate,
      baseOffice,
      image,
    }) => {
      if (!image || image.length === 0) {
        alert('por favor sube una imagen');
        return;
      }

      const formData = new FormData();
      formData.append('file', image[0]);

      // Upload Image
      try {
        const response = await executeUploadBusImage({
          data: formData,
        });

        console.log(response.data);
      } catch (error) {
        console.log('Error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          timer: 2000,
          text: 'Ocurrió un error inesperado al subir la imagen',
        });
      }

      // Create bus
      try {
        const createdBusResponse = await executeCreateBus({
          data: {
            name,
            brand,
            model,
            license_plate: licensePlate,
            certificate,
            base_office: +baseOffice,
          },
        });

        console.log('createdBusResponse', createdBusResponse.data);

        const newIdBusCreated = createdBusResponse.data.bus.id_bus as number;

        await executeConfigBusSeats({
          data: {
            // por ahora no podemos usar el modelo que viene por params +model, usamos 5
            id_bus_origin: 3,
            id_bus_destination: newIdBusCreated,
          },
        });

        const newUrlParams = new URLSearchParams();
        newUrlParams.append('newBusId', String(newIdBusCreated));

        router.push(`/bus/create/second-step?${newUrlParams.toString()}`);
      } catch (error) {
        console.log('Error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          timer: 2000,
          text: 'Ocurrió un error inesperado al crear un bus',
        });
      }
    },
  );



  return (
    <form className="flex flex-col" onSubmit={onSubmit}>
      {/** Heading */}
      <div className="flex flex-row justify-between">
        <div className="">
          <h2 className="text-xl font-bold text-primary">Nuevo bus</h2>
        </div>
      </div>

      <div className="flex mt-8 gap-4">
        {/** info */}
        <div className="">
          <ul className="steps steps-vertical">
            <li className="step step-primary text-textStepsChecked font-medium">
              Datos generales
            </li>
            <li className="step text-textStepsMuted">Precios base</li>
            <li className="step text-textStepsMuted">Precios por columna</li>
            <li className="step text-textStepsMuted">Precios por asientos</li>
          </ul>
        </div>

        {/** tabla */}
        <div className="flex flex-1">
          <div className="bg-white shadow rounded-[25px] border-[0.5px] border-borderPane flex flex-col flex-1 px-6 py-8">
            <div className="">
              <h3 className="font-medium text-sm text-textMuted uppercase">
                Datos generales
              </h3>
            </div>

            <div className="flex flex-1 gap-10 mt-6">
              <div className="flex flex-1 flex-col">
                <div className="mb-4">
                  <label
                    htmlFor={`${uniqueId}-name-input`}
                    className="block mb-1 font-medium text-sm ">
                    Nombre
                  </label>

                  <input
                    type="text"
                    id={`${uniqueId}-name-input`}
                    className="w-full py-3 px-5 rounded-br11 bg-bginput text-sm text-black"
                    placeholder="Ingresa el nombre"
                    required
                    {...register('name')}
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor={`${uniqueId}-brand-input`}
                    className="block mb-1 font-medium text-sm ">
                    Marca
                  </label>

                  <input
                    type="text"
                    className="w-full py-3 px-5 rounded-br11 bg-bginput text-sm text-black"
                    placeholder="Ingresa el marca"
                    required
                    id={`${uniqueId}-brand-input`}
                    {...register('brand')}
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor={`${uniqueId}-model-select`}
                    className="block mb-1 font-medium text-sm ">
                    Modelo
                  </label>
                  <select
                    id={`${uniqueId}-model-select`}
                    className="select w-full bg-bginput"
                    required
                    {...register('model')}>
                    <option value={1}>Modelo 1</option>
                    <option value={2}>Modelo 2</option>
                    <option value={3}>Modelo 3</option>
                    <option value={4}>Modelo 4</option>
                    <option value={5}>Modelo 5</option>
                    <option value={6}>Modelo 6</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor={`${uniqueId}-plate-input`}
                    className="block mb-1 font-medium text-sm ">
                    Placa
                  </label>

                  <input
                    type="text"
                    className="w-full py-3 px-5 rounded-br11 bg-bginput text-sm text-black"
                    placeholder="Ingresa el número de placa"
                    required
                    id={`${uniqueId}-plate-input`}
                    {...register('licensePlate')}
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor={`${uniqueId}-certificate-input`}
                    className="block mb-1 font-medium text-sm ">
                    Certificado
                  </label>

                  <input
                    type="text"
                    className="w-full py-3 px-5 rounded-br11 bg-bginput text-sm text-black"
                    placeholder="Ingresa el número de certificado"
                    required
                    id={`${uniqueId}-certificate-input`}
                    {...register('certificate')}
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor={`${uniqueId}-office-select`}
                    className="block mb-1 font-medium text-sm ">
                    Oficinas
                  </label>
                  <select
                    id={`${uniqueId}-office-select`}
                    className="select w-full bg-bginput"
                    required
                    {...register('baseOffice')}>
                    <option>Seleccionar Oficina</option>

                    {officeList.map(({id_office, office_name}, key) => (
                      <option key={key.toString()} value={id_office}>
                        {office_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-1 flex-col">
                <div className="mb-4">
                  <label className="block mb-1 font-medium text-sm">Foto</label>

                  {selectedFileName ? (
                    <div className="flex justify-between items-center my-6">
                      <p className="truncate">{selectedFileName}</p>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="btn bg-bgblack hover:bg-bgblack/90 rounded-xl"
                          onClick={() => {
                            // @ts-ignore
                            window['dropzone-file'].click();
                          }}>
                          <EditPhotoIcon />
                        </button>

                        <button
                          type="button"
                          className="btn bg-transparent border border-bgblack rounded-xl"
                          onClick={() => {
                            setBackgroundImage(null);
                            setSelectedFileName(null);
                            setValue('image', null);
                          }}>
                          <DeletePhotoIcon />
                        </button>
                      </div>
                    </div>
                  ) : null}

                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file"
                      className={cn(
                        'flex bg-cover bg-no-repeat bg-center flex-col items-center justify-center w-9/12 h-[20rem] cursor-pointer rounded-lg overflow-hidden',
                        !backgroundImage
                          ? 'border border-dashed border-gray-200'
                          : '',
                      )}
                      style={{
                        backgroundImage: backgroundImage ?? undefined,
                      }}>
                      <div className="flex flex-1">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          {!selectedFileName ? (
                            <>
                              <AddImage className="mb-4" />

                              <p
                                className={cn(
                                  'text-center w-8/12 text-sm',
                                  backgroundImage
                                    ? 'text-white'
                                    : 'text-gray-500',
                                )}>
                                <span className="font-semibold">
                                  Arrastra y suelta
                                </span>{' '}
                                una imagen aquí o haz clic para buscar en tu
                                computadora
                              </p>
                            </>
                          ) : null}
                        </div>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        accept=".png, .jpg, .jpeg"
                        {...register('image', {
                          onChange(event) {
                            const file = event.target.files[0];
                            if (file) {
                              setSelectedFileName(file.name);
                              const reader = new FileReader();
                              reader.onload = e => {
                                setBackgroundImage(`url(${e.target?.result})`);
                              };
                              reader.readAsDataURL(file);
                            }
                          },
                        })}
                      />
                    </label>
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
            href="/bus">
            Cancelar
          </Link>

          <button
            type="submit"
            disabled={isLoading}
            className="btn rounded-[14px] bg-primary text-white hover:bg-secondary">
            {isLoading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              'Continuar'
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateBusFirstPage;
