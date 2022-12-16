import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ServerKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor() {
    super({
      client: {
        clientId: 'notifications',
        brokers: ['fair-sunbird-14168-us1-kafka.upstash.io:9092'],
        sasl: {
          mechanism: 'scram-sha-256',
          username:
            'ZmFpci1zdW5iaXJkLTE0MTY4JKpf4LPdNtnKYJwZ6rNoO93ibfcP9okNVM3OSS0',
          password:
            '_3mstPMWQ85e_UIAVu408zplMgb2p5Lv7RW8DGWk-ko_iHA_8eyoiz07g9wYwSexFiBnhg==',
        },
        ssl: true,
      },
    });
  }

  async onModuleDestroy() {
    await this.close();
  }
}
