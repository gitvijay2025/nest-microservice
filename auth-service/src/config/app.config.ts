export default () => ({
  microservice: {
    host: process.env.AUTH_SERVICE_HOST ?? process.env.HOST ?? '127.0.0.1',
    port: parseInt(
      process.env.AUTH_SERVICE_PORT ?? process.env.PORT ?? '4002',
      10,
    ),
  },
  jwt: {
    secret: process.env.JWT_SECRET ?? 'MY_SECRET_KEY',
    expiresIn:
      process.env.AUTH_JWT_EXPIRES_IN ?? process.env.JWT_EXPIRES_IN ?? '1d',
  },
});
