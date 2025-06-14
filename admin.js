import { kafka } from './client.js';

const admin = kafka.admin();

async function main() {
    console.log('Connecting to Kafka');
    await admin.connect();
    console.log('Connected to Kafka');

    console.log('Creating topics');
    await admin.createTopics({
        topics: [{ topic: 'rider_updates', numPartitions: 2 }]
    })
    console.log('Topics created');
    await admin.disconnect();
    console.log('Disconnected from Kafka');
}

main();
