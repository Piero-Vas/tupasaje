import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import z from 'zod';

export type BoxFormDataValues = {
  id_cashier_box: number;
  amount: string;
};

export const BoxSchema = z.object({
  id_cashier_box: z.number(),
  amount: z.string(),
});

export const useBoxForm = () => {
  return useForm<BoxFormDataValues>({
    resolver: zodResolver(BoxSchema),
  });
};
