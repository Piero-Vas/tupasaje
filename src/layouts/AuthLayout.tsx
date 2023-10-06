import Image from 'next/image';
import TuPasajeLogo from '@/assets/img/logotupasaje.png';

export const AuthLayout: React.FC<React.PropsWithChildren> = ({children}) => {
  return (
    <div className="flex flex-row items-center md:justify-end justify-center min-h-screen">
      {/* Image Bus */}
      <div className="basis-0 sm:basis-4/6 login min-h-screen"></div>

      {/* Login Form */}
      <div className="basis-1 sm:basis-2/6 p-8 m-8 ">
        <div className="flex justify-center">
          <div className="w-72 md:w-52">
            <Image
              src={TuPasajeLogo}
              width={2500}
              // height={200}
              alt="TuPasaje.pe"
            />
          </div>
        </div>

        {children}
      </div>
    </div>
  );
};
