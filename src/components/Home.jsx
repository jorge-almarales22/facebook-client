import { useEffect } from "react";
import { Navigate } from "react-router-dom"
import socketIOClient from 'socket.io-client';

export const Home = ({redirect, isAllowed}) => {

   useEffect(() => {
      const socket = socketIOClient('http://localhost:8000'); // La URL debe apuntar a tu servidor
      
      socket.on('connect', () => {
        console.log('Conectado al servidor de Socket.IO');
      });

      socket.on('disconnect', () => {
        console.log('Desconectado del servidor de Socket.IO');
      })

      // En algún lugar de tu componente de React
      socket.emit('mensaje_cliente', 'Hola, servidor!');
      
      return () => {
        socket.disconnect(); // Desconectar el socket cuando el componente se desmonte
      };
    }, []);
   
   if(!isAllowed) return <Navigate to={redirect} />

   return (
      <>
        <h1>Home</h1>
      </>
   )
}