import { Controller, Get, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/chat')
  @Render('index')
  Home(): object {
    return {};
  }

  @Get('/api/chat')
  async getMessage(@Res() res: Response) {
    try {
      const messages = await this.appService.getMessages();
      res.json(messages);
    } catch (error) {
      console.error('Ошибка получения сообщений:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
}
