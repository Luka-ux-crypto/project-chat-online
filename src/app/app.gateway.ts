/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Prisma } from '@prisma/client';
import { AppService } from 'src/app.service';

@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly appService: AppService) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    client: Socket,
    payload: Prisma.ChatCreateInput,
  ): Promise<void> {
    await this.appService.createMessage(payload); // Исправлена опечатка "createMassage"
    this.server.emit('recMessage', payload);
  }

  afterInit(server: Server) {
    console.log('WebSocket server initialized');
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }
}
