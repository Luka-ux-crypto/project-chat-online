import { Injectable } from '@nestjs/common';
import { Prisma, Chat } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}
  async createMessage(data: Prisma.ChatCreateInput): Promise<Chat> {
    return await this.prisma.chat.create({ data });
  }
  async getMessages(): Promise<Chat[]> {
    return await this.prisma.chat.findMany();
  }
}
