import { useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom"
import socketIOClient from 'socket.io-client';
import { Post } from "./Post";
import { useDispatch, useSelector } from "react-redux";
import { getAllPostsThunk } from "../thunks/posts.thunks";

export const Home = ({ redirect, isAllowed }) => {

  const [file, setFile] = useState(null);

  const user = useSelector((state) => state.auth);

  const posts = useSelector((state) => state.posts.allPosts);

  const dispatch = useDispatch();

  const refContentPost = useRef();

  const refAlert = useRef();

  const refInputFile = useRef();

  
  let socket = null
  useEffect(() => {
    socket = socketIOClient('http://localhost:8000'); // La URL debe apuntar a tu servidor

    socket.on('connect', () => {
      console.log('Conectado al servidor de Socket.IO');
    });

    socket.on('uploaded_post', (payload) => {
      console.log('Post subido', payload);
    });

    if (user.id) {
      dispatch(getAllPostsThunk(user.id))
    }

    return () => {
      socket.disconnect(); // Desconectar el socket cuando el componente se desmonte
    };
  }, []);

  useEffect(() => {
    if(user.id){
      dispatch(getAllPostsThunk(user.id)); 
    }
  }, [dispatch]);

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  }


  const handleSubmitPost = async (e) => {

    e.preventDefault()

    let socket = socketIOClient('http://localhost:8000');

    const content = refContentPost.current.value

    // Event emitting to save post
    socket.emit('upload_post', `The user ${user.name} uploaded a post`);

    const formData = new FormData();
    formData.append('image', file);
    formData.append('content', content);
    formData.append('user_id', user.id);


    const resp = await fetch('http://localhost:8000/api/posts/store', {
      method: 'POST',
      body: formData
    });

    const data = await resp.json();

    if (data.success) {
      dispatch(getAllPostsThunk(user.id))
      clearForm();
      refAlert.current.classList.remove("d-none");

      setTimeout(() => {
        refAlert.current.classList.add("d-none");
      }, 5000);
    }

  }

  const clearForm = () => {
    refContentPost.current.value = '';
    setFile(null);
    refInputFile.current.value = '';
  }

  if (!isAllowed) return <Navigate to={redirect} />

  return (
    <>
      <div ref={refAlert} className="alert alert-success d-none my-3" role="alert">
        Post uploaded successfully.
      </div>
      <div className="card mb-4 mt-3">
        <div method="POST" className="card-header d-flex justify-content-between align-items-center">
          <span>Hey, {user.name}, what's on your mind</span>
        </div>
        <form method="POST" className="card-body" onSubmit={handleSubmitPost}>
          <textarea ref={refContentPost} className="form-control" cols="20" rows="1" placeholder="What's on your mind"></textarea>
          <input ref={refInputFile} type="file" name="image" className="my-2" onChange={handleFileUpload} />
          <button type="submit" className="btn btn-primary my-2 d-block">Post</button>
        </form>
      </div>
      {
        posts.map((post) => <Post key={post.id} post={post} />)
      }
    </>
  )
}