import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma.service';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();
  app.useStaticAssets(join(__dirname, '..', 'static'));
  app.setBaseViewsDir(join(process.cwd(), 'views'));

  app.setViewEngine('ejs');

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  await app.listen(3000);
}
void bootstrap();
