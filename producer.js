const amqp = require('amqplib');

const init = async () => {
  // create connection to server RabbitMQ
  const connection = await amqp.connect(
    'amqps://ygmuncsy:Ji3AXmfHugoSddEavzcxRJNaN-wdPU2z@octopus.rmq3.cloudamqp.com/ygmuncsy'
  );

  const channel = await connection.createChannel();

  const queue = 'BELAJAR-DASAR-RABBITMQ';
  const message = 'Selamat dan semangat belajar message broker!';

  // check if exist queue create queue
  await channel.assertQueue(queue, {
    durable: true,
  });

  // send message
  await channel.sendToQueue(queue, Buffer.from(message));
  console.log('Pesan berhasil terkirim!');

  // best practice after send message. always close connection to bring space.
  setTimeout(() => {
    connection.close();
  }, 1000);
};

init();
