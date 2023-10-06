declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_URL: string;
      TOKEN: string;
      HOUR_TOKEN: number;
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }
}

// eslint-disable-next-line prettier/prettier
export {};
