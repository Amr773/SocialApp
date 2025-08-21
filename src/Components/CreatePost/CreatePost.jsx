import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function CreatePost() {
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
    <div className="w-full md:w-[80%] lg:w-[60%] mx-auto my-12 p-[3px] bg-gradient-to-r to-[#283c86] from-[#45a247] rounded-lg ">
      <div className="bg-white rounded-md p-4">
        <h2 className="p-3 text-black text-3xl text-center font-bold w-1/2 mx-auto mb-6 rounded-2xl">
          Create Post
        </h2>
        <form onSubmit={handleSubmit(handleAddPost)} action="">
          <div>
            <input
              type="text"
              {...register("body")}
              className="w-full border-4 border-slate-500 rounded-lg"
              placeholder="Post Details"
            />
          </div>
          <div>
            <label
              htmlFor="photo"
              className="w-full block p-4 text-center cursor-pointer"
            >
              <div className="flex items-center justify-center">
                <p className="text-2xl bg-[#1ab458] text-white me-4 p-3 font-bold rounded-2xl ">Submit An Image</p>
                <i className="fas fa-image text-5xl my-2"></i>
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
  );
}
