import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentsModule } from './payments/payments.module';
import * as dotenv from 'dotenv';
import { RawBodyMiddleware } from './payments/payments.middleware';
dotenv.config();

console.log('AppModule');

@Module({
  imports: [PaymentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RawBodyMiddleware).forRoutes('payments');
  }
}
