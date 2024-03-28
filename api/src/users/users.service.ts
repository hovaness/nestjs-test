import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User
    ){}

    async create(dto:CreateUserDto){
        const user = await this.userModel.findOne({
            where:{
                name: dto.name
            }
        })
        if(user) throw new BadRequestException('This user already exist')

        const hash = await bcrypt.hash(dto.password, 5);
        return await this.userModel.create(
            {
                name:dto.name,
                password: hash
            }
        )
    }

    async findAll(): Promise<User[]> {
        return this.userModel.findAll();
    }
    
    async findOne(id: number): Promise<User> {
        return await this.userModel.findOne({
          where: {
            id,
          },
        });
    }

    async findByName(name:string): Promise<User> {
        return this.userModel.findOne({
            where: {
                name: name,
            }
        })
    }
    
    async remove(id: number): Promise<void> {
        const user = await this.findOne(id);
        await user.destroy();
    }
}
