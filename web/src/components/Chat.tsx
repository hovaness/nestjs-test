import { useCallback, useEffect, useRef, useState } from "react";
import { useWebSocket } from "../context/WebSocketContext"
import { storage } from "../utils/storage";
import { Message, MessageDTO, User, UserDTO } from "../types/types";
import axios from "axios";
import { Drawer } from "antd";

export const Chat = () =>{
    const user = storage.get() as UserDTO;
    const [dbUser, setDbUser] = useState<User>()
    const mes = useRef<HTMLInputElement>(null);
    const [messages, setMessages] = useState<Message[]>([])
    const socket = useWebSocket();
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const getUserFromDb = useCallback(async(name:string) => {
        const resp = await axios.get<User>(`http://localhost:3001/api/users/${name}`);
        setDbUser(resp.data)
    },[])


    useEffect(()=>{
        getUserFromDb(user.name);
        socket.on('connect',()=>{
            console.log(`${user.name} connected`)
        })

        socket.on('messages',(messages:Message[]) => {
            console.log('messages geted')
            setMessages(messages);
        })

        socket.emit("messages:get");
        
        return () => {
            console.log('Unsubscribing events')
            socket.off('connect');
            socket.off('messages');
        }
    },[])

    const onSubmit = () => {
        if(mes.current){
            socket.emit('message:post', {
                content: mes.current.value,
                userId: dbUser?.id,
            } as MessageDTO)
            mes.current.value = ''
        }
    }


    return(
        <div style={{textAlign:'center' }}>
            <div style={{display:'flex',justifyContent:'space-between', width:800, margin:'auto'}}>
                <p>Вы вошли как <strong>{dbUser?.name}</strong></p>
                <p onClick={showDrawer} style={{textDecoration:'underline', cursor:'pointer'}}>История</p>
                <Drawer style={{color:'black', width:500}} title="История сообщений" onClose={onClose} open={open}>
                {messages.length === 0 ? 'Сообщений нет' : ( 
                    <div>
                        {messages.map((msg)=> 
                            <div key={msg.id} style={{backgroundColor:'#b5b8b1', maxWidth:300, borderRadius:5, marginBottom:15}}>
                                <div style={{padding:5}}>
                                    <p>{msg.userName}</p>
                                    <p>{msg.content}</p>
                                    <p>{msg.createdAt}</p>
                                </div>
                            </div>)}
                    </div>
                )}
                </Drawer>
            </div>
            <h1>Чат</h1>
            <div style={{width:1024, margin:'auto'}}>
                {messages.length === 0 ? 'No messages' : ( 
                    <div>
                        {messages.map((msg)=> 
                        <div key={msg.id}
                            style={msg.userId === dbUser?.id ? {textAlign:'right'} : {textAlign:'left'}}    
                        >
                            <p>{msg.userId === dbUser?.id ? 'Вы' : msg.userName }</p>
                           <p>{msg.content}</p>
                        </div>)}
                    </div>
                )}
            </div>
            <input type="text" ref={mes} style={{width:400, height:20}}/>
            <h2></h2>
            <button onClick={onSubmit}>Отправить</button>
        </div>
    )
}