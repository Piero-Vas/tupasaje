import '@/styles/globals.css';
import type {Metadata} from 'next';
import localFont from 'next/font/local';
import {SWRProvider} from '@/modules/swr/swr.provider';
import {Providers} from '@/redux/providers'
const gotham = localFont({
  src: [
    {
      path: '../fonts/Gotham-Book.woff2',
      weight: '400',
      style: 'book',
    },
    {
      path: '../fonts/Gotham-Medium.woff2',
      weight: '500',
      style: 'medium',
    },
    {
      path: '../fonts/Gotham-Bold.woff2',
      weight: '700',
      style: 'bold',
    },
    {
      path: '../fonts/Gotham-Black.woff2',
      weight: '900',
      style: 'black',
    },
  ],
});

export const metadata: Metadata = {
  title: 'TuPasaje',
  description: 'TuPasaje',
};

const RootLayout: React.FC<React.PropsWithChildren> = ({children}) => (
  <SWRProvider>
    <html lang="es-PE" data-theme="light">
      <body className={gotham.className}>
        <Providers>
        {children}
        </Providers>
        </body>
    </html>
  </SWRProvider>
);

export default RootLayout;
