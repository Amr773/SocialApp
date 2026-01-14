import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import UserPosts from "../UserPosts/UserPosts";
import ChangePasswordModal from "../ChangePasswordModal/ChangePasswordModal";
import UploadProfilePhoto from "../UploadProfilePhoto/UploadProfilePhoto";
import CreatePost from "../CreatePost/CreatePost";
import { Card, Dropdown, DropdownItem } from "flowbite-react";

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

  console.log(data?._id);

  return (
    <>
      <Card className="mx-auto my-15 sm:w-full md:w-[75%] lg:w-1/2">
        <div className="flex flex-col items-center pb-10">
          <img src={data?.photo} alt="" />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {data?.name}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {data?.email}
          </span>
          <div className="mt-4 flex space-x-3 lg:mt-6">
            <a href="#" className="inline-flex items-center">
              <UploadProfilePhoto />
            </a>
            <a href="#" className="inline-flex items-center">
              <ChangePasswordModal />
            </a>
          </div>
          <CreatePost />
        </div>
      </Card>

      <CreatePost />
      {data && <UserPosts id={data?._id} />}
    </>
  );
}
