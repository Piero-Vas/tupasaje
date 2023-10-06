'use client';

import Link from 'next/link';
import SidebarMenu from '@/components/SideBarMenu';
import Image from 'next/image';
import AvatarImage from '@/assets/img/loginbg.png';
import {useRouter, usePathname} from 'next/navigation';
import Cookies from 'js-cookie';
import {cn} from '@/utils/cn';
import {TuPasajeIcon} from '@/components/icon/TuPasajeIcon';

const NO_PADDING_PAGES = ['/checkout/search', '/ticket-sales/seatingup','/passengers/1'];

const AdminLayout: React.FC<React.PropsWithChildren> = ({children}) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    Cookies.remove('token');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-appLayout">
      {/** HEADER */}
      <header className="sticky top-0 inset-x-0 flex items-center flex-wrap sm:justify-start sm:flex-nowrap z-40 w-full bg-white border-[0.5px] border-borderLayout text-sm py-2.5 sm:py-4 lg:pl-64">
        <nav className="flex basis-full items-center w-full mx-auto px-4 sm:px-6 md:px-8">
          <div className="lg:hidden">
            <Link className="flex-none text-xl font-semibold" href="/dashboard">
              <TuPasajeIcon />
            </Link>
          </div>

          <div className="w-full flex items-center justify-end ml-auto sm:gap-x-3 sm:order-3">
            <div className="flex flex-row items-center justify-end gap-2">
              <div className="dropdown dropdown-end">
                <div className="avatar" tabIndex={0}>
                  <div className="rounded-full ring ring-primary ring-offset-base-2 ring-offset-1 cursor-pointer">
                    <Image
                      alt="TuPasaje Avatar"
                      src={AvatarImage}
                      width={36}
                      height={36}
                      className="h-9 w-9"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li>
                    <button
                      onClick={() => {
                        handleLogout();
                      }}>
                      Salir
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/** Sidebar */}
      <SidebarMenu />

      {/** Main Content */}
      <div
        className={cn(
          'w-full min-h-screen',
          NO_PADDING_PAGES.includes(pathname)
            ? 'lg:pl-12'
            : 'pt-10 px-8 pl-[5.5rem]',
        )}>
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
