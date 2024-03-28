import { Column, DataType, HasMany, Model,  Table } from "sequelize-typescript";
import { Message } from "src/messages/messages.model";

interface UserCreationAttributes{
    name: string,
    password: string
}

@Table({tableName:'users'})
export class User extends Model<User,UserCreationAttributes>{
    @Column({type:DataType.INTEGER, unique:true, autoIncrement:true, primaryKey:true})
    id:number

    @Column({type:DataType.STRING, unique:true, allowNull:false})
    name:string

    @Column({type:DataType.STRING, allowNull:false})
    password:string

    @HasMany(()=> Message)
    messages: Message[]
}