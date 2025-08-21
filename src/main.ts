import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  app.enableCors({
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.setGlobalPrefix('api');

  await app.listen(3000);
}

bootstrap()
  .then(() => console.log('Application is running on http://localhost:3000'))
  .catch((err: string) => {
    console.error('Application failed to start', err);
    process.exit(1);
  });
