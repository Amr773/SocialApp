import React from "react";
import UpdateComment from "../UpdateComment/UpdateComment";
import DeleteComment from "../DeleteComment/DeleteComment";
import EditComment from "../EditComment/EditComment";

const Comment = ({ comment}) => {

 

  let { commentCreator, createdAt, content, _id } = comment;
  return (
    <>
      <div className="rounded-md my-2  p-3 text-black">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center "> 
            <img src={commentCreator?.photo} className="size-[36px]" alt="" />
            <p>{commentCreator?.name}</p>
          </div>
          <span className="text-slate-600 text-xs">{createdAt}</span>
        </div>
        <div className="content px-12">{content}</div>
        <div className="flex justify-end">
           {commentCreator._id === "6894b661fcf033c8b8120039" && <EditComment comment = {comment} />} 
        </div>
      </div>
      <hr />
    </>
  );
};

export default Comment;
