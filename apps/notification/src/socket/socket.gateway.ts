import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from './jwt.payload';
import { OnEvent } from '@nestjs/event-emitter';
import { Notification } from '@app/common/types/notification';

@WebSocketGateway({ cors: true })
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  async afterInit() {
    console.log('WebSocket server initialized');
  }

  async handleConnection(client: Socket) {
    const authHeader = client.handshake.headers.authorization;

    if (!authHeader) {
      client.disconnect(true);
      return;
    }

    const token = authHeader.split(' ')[1];
    let payload: JwtPayload;

    try {
      payload = jwt.verify(
        token,
        process.env.JWT_ACCESS_TOKEN_SECRET,
      ) as JwtPayload;
      console.log(payload);
    } catch (error) {
      client.disconnect(true);
      return;
    }

    client.data.userId = payload.sub;
    client.join(`user_${payload.sub}`);
    console.log(client.rooms);

    console.log(`Client ${client.id} connected`);
  }

  async handleDisconnect(client: Socket) {
    console.log(`Client ${client.id} disconnected`);
  }

  @OnEvent('send-notification')
  handleOrderCreatedEvent(notification: Notification) {
    console.log('new notification');
    this.server.to(`user_${notification.userId}`).emit('new-notification', {
      message: 'new notification',
      data: notification,
    });
  }
}
