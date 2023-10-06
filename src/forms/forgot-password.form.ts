import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import z from 'zod';

export type ForgotPasswordFormDataValues = {
  username: string;
};

export const ForgotPasswordSchema = z.object({
  username: z.string(),
});

export const useForgotPasswordForm = () => {
  return useForm<ForgotPasswordFormDataValues>({
    resolver: zodResolver(ForgotPasswordSchema),
  });
};
