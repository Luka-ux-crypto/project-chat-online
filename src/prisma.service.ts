/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/require-await */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { INestApplication } from '@nestjs/common';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  [x: string]: any;

  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    // Убираем использование $on('beforeExit') и заменяем его на процесс завершения
    process.on('exit', async () => {
      await this.$disconnect(); // Отключаем Prisma перед завершением приложения
      await app.close(); // Закрываем NestJS приложение
    });

    // Также, можно добавить обработку SIGINT (например, при Ctrl+C)
    process.on('SIGINT', async () => {
      await this.$disconnect();
      await app.close();
      process.exit(0); // Завершаем процесс корректно
    });

    // Обработчик для других ситуаций завершения процесса, таких как SIGTERM
    process.on('SIGTERM', async () => {
      await this.$disconnect();
      await app.close();
      process.exit(0);
    });
  }
}
