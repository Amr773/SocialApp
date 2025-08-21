import React, { useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

export default function UpdatePost({ id }) {
  const [isShow, setisShow] = useState(false);

  let queryClient = useQueryClient();

  const form = useForm({
    defaultValues: {
      body: "",
      image: "",
    },
  });

  const { register, handleSubmit } = form;

  async function handleUpdate(values) {
    let myData = new FormData();
    myData.append("body", values.body);
    myData.append("image", values.image[0]);

    try {
      let res = await axios.put(
        `https://linked-posts.routemisr.com/posts/${id}`,
        myData,
        { headers: { token: localStorage.getItem("userToken") } }
      );
      console.log(res);
      if (res.data.message === "success") {
        toast.success("Post Updated successfully");
        queryClient.invalidateQueries({ queryKey: [`userPosts`] });
        queryClient.invalidateQueries({ queryKey: [`getSinglePost`] });
      }
    } catch (err) {
      console.log(err);
      toast.error("Falied to update post");
    }
  }

  function changeToggle() {
    setisShow(!isShow);
  }

  return (
    <div>
      {/* Modal toggle */}
      <button
        className=" text-blue-600 cursor-pointer hover:bg-blue-600 hover:text-white rounded-xl text-sm px-2 py-2.5 text-center"
        type="button"
        onClick={() => {
          changeToggle();
        }}
      >
        Update Post
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
                    onSubmit={handleSubmit(handleUpdate)}
                    className="space-y-4"
                    action="#"
                  >
                    <div>
                      <label
                        htmlFor="comment"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Add Text
                      </label>
                      <input
                        {...register("body")}
                        type="text"
                        id="comment"
                        placeholder="Post Details..."
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="photo" className=" text-center block">
                        <i className="fas fa-image text-5xl cursor-pointer text-white"></i>
                      </label>
                      <input
                        {...register("image")}
                        type="file"
                        id="photo"
                        placeholder="••••••••"
                        className="bg-gray-50 hidden  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Update Post
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
