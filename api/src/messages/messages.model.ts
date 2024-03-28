
import { Column, DataType, Table, Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "src/users/users.model";

interface MessageModelAttributes{
    content:string
    userId:number
}

@Table({tableName:'messages'})
export class Message extends Model<Message, MessageModelAttributes>{
    @Column({type: DataType.INTEGER, primaryKey:true, unique:true, allowNull:false, autoIncrement:true})
    id:number

    @Column({type:DataType.TEXT, allowNull:false})
    content: string

    @ForeignKey(() => User)
    @Column
    userId: number;

    @Column({type: DataType.STRING, allowNull:false})
    userName:string;

    @BelongsTo(() => User)
    user: User;
}