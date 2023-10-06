'use client';

import {SWRConfig} from 'swr';

export const SWRProvider: React.FC<React.PropsWithChildren> = ({children}) => (
  <SWRConfig>{children}</SWRConfig>
);
