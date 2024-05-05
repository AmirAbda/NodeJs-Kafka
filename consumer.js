import { Kafka } from "kafkajs";

const kafka = new Kafka({
  // Set the client ID to identify this consumer in the Kafka cluster
  clientId: "my-consumer",

  // Specify the Kafka brokers to connect to, typically a list of host:port pairs
  brokers: ["localhost:9092"],

  // Disable logging (optional, set to a higher level for debugging if needed)
  logLevel: 0,
});

const consumer = kafka.consumer({
  // Set the consumer group ID to identify a group of cooperating consumers
  groupId: "my-group",
});

const consume = async () => {
  try {
    // Connect to the Kafka cluster
    await consumer.connect();

    // Subscribe to the "my-topic" topic, starting from the beginning (all messages)
    await consumer.subscribe({
      topic: "my-topic",
      fromBeginning: true,
    });

    // Start consuming messages in an infinite loop (can be modified with conditions)
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        // Process the received message
        const messageValue = message.value.toString(); // Convert message value to string
        console.log(`Received message on topic "${topic}" (partition ${partition}): ${messageValue}`);
      },
    });
  } catch (error) {
    console.error("Error consuming message:", error);
  }
};

// Start consuming messages
consume().catch(console.error);
