const config = {
  app: {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
  },
  rabbitMq: {
    server: process.env.RABBITMQ_SERVER,
  },
};

module.exports = config;
