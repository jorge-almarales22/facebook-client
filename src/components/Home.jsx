import { useRef, useState } from "react";
import { Navigate } from "react-router-dom"
import { Post } from "./Post";
import { useSelector } from "react-redux";
import { getAllPostsThunk } from "../thunks/posts.thunks";
import { useSockect } from "./useSockect";
import { Alert } from "./Alert";

export const Home = ({ redirect, isAllowed }) => {

  const { socket, user, dispatch} = useSockect();

  const [file, setFile] = useState(null);

  const posts = useSelector((state) => state.posts.allPosts);

  const refContentPost = useRef();

  const refInputFile = useRef();

  // Funcion para subir el archivo
  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  }

  // Funcion para subir el post
  const handleSubmitPost = async (e) => {

    e.preventDefault()

    const content = refContentPost.current.value

    const formData = new FormData();
    formData.append('image', file);
    formData.append('content', content);
    formData.append('user_id', user.id);

    // Subiendo el post
    const resp = await fetch('http://localhost:8000/api/posts/store', {
      method: 'POST',
      body: formData
    });

    const data = await resp.json();

    //si se guarda el posts traemos todos los posts de nuevo y asignamos al store global de posts
    if (data.success) {

      dispatch(getAllPostsThunk(user.id))
      clearForm();

      // Emitiendo el evento de guardar el post
      socket.emit('upload_post', user.id);

      document.querySelector('.alert').classList.remove("d-none");

      setTimeout(() => {
        document.querySelector('.alert').classList.add("d-none");
      }, 5000);
    }

  }


  // Funcion para limpiar el formulario
  const clearForm = () => {
    refContentPost.current.value = '';
    setFile(null);
    refInputFile.current.value = '';
  }

  if (!isAllowed) return <Navigate to={redirect} />

  return (
    <>
      <Alert/>
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
        posts.map((post) => <Post key={post.post_id} post={post} />)
      }
    </>
  )
}