import { useRef } from "react";
import "../css/styles.css";

export const Post = ({post}) => {
    const {name, createAt, content, image} = post;
    const refLike = useRef();
    const refIconLiked = useRef();
    const refIconNotLike = useRef();
    const refSpanLike = useRef();

    const handleComment = () => {
        refLike.current.classList.toggle("d-none");
    }

    const handleLike = () => {
        if(!refIconNotLike.current.classList.contains("d-none")) {
            refIconLiked.current.classList.remove("d-none");
            refIconNotLike.current.classList.add("d-none");
            refSpanLike.current.classList.add("fw-bold");
        } else {
            
            refIconLiked.current.classList.add("d-none");
            refIconNotLike.current.classList.remove("d-none");
            refSpanLike.current.classList.remove("fw-bold");
        }
    }

    function timeElapsed(date) {
        const ahora = new Date();
        const fechaSubida = new Date(date);
        const diferencia = ahora - fechaSubida;
      
        const segundos = Math.floor(diferencia / 1000);
        const minutos = Math.floor(segundos / 60);
        const horas = Math.floor(minutos / 60);
      
        if (horas > 0) {
          return `subido hace ${horas} hora${horas !== 1 ? 's' : ''}`;
        } else if (minutos > 0) {
          return `subido hace ${minutos} minuto${minutos !== 1 ? 's' : ''}`;
        } else {
          return `subido hace ${segundos} segundo${segundos !== 1 ? 's' : ''}`;
        }
      }

    return (
        <>
            <div className="card my-5">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <span className="fw-bold">{name}</span>
                    <span>{timeElapsed(createAt)}</span>
                </div>

                <div className="card-body">
                    {content}

                    {!image ? '' : <img src={`http://localhost:8000/images/${image}`} alt="" className="w-100 image-post"/>}
                </div>

                <div className="card-footer d-flex justify-content-around">
                    <div className="d-flex align-items-center gap-2" style={{cursor: "pointer"}} onClick={handleLike}>
                        <span ref={refIconNotLike} className="material-symbols-outlined">
                            thumb_up
                        </span>
                        <span ref={refIconLiked} className="material-symbols-outlined d-none">
                            recommend
                        </span>
                        <span ref={refSpanLike}>Like</span>
                    </div>
                    <div className="d-flex align-items-center gap-2" style={{cursor: "pointer"}} onClick={handleComment}>
                        <span className="material-symbols-outlined">
                            comment
                        </span>
                        <span>Comment</span>
                    </div>
                    <div className="d-flex align-items-center gap-2" style={{cursor: "pointer"}}>
                        <span className="material-symbols-outlined">
                            share_windows
                        </span>
                        <span>Share</span>
                    </div>
                </div>
            </div>
            <div className="card my-2 d-none" ref={refLike}>
                <div className="card-body">
                    <textarea className="form-control" name="" id="" cols="30" rows="2"></textarea>
                </div>
            </div>
        </>
    )
}