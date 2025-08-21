import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function CreateCommentModal({ postId }) {
  const [isShow, setisShow] = useState(false);
  const form = useForm({
    defaultValues: {
      content: "",
      post: postId,
    },
  });

  let queryClient = useQueryClient();

  const { register, handleSubmit } = form;

  async function addComment(value) {
    try {
      let res = await axios.post(
        `https://linked-posts.routemisr.com/comments`,
        value,
        { headers: { token: localStorage.getItem("userToken") } }
      );
      console.log(res);
      if (res.data.message === "success") {
        toast.success("Comment added successfully");
        queryClient.invalidateQueries({ queryKey: [`userPosts`] });
        queryClient.invalidateQueries({ queryKey: [`getSinglePost`] });

        console.log(value);
      }
    } catch (err) {
      console.log(err);
      toast.error("Falied to add comment");
    }
  }

  function changeToggle() {
    setisShow(!isShow);
  }

  return (
    <div>
      {/* Modal toggle */}
      <button
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={() => {
          changeToggle();
        }}
      >
        Add Comment
      </button>
      {/* Main modal */}
      {isShow && (
        <div className="">
          <div
            id="authentication-modal"
            tabIndex={-1}
            aria-hidden="true"
            className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 overflow-y-auto overflow-x-hidden flex fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 max-h-full"
          >
            <div className="relative p-4 w-full max-w-md max-h-full">
              {/* Modal content */}
              <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                {/* Modal header */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Sign in to our platform
                  </h3>
                  <button
                    type="button"
                    className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => {
                      changeToggle();
                    }}
                  >
                    <i className="fas fa-close"></i>
                  </button>
                </div>
                {/* Modal body */}
                <div className="p-4 md:p-5">
                  <form
                    onSubmit={handleSubmit(addComment)}
                    className="space-y-4"
                    action="#"
                  >
                    <div>
                      <label
                        htmlFor="comment"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Add Comment
                      </label>
                      <input
                        type="text"
                        {...register("content")}
                        id="comment"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="postid"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      ></label>
                      <input
                        type="hidden"
                        value={postId}
                        {...register("post")}
                        id="postid"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Submit Comment
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
