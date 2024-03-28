import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { MessagesModule } from 'src/messages/messages.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [EventsGateway],
  imports:[UsersModule, MessagesModule]
})
export class EventsModule {}
