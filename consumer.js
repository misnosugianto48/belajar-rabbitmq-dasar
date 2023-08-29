const amqp = require('amqplib');

const init = async () => {
  // create connection to server RabbitMQ
  const connection = await amqp.connect(
    'amqps://ygmuncsy:Ji3AXmfHugoSddEavzcxRJNaN-wdPU2z@octopus.rmq3.cloudamqp.com/ygmuncsy'
  );

  const channel = await connection.createChannel();

  const queue = 'BELAJAR-DASAR-RABBITMQ';

  // check if exist queue create queue
  await channel.assertQueue(queue, {
    durable: true,
  });

  // use consume
  channel.consume(
    queue,
    (message) => {
      console.log(
        `Menerima pesan dari queue ${queue}: ${message.content.toString()}`
      );
    },
    { noAck: true }
  );
};

init();
