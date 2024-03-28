import { OnModuleInit } from '@nestjs/common';
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import {Server, Socket} from 'socket.io'
import { CreateMessageDto } from 'src/messages/dto/create-message.dto';
import { MessagesService } from 'src/messages/messages.service';
import { UsersService } from 'src/users/users.service';

@WebSocketGateway({
  cors:{
    origin: ['http://localhost:5173']
  },
  namespace:'chat'
})
export class EventsGateway implements OnModuleInit{
  constructor(
    // private readonly usersService : UsersService,
    private readonly messagesService: MessagesService
  ){}

  @WebSocketServer() server:Server

  onModuleInit() {
    this.server.on('connection', (socket) => console.log(socket.id))
  }
  
  afterInit(server:Server){
    console.log(server)
  }

  @SubscribeMessage('messages:get')
  async handleMessagesGet(){
    const messages = await this.messagesService.findAll();
    this.server.emit('messages', messages); 
  }

  @SubscribeMessage('message:post')
  async handleMessagePost(
    @MessageBody() payload:CreateMessageDto
  ){
    const created = await this.messagesService.create(payload);
    this.server.emit('message:post',created);
    this.handleMessagesGet();
  }
}
