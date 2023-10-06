import {z} from 'zod';

export const isValidNumber = (value: unknown) => {
  const schema = z.number().positive();

  try {
    schema.parse(Number(value));
    return true;
  } catch (err) {
    console.log('false', err);
    return false;
  }
};
