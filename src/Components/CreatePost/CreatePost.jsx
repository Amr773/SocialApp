import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function CreatePost() {
  const [isShow, setisShow] = useState(false);

  let form = useForm({
    defaultValues: {
      body: "",
      image: "",
    },
  });
  let queryClient = useQueryClient();

  let { register, handleSubmit } = form;

  async function handleAddPost(values) {
    let myData = new FormData();
    myData.append("body", values.body);
    myData.append("image", values.image[0]);

    try {
      let response = await axios.post(
        `https://linked-posts.routemisr.com/posts`,
        myData,
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
      if (response.data.message === `success`) {
        toast.success(`Post Added Successfully`);
        queryClient.invalidateQueries({ queryKey: [`userPosts`] });
        queryClient.invalidateQueries({ queryKey: [`getSinglePost`] });
      }
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  return (
    <div className="flex justify-center w-full md:w-[80%] lg:w-[60%] mx-auto mt-12 p-[3px]">
      <div className="rounded-md p-4 flex">
        <button
          type="button"
          onClick={() => {
            setisShow(!isShow);
          }}
          className="bg-blue-600 hover:cursor-pointer text-white text-2xl text-center font-bold p-5 mx-auto rounded-2xl"
        >
          Create Post
        </button>

        {isShow && (
          <div
            id="authentication-modal"
            tabIndex={-1}
            aria-hidden="true"
            className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 overflow-y-auto overflow-x-hidden flex fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 max-h-full"
          >
            <div className="p-5 bg-white rounded-lg shadow-sm dark:bg-gray-700 w-1/2">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Create Post
                </h3>
                <button
                  type="button"
                  className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => {
                    setisShow(!isShow);
                  }}
                >
                  <i className="fas fa-close"></i>
                </button>
              </div>
              <form onSubmit={handleSubmit(handleAddPost)} action="">
                <div>
                  <input
                    type="text"
                    {...register("body")}
                    className="w-full border-4 pb-12 border-slate-500 rounded-lg"
                    placeholder="Post Details"
                  />
                </div>
                <div>
                  <label
                    htmlFor="photo"
                    className="w-full block p-4 text-center cursor-pointer"
                  >
                    <div className="flex items-center justify-center">
                      <p className="text-l text-white me-4 p-3 font-bold rounded-2xl ">
                        Upload An Image
                      </p>
                      <i className="fas fa-image text-white text-2xl my-2"></i>
                    </div>
                  </label>
                  <input
                    type="file"
                    {...register("image")}
                    className="hidden"
                    id="photo"
                  />
                </div>
                <div>
                  <button className="bg-blue-600 text-white w-full p-3 rounded-lg cursor-pointer">
                    Submit Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


