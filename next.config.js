/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: 'http://3.14.43.44:4567',
    TOKEN:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNodXJybyIsInN1YiI6MSwiaWF0IjoxNjg3Mzg1OTkyLCJleHAiOjE2ODczODk1OTJ9.2WVyVKpRpN7qrvvIvMGsVHGDm9h2Yn7RL0ndMypfCQE',
    HOUR_TOKEN: 1, //Expresado en horas
  },
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

module.exports = nextConfig;
