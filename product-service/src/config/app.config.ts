export default () => ({
  port: parseInt(
    process.env.PRODUCT_SERVICE_PORT ?? process.env.PORT ?? '3002',
    10,
  ),
});
