// Import the Kafka client library and the DefaultPartitioner
import { Kafka, Partitioners } from "kafkajs";

const kafka = new Kafka({
  // Set the client ID to identify this producer in the Kafka cluster
  clientId: "my-producer",

  // Specify the Kafka brokers to connect to, typically a list of host:port pairs
  brokers: ["localhost:9092"],
});

const producer = kafka.producer({
  // Use the default partitioner to distribute messages across partitions
  createPartitioner: Partitioners.DefaultPartitioner,
});

const produce = async () => {
  try {
    // Connect to the Kafka cluster
    await producer.connect();

    // Send a message to the "my-topic" topic
    await producer.send({
      topic: "my-topic",
      messages: [
        {
          value: "Hello From Producer!", // The message content
        },
      ],
    });

    console.log("Message sent successfully!");
  } catch (error) {
    console.error("Error producing message:", error);
  }
};

// Produce a message every 3 seconds
setInterval(produce, 3000);
