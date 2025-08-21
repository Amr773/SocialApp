import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import UserPosts from "../UserPosts/UserPosts";
import ChangePasswordModal from "../ChangePasswordModal/ChangePasswordModal";
import UploadProfilePhoto from "../UploadProfilePhoto/UploadProfilePhoto";
import CreatePost from "../CreatePost/CreatePost";

export default function Profile() {
  function getUserData() {
    return axios.get(`https://linked-posts.routemisr.com/users/profile-data`, {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
  }

  let { data, isError, isLoading, error } = useQuery({
    queryKey: ["userData"],
    queryFn: getUserData,
    select: (data) => data?.data?.user,
  });

  if (isError) {
    return <h3>{error.message}</h3>;
  }

  if (isLoading) {
    return <div className="spinner"></div>;
  }

  console.log(data?._id)

  return (
    <>
      <div className="w-full md:w-[80%] lg:w-[60%] mx-auto mt-10 text-center border-2 border-slate-800 rounded-lg p-4">
        <img src={data?.photo} className="size-[50px] mx-auto" alt="" />
        <p>Name: {data?.name}</p>
        <p>Gender: {data?.gender}</p>
        <p>Email: {data?.email}</p>
        <p>Birthday: {data?.dateOfBirth}</p>
      </div>

      <div className="w-full flex gap-4 justify-center md:w-[80%] lg:w-[60%] mx-auto mt-10 text-center border-2 border-slate-800 rounded-lg p-4">
        <ChangePasswordModal />
        <UploadProfilePhoto />
      </div>
      <CreatePost />
      {data && <UserPosts id={data?._id} />}
    </>
  );
}
