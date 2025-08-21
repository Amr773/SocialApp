import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";

export default function DeletePost({ id }) {
  let queryClient = useQueryClient();

  function deletePost() {
    axios
      .delete(`https://linked-posts.routemisr.com/posts/${id}`, {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      })
      .then((res) => {
        if (res.data.message === "success") {
          toast.success("Post Deleted Successfully");
          queryClient.invalidateQueries({ queryKey: [`userPosts`] });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Falied to delete post");
      });
  }

  return (
    <>
      <button
        onClick={() => {
          deletePost();
        }}
        className="cursor-pointer text-red-600 rounded-xl text-sm px-3 hover:bg-red-600 hover:text-white py-2.5"
      >
        Delete Post
      </button>
    </>
  );
}
