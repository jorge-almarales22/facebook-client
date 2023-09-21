import { useRef } from "react";

export const Post = () => {

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

    return (
        <>
            <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <span>Name user</span>
                    <span>Date</span>
                </div>

                <div className="card-body">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit ducimus itaque eius ipsam praesentium dolorem fugiat, sunt incidunt nulla, unde sint doloribus placeat voluptatum quidem, expedita officia. Accusantium, veritatis nulla?
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