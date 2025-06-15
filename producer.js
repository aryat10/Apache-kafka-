import { kafka } from './client.js';

async function init() {
    const producer = kafka.producer();

    console.log('Connecting producer to Kafka');
    await producer.connect();
    console.log('Producer connected to Kafka');

    const riderUpdate = {
        name: 'Sumit Yadav',
        phone: '+919876543210',
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    await producer.send({
        topic: 'rider-updates',
        messages: [
            {
                key: 'rider1',
                value: JSON.stringify(riderUpdate), // ✅ send as a single JSON string
            },
        ],
    });

    console.log('Message sent to Kafka:', riderUpdate);
    await producer.disconnect();
    console.log('Producer disconnected from Kafka');
}

init().catch(e => {
    console.error(`Error: ${e.message}`);
    process.exit(1);
});
