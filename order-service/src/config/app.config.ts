export default () => ({
  port: parseInt(
    process.env.ORDER_SERVICE_PORT ?? process.env.PORT ?? '3003',
    10,
  ),
});
