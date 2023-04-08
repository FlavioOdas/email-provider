// create a EmailGateway for websocket
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { EmailDocument } from './emails.schema';

@WebSocketGateway({ cors: true })
export class EmailsGateway {
  @WebSocketServer() server: Server;

  async handleNewEmail(email: EmailDocument) {
    this.server.emit('newEmail', email);
  }
}
