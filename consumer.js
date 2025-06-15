import { kafka } from './client.js';

const consumer = kafka.consumer({ groupId: 'rider-updates-consumer' });

async function init() {
    console.log('Connecting consumer to Kafka');
    await consumer.connect();
    console.log('Consumer connected to Kafka');

    await consumer.subscribe({ topic: 'rider-updates', fromBeginning: true });
    console.log('Consumer subscribed to rider-updates topic');

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                partition,
                offset: message.offset,
                value: message.value.toString(),
            });
        },
    });
}

init().catch(e => {
    console.error(`Error: ${e.message}`);
    process.exit(1);
});