import { Injectable } from '@nestjs/common';
import { Message } from './messages.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateMessageDto } from './dto/create-message.dto';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class MessagesService {
    constructor(
        private readonly usersService : UsersService,
        @InjectModel(Message) private messageModel: typeof Message
    ){}

    async create(dto:CreateMessageDto){
        const user = await this.usersService.findOne(dto.userId);
        dto.userName = user.name;
        return await this.messageModel.create(dto) 
    }

    async findAll(): Promise<Message[]> {
        return this.messageModel.findAll();
    }
    
    async findOne(id: number): Promise<Message> {
        return this.messageModel.findOne({
          where: {
            id,
          },
        });
    }
    async remove(id: number): Promise<void> {
        const user = await this.findOne(id);
        await user.destroy();
    }
}
