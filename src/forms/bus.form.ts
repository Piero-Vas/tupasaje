import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import z from 'zod';

export type BusFormDataValues = {
  name: string;
  brand: string;
  model: string;
  licensePlate: string;
  certificate: string;
  baseOffice: string;
  image: any;
};

export const BusSchema = z.object({
  name: z.string(),
  brand: z.string(),
  model: z.string(),
  licensePlate: z.string(),
  certificate: z.string(),
  baseOffice: z.string(),
  image: z.any(),
});

export const useBusForm = () => {
  return useForm<BusFormDataValues>({
    resolver: zodResolver(BusSchema),
  });
};
