export default () => ({
  microservice: {
    host: process.env.USER_SERVICE_HOST ?? process.env.HOST ?? '127.0.0.1',
    port: parseInt(
      process.env.USER_SERVICE_PORT ?? process.env.PORT ?? '3001',
      10,
    ),
  },
});
