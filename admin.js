import { kafka } from './client.js';

const admin = kafka.admin();

async function main() {
    console.log('Connecting to Kafka');
    await admin.connect();
    console.log('Connected to Kafka');

    const topicName = 'rider_updates';
    console.log('Checking if topic exists');

    const existingTopics = await admin.listTopics();

    if (existingTopics.includes(topicName)) {
        console.log(`Topic "${topicName}" already exists`);
    } else {
        console.log(`Creating topic "${topicName}"`);
        await admin.createTopics({
            topics: [{ topic: topicName, numPartitions: 2 }]
        });
        console.log('Topic created');
    }

    await admin.disconnect();
    console.log('Disconnected from Kafka');
}

main().catch(e => {
    console.error(`Error: ${e.message}`);
    process.exit(1);
});
