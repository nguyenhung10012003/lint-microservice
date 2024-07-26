import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { Kafka, ProducerRecord } from 'kafkajs';

@Injectable()
export class ProducerService implements OnApplicationShutdown {
  private readonly kafka = new Kafka({
    brokers: [process.env.KAFKA_URL],
  });
  private readonly producer = this.kafka.producer();
  private isConnected = false;

  async produce(record: ProducerRecord) {
    if (!this.isConnected) {
      await this.producer.connect();
    }
    await this.producer.send(record);
  }

  async onApplicationShutdown() {
    await this.producer.disconnect();
  }
}
