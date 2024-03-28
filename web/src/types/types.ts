export type UserDTO = {
    name:string
    password:string
}

export type MessageDTO = {
    content:string
    userId:number
}

export type User = {
    id:number,
    name:string,
    password:string,
    createdAt:string,
    updatedAt:string,
}

export type Message = {
    id:number,
    content:string,
    userId:number,
    userName:string,
    createdAt:string,
    updatedAt:string,
}