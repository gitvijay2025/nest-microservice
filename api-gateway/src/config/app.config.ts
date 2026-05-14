export default () => ({
  port: parseInt(
    process.env.API_GATEWAY_PORT ?? process.env.PORT ?? '3000',
    10,
  ),
  jwt: {
    secret: process.env.JWT_SECRET ?? 'MY_SECRET_KEY',
    expiresIn:
      process.env.API_GATEWAY_JWT_EXPIRES_IN ??
      process.env.JWT_EXPIRES_IN ??
      '1h',
  },
  throttler: {
    ttl: parseInt(process.env.THROTTLE_TTL ?? '60000', 10),
    limit: parseInt(process.env.THROTTLE_LIMIT ?? '10', 10),
  },
  services: {
    auth: {
      host: process.env.AUTH_SERVICE_HOST ?? '127.0.0.1',
      port: parseInt(process.env.AUTH_SERVICE_PORT ?? '4002', 10),
    },
    user: {
      host: process.env.USER_SERVICE_HOST ?? '127.0.0.1',
      port: parseInt(process.env.USER_SERVICE_PORT ?? '3001', 10),
    },
  },
});
