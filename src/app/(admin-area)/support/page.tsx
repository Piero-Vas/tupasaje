import {useId} from 'react';
import Link from 'next/link';
import {BsWhatsapp} from 'react-icons/bs';

const SupportPage: React.FC = () => {
  const uniqueId = useId();

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <h2 className="text-xl font-bold text-primary">Soporte técnico</h2>
      </div>

      <div className="flex flex-1 gap-20 mt-10">
        <div className="flex flex-1 flex-col">
          <div className="bg-white rounded-3xl border-borderPane border-[0.5px] shadow-lg px-8 py-6">
            <h3 className="text-center uppercase text-textMuted font-medium">
              Nuevo mensaje de soporte instantáneo
            </h3>

            <p className="mt-10 text-textMuted/80 text-sm">
              Para ayudarte con dudas, consultas o incidencias respecto al
              sistema, envíanos la siguiente información y te responderemos lo
              antes posible.
            </p>

            <form className="flex mt-10 flex-col gap-4">
              <div className="flex flex-col">
                <label
                  htmlFor={`${uniqueId}-fullname`}
                  className="block mb-2 font-medium text-sm text-textMuted">
                  Nombres y apellidos
                </label>
                <input
                  id={`${uniqueId}-fullname`}
                  type="text"
                  placeholder="Ingresa tu nombre completo"
                  required
                  className="input w-full bg-bgCommonInput rounded-xl"
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label
                    htmlFor={`${uniqueId}-phone`}
                    className="block mb-2 font-medium text-sm text-textMuted">
                    Celular
                  </label>
                  <input
                    id={`${uniqueId}-phone`}
                    type="text"
                    placeholder="Ingresa tu número de celular"
                    required
                    className="input w-full bg-bgCommonInput rounded-xl"
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor={`${uniqueId}-email`}
                    className="block mb-2 font-medium text-sm text-textMuted">
                    Email
                  </label>
                  <input
                    id={`${uniqueId}-email`}
                    type="text"
                    placeholder="Ingresa tu correo electrónico"
                    required
                    className="input w-full bg-bgCommonInput rounded-xl"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor={`${uniqueId}-affair`}
                  className="block mb-2 font-medium text-sm text-textMuted">
                  Asunto
                </label>
                <input
                  id={`${uniqueId}-affair`}
                  type="text"
                  placeholder="Ingresa un título para el ticket"
                  required
                  className="input w-full bg-bgCommonInput rounded-xl"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor={`${uniqueId}-message`}
                  className="block mb-2 font-medium text-sm text-textMuted">
                  Mensaje
                </label>
                <textarea
                  id={`${uniqueId}-message`}
                  placeholder="Por favor, cuéntanos el motivo por el que te estás contactando con nosotros."
                  required
                  className="textarea w-full bg-bgCommonInput rounded-xl max-h-24 h-24"
                />
              </div>

              <button
                type="submit"
                className="btn w-full mt-6 rounded-[20px] bg-primary text-white hover:bg-secondary">
                Enviar
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-1 flex-col">
          <h3 className="text-textMuted uppercase font-medium">
            Contacto con soporte
          </h3>

          <div className="flex mt-6 flex-col">
            <h4 className="text-textMuted text-sm font-medium">
              Horarios de atención
            </h4>

            <div className="flex gap-8 mt-2">
              <div>
                <p className="text-textMuted/80 text-sm uppercase">
                  Lunes a viernes
                </p>
                <p className="text-textMuted/80 text-sm uppercase">
                  sábados y domingos
                </p>
              </div>

              <div>
                <p className="text-textMuted/80 text-sm uppercase">
                  9:00 am - 6:00 pm
                </p>
                <p className="text-textMuted/80 text-sm uppercase">
                  9:00 am - 1:00 pm
                </p>
              </div>
            </div>

            <h4 className="text-textMuted text-sm font-medium mt-6">
              Números de soporte
            </h4>

            <div className="flex gap-8 mt-2">
              <div>
                <p className="text-textMuted/80 text-sm uppercase">celular</p>
                <p className="text-textMuted/80 text-sm uppercase">teléfonos</p>
              </div>

              <div>
                <p className="text-textMuted/80 text-sm uppercase">
                  949 166 576 - 933 698 701
                </p>
                <p className="text-textMuted/80 text-sm uppercase">
                  044 771 682
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <Link
              href="/#"
              target="_blank"
              className="btn bg-bgWhatsApp px-6 py-4 h-auto gap-4 hover:bg-bgWhatsApp text-white rounded-[20px]">
              <BsWhatsapp className="w-8 h-8" />
              ¡escríbenos al whatsapp!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
