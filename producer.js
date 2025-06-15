import { kafka } from './client.js';

async function init() {
    const producer = kafka.producer();

    console.log('Connecting producer to Kafka');
    await producer.connect();
    console.log('Producer connected to Kafka');

    await producer.send({
        topic: 'rider-updates',
        messages: [
            { key: 'name', value: 'Sumit Yadav' },
            { key: 'phone', value: '+919876543210' },
            { key: 'status', value: 'pending' },
            { key: 'createdAt', value: new Date().toISOString() },
            { key: 'updatedAt', value: new Date().toISOString() },
        ]
    });

    console.log('Message sent to Kafka');
    await producer.disconnect();
    console.log('Producer disconnected from Kafka');
}

init().catch(e => {
    console.error(`Error: ${e.message}`);
    process.exit(1);
});