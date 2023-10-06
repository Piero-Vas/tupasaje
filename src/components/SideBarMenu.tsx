'use client';

import {useEffect, useState} from 'react';
import IconCompanies from '@/assets/svg/apartment.svg';
import {FaAngleLeft} from 'react-icons/fa6';
import Cookies from 'js-cookie';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import Image from 'next/image';
import AvatarImage from '@/assets/img/loginbg.png';
import {TuPasajeIcon} from './icon/TuPasajeIcon';
import {TicketSaleIcon} from './icon/TicketSaleIcon';
import {ShippingIcon} from './icon/ShippingIcon';
import {CheckOutIcon} from './icon/CheckOutIcon';
import {HistoryIcon} from './icon/HistoryIcon';
import {ManagementIcon} from './icon/ManagementIcon';
import {SupportIcon} from './icon/SupportIcon';
import {cn} from '@/utils/cn';
import {ArrowRightIcon} from './icon/ArrowRightIcon';

// TODO: reemplazar luego
const NAV_ITEMS = [
  {
    title: 'Venta de tickets',
    Icon: TicketSaleIcon,
    link: '/ticket-sales',
    children: null,
  },
  {
    title: 'Envíos',
    Icon: ShippingIcon,
    link: '/envios',
    children: null,
  },
  {
    title: 'Caja',
    Icon: CheckOutIcon,
    link: '/checkout',
    children: null,
  },
  {
    title: 'Historial',
    Icon: HistoryIcon,
    link: '/dashboard',
    children: [
      {
        title: 'Pasajes',
        link: '/ticket-history',
      },
      {
        title: 'Reservas',
        link: '/booking-admin',
      },
    ],
  },
  {
    title: 'Administración',
    Icon: ManagementIcon,
    link: '/dashboard',
    children: [
      {
        title: 'Empresas',
        link: '/companies',
      },
      {
        title: 'Ciudades',
        link: '/city',
      },
      {
        title: 'Oficinas',
        link: '/office',
      },
      {
        title: 'Rutas',
        link: '/route',
      },
      {
        title: 'Itinerarios',
        link: '/itinerary-admin',
      },
      {
        title: 'Buses',
        link: '/bus',
      },
      {
        title: 'Pasajeros',
        link: '/passengers',
      },
      // {
      //   title: 'Tripulación',
      //   link: '/crew',
      // },
      // {
      //   title: 'Usuarios',
      //   link: '/users',
      // },
    ],
  },
  {
    title: 'Soporte',
    Icon: SupportIcon,
    link: '/support',
    children: null,
  },
];

const fetchMenuItems = async (): Promise<MenuItem[]> => {
  let cooktoken = Cookies.get('token');
  // console.log(cooktoken);
  let menuItem = [];

  try {
    let params = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${cooktoken}`,
        'Content-Type': 'application/json',
      },
    };
    const check = await fetch(`${process.env.API_URL}/user/check`, params);
    const query = await check.json();
    menuItem = query['menu_items'];
    console.log('menuItem', menuItem);
  } catch (error) {
    console.log(error);
  }

  // Dummy response for testing purposes
  const dummyResponse: MenuItem[] = menuItem;

  // Simulating API call delay with setTimeout
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(dummyResponse);
    }, 1000);
  });
};

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    // Fetch menu items from the database
    fetchMenuItems().then(data => {
      setMenuItems(data);
    });
  }, []);

  const renderMenuItems = (items: MenuItem[], parentId: number | null) => {
    const filteredItems = items.filter(item => item.parent === parentId);

    if (filteredItems.length === 0) {
      return null;
    }

    return (
      <ul className="space-y-1">
        {filteredItems.map(menuItem => (
          <NavItem
            key={menuItem.id}
            text={menuItem.title}
            link={menuItem.link}
            icon={menuItem.icon}>
            {renderMenuItems(items, menuItem.id)}
          </NavItem>
        ))}
      </ul>
    );
  };

  return (
    <div
      className={cn(
        'fixed top-0 left-0 bottom-0 z-50 flex',
        'w-12 hover:w-64',
        'bg-primary text-white',
        'transition-all duration-300',
        'overflow-y-auto overflow-x-hidden',
        'p-1',
      )}>
      <div className="flex flex-col flex-grow justify-between">
        <div className="">
          <Link href="/dashboard">
            <TuPasajeIcon />
          </Link>
        </div>

        {/** Items */}
        <ul className="flex flex-col gap-2 justify-center">
          {NAV_ITEMS.map(({Icon, title, children, link}, key) => {
            const hasChildren = !!children;

            return (
              <li key={`nav-item-${key}`} className="relative group">
                <Link
                  href={link}
                  className={cn(
                    'flex items-center justify-between transition-colors',
                    'rounded-xl group',
                    'hover:bg-bgPrimaryLinkHover',
                  )}>
                  <div className="inline-flex items-center gap-2">
                    <div className="p-[7px] rounded-xl transition-colors group-hover:bg-bgSideBarIconHover">
                      <Icon />
                    </div>

                    <span className="text-sm text-white">{title}</span>
                  </div>

                  {hasChildren ? <ArrowRightIcon className="mr-4" /> : null}
                </Link>

                {hasChildren ? (
                  <div className="mt-2 space-y-2">
                    {children.map(({link, title}, key) => (
                      <div key={key} className="hidden group-hover:block ml-10">
                        <Link
                          href={link}
                          className="block bg-white/10 rounded-xl px-4 py-2 transition-colors hover:bg-white/20">
                          {title}
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>

        {/** Avatar */}
        <div>
          <div className="avatar">
            <div className="w-8 rounded-full ring ring-primary ring-offset-base-2 ring-offset-1 cursor-pointer">
              <Image
                src={AvatarImage}
                alt="TuPasaje Avatar"
                width={30}
                height={30}
                className="h-9 w-9"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="-translate-x-full transition-all duration-300 transform fixed top-0 left-0 bottom-0 z-[60] w-64 pt-7 pb-10 overflow-y-auto scrollbar-y lg:block lg:translate-x-0 lg:right-auto lg:bottom-0 bg-primary text-white hidden">
      <div className="flex h-full flex-col">
        <div className="px-6">
          <Link
            className="flex-none text-4xl italic font-black mb-5"
            href="/dashboard">
            TuPasaje
          </Link>
        </div>

        <nav className="p-6 w-full flex flex-col flex-wrap flex-grow justify-center">
          {renderMenuItems(menuItems, null)}
        </nav>

        <div className=" flex justify-center mx-auto mt-10">
          <button className="btn btn-circle btn-outline text-white hover:bg-tertiary hover:border-transparent">
            <FaAngleLeft />
          </button>
        </div>
      </div>
    </div>
  );
};

interface MenuItem {
  id: number;
  parent?: number | null;
  title: string;
  icon: string;
  link: string;
  order: number;
}

interface NavItemProps {
  text: string;
  link: string;
  icon: string;
  children?: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({text, link, icon, children}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="">
      <Link
        href={`/${link}`}
        className="mx-4 mb-4 rounded-br11 text-sm font-book bg-primary hover:bg-secondary flex items-center">
        <li className="flex items-center space-x-2">
          <IconCompanies
            className={`bg-tertiary p-1 mr-2 rounded-br11 ${icon}`}
          />
          {isExpanded ? <div className="ml-4">{children}</div> : null}
        </li>
        <span>{text}</span>
      </Link>
    </div>
  );
};

export default Sidebar;