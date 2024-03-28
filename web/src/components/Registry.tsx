import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react"
import {  UserDTO } from "../types/types";
import { storage } from "../utils/storage";

export const Registry = () => {

    const name = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const [users, setUsers] = useState<UserDTO[]>([]); 

    const getUser = useCallback(async() => {
        const resp = await axios.get<UserDTO[]>('http://localhost:3001/api/users')
        setUsers(resp.data);
    },[])

    

    useEffect(()=>{
        getUser()
    },[users])

    const onUserAdd =  useCallback(async()=>{
        if(name.current && password.current){
            const user = {
                name: name.current.value,
                password: name.current.value
            } as UserDTO
            storage.set(user);
            await axios.post('http://localhost:3001/api/users', {
                name: name.current.value,
                password: password.current.value
            });
            name.current.value = ''
            password.current.value = ''
            location.reload();
        }
    },[])

    return (
        <>
            {/* <div>{JSON.stringify(users)}</div> */}
            <div style={{textAlign:'center'}}>
            <h1>Регистрация</h1>
                <h2>Имя</h2>
                <input type="text" ref={name}/>
                <h2>Пароль</h2>
                <input type="text" ref={password}/>
                <h2></h2>
                <button onClick={onUserAdd}>Войти</button>
            </div>
        </>
    )
}