import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
export default function DeleteComment({id}) {
let queryClient = useQueryClient();


  function deleteComment() {
    axios
      .delete(`https://linked-posts.routemisr.com/comments/${id}`, {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      })
      .then((res) => {
        if (res.data.message === "success") {
          toast.success("Comment Deleted Successfully");
          queryClient.invalidateQueries({ queryKey: [`userPosts`] });
          queryClient.invalidateQueries({ queryKey: [`getSinglePost`] });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Falied to delete comment");
      });
  }

  return (
    <>
      <button
        onClick={() => {
          deleteComment();
        }}
        className="cursor-pointer text-red-600 rounded-xl text-sm px-3 hover:bg-red-600 hover:text-white py-2.5"
      >
        Delete Comment
      </button>
    </>
  );
}
