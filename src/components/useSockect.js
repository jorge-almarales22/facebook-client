import socketIOClient from 'socket.io-client';
import { useEffect, useRef, useState } from "react";
import { getAllPostsThunk } from '../thunks/posts.thunks';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";

export const useSockect = () => {

    const user = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    let socket = socketIOClient('http://localhost:8000');

    
    useEffect(() => {
        socket = socketIOClient('http://localhost:8000'); // La URL debe apuntar a tu servidor
        //Verificando conexion con el socket server
        socket.on('connect', () => {
          console.log('Conectado al servidor de Socket.IO');
        });
    
        if(user.id){
          socket.emit('update-key', user.id);
        }
    
        //escuchando evento cuando se sube un post
        socket.on('uploaded_post', (payload) => {
          dispatch(getAllPostsThunk(user.id))
        });
    
        socket.on('notify-request', (payload) => {

            try {
                
                document.querySelector('.alert').innerHTML = `You have a new friend request from ${payload.name}`;
                document.querySelector('.alert').classList.remove("d-none");
                setTimeout(() => {
                  document.querySelector('.alert').classList.add("d-none");
                }, 3000);
                document.querySelector('.notification').classList.add('text-danger', 'fw-bold');
            } catch (error) {
                console.log(error)
            }
    
        })
        
        socket.on('accepted-friend-request', (payload) => {
            try {        
                document.querySelector('.alert').innerHTML = `${payload.name} accepted your friend request`;
                document.querySelector('.alert').classList.remove("d-none");
                document.querySelector('.notification').classList.add('text-danger', 'fw-bold');
                setTimeout(() => {
                  document.querySelector('.alert').classList.add("d-none");
                }, 3000);
            } catch (error) {
                console.log(error)
            }
        })
    
        //Obtener todos los posts cuando tengamos el usuario auth
        if (user.id) {
          dispatch(getAllPostsThunk(user.id))
        }
    
        return () => {
          socket.disconnect(); // Desconectar el socket cuando el componente se desmonte
        };
      }, []);

    return {
        user,
        socket,
        dispatch
    }
}