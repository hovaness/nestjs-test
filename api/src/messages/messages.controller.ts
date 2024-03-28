import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('messages')
export class MessagesController {
    constructor(private messagesService: MessagesService) {}

    @Post()
    create(@Body() userDto: CreateMessageDto) {
      return this.messagesService.create(userDto);
    }
  
    @Get()
    getAll() {
      return this.messagesService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id:number){
      return this.messagesService.findOne(id);
    }
  
    @Delete(':id')
    delete(@Param('id') id:number) {
      return this.messagesService.remove(id);
    }
}
