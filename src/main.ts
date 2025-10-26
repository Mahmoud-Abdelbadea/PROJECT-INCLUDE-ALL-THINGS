import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';
// const p = Promise.resolve(new Date()).then((res) => {console.log(res.toISOString())});
// console.log(p);
// console.log(new Date().getTimezoneOffset());
// console.log(new Date().toLocaleString('en-US', { timeZone: 'UTC' }));
// console.log(new Date().toLocaleString());
// console.log(new Date().toISOString());
// console.log(new Date().toLocaleDateString());
// console.log(new Date().toLocaleTimeString());
// console.log(new Date().toLocaleString('en-US', { timeZone: 'Asia/Shanghai' }));
// console.log(new Date().toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }));
// console.log(new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
// console.log(new Date().toLocaleString('en-US', { timeZone: 'Asia/Taipei' }));
// console.log(new Date().toLocaleString('en-US', { timeZone: 'Asia/Hong_Kong' }));
// console.log(new Date().toLocaleString('en-US', { timeZone: 'Asia/Singapore' }));
// console.log(new Date().toLocaleString('en-US', { timeZone: 'Asia/Bangkok' }));
console.log(new Date().getHours());

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configure JSON middleware to preserve raw body for webhook routes
  app.use(
    json({
      limit: '10mb',
      verify: (req, res, buf) => {
        // Only preserve raw body for webhook routes
        if (req.url?.startsWith('/payments/webhook')) {
          req['rawBody'] = buf;
        }
      },
    }),
  );

  app.use(urlencoded({ extended: true, limit: '10mb' }));
  // console.log('app',app);
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
