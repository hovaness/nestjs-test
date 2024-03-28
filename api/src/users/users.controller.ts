import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.create(userDto);
  }

  @Get()
  getAll() {
    return this.usersService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name:string){
    return this.usersService.findByName(name);
  }

  @Get(':id')
  findById(@Param('id') id:number) {
    return this.usersService.findOne(id);
  }
}
