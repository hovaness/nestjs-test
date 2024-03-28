import { MinLength, IsNotEmpty} from 'class-validator';

export class CreateUserDto{
    @IsNotEmpty()
    readonly name:string;
    @MinLength(6, {
        message:'Password too short'
    })
    @IsNotEmpty()
    readonly password:string;
}

