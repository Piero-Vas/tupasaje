import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import z from 'zod';

export type LoginFormDataValues = {
  username: string;
  password: string;
};

export const LoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const useLoginForm = () => {
  return useForm<LoginFormDataValues>({
    resolver: zodResolver(LoginSchema),
  });
};
