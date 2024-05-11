import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server } from 'socket.io';

@WebSocketGateway()
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(ChatGateway.name);

  @WebSocketServer() io: Server;

  handleDisconnect(client: any) {
    this.logger.debug(`Client was disconnected: ${client.id}`);
  }

  handleConnection(client: any, ...args: any[]) {
    const { sockets } = this.io.sockets;

    this.logger.log(`Client id: ${client.id} connected with args: ${args}`);
    this.logger.debug(`Number of connected clients: ${sockets.size}`);
  }

  afterInit(server: any) {
    this.logger.log(`Server Initialized: ${server}`);
  }

  @SubscribeMessage('ping')
  handleMessage(client: any, payload: any) {
    this.logger.log(`Message recieved from client: ${client.id}`);
    this.logger.debug(`Payload: ${payload}`);
    return {
      event: 'pong',
      data: 'Testing ping pong on websockets',
    };
  }
}
