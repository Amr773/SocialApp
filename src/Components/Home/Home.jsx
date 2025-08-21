import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import Comment from "../Comment/Comment";
import { Link } from "react-router-dom";
import CreateCommentModal from "../CreateCommentModal/CreateCommentModal";
import CreatePost from "../CreatePost/CreatePost";
import EditComment from "../EditComment/EditComment";
import UpdatePost from "../UpdatePost/UpdatePost";
import DeletePost from "../DeletePost/DeletePost";
import { useUserData } from "../../Hooks/useUserData";

export default function Home() {
  const [editShow, seteditShow] = useState(false);

  const{data:user} = useUserData()

  function toggleEdit() {
    seteditShow(!editShow);
  }
  function getAllPosts() {
    return axios.get("https://linked-posts.routemisr.com/posts?limit=50", {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
  }

  let { data, isError, isLoading, error } = useQuery({
    queryKey: ["getPosts"],
    queryFn: getAllPosts,
    select: (data) => data?.data?.posts,
  });

  if (isError) {
    return <h3>{error.message}</h3>;
  }

  // console.log(data.user._id);

  if (isLoading) {
    return <div className="spinner"></div>;
  }



  return (
    <>
      <CreatePost />
      {data.map((post) => (
        <div
          key={post.id}
          className="w-full md:w-[80%] lg:w-[60%] rounded-md my-8 p-4 mx-auto"
        >
          <div className="flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg max-w-md shadow-2xl">
              {/* User Info with Three-Dot Menu */}
              <div className="flex items-center justify-between mb-4 ">
                <div className="flex items-center space-x-2">
                  <img src={post.user.photo} className="size-[36px]" alt="" />
                  <div>
                    <p className="text-gray-800 font-semibold">
                      {post.user.name}
                    </p>
                    <p className="text-gray-500 text-sm">{post.createdAt}</p>
                  </div>
                </div>
                <div className="text-gray-500 cursor-pointer">
                  {/* Three-dot menu icon */}
                  {post.user._id === user?.data?.user?._id && (
                    <button className="hover:bg-gray-50 rounded-full p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        onClick={toggleEdit}
                      >
                        <circle cx={12} cy={7} r={1} />
                        <circle cx={12} cy={12} r={1} />
                        <circle cx={12} cy={17} r={1} />
                      </svg>
                    </button>
                  )}

                  {editShow && (
                    <div>
                      <div
                        id="dropdown"
                        className="z-10 border-2 absolute rounded-lg shadow-sm w-44"
                      >
                        <ul
                          className="px-0 bg-white/50 text-sm text-gray-700 dark:text-gray-200"
                          aria-labelledby="dropdownDefaultButton"
                        >
                          <li>
                            <a href="#" className="flex justify-center py-2 ">
                              <UpdatePost id={post?.id} />
                            </a>
                          </li>
                          <li>
                            <a href="#" className="flex justify-center py-2 ">
                              <DeletePost id={post?.id} />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* Message */}
              <Link to={`/postdetails/${post.id}`}>
                <div className="mb-4">
                  <p className="text-gray-800">
                    {post.body && <span className="mb-4">{post.body}</span>}
                  </p>
                </div>
                {/* Image */}
                <div className="mb-4">
                  {post.image && (
                    <img
                      src={post.image}
                      className="w-full rounded-md"
                      alt={post.body}
                    />
                  )}
                </div>
              </Link>
              {/* Like and Comment Section */}
              <hr className="mt-2 mb-2" />
              <p className="text-gray-800 font-semibold">Comments</p>
              <hr className="mt-2 mb-2" />

              <div className="mt-4">
                <div className="flex items-center space-x-2">
                  <img
                    src="https://placekitten.com/32/32"
                    alt="User Avatar"
                    className="w-6 h-6 rounded-full"
                  />
                  <div>
                    <p className="text-gray-800 font-semibold">
                      {post?.comments.length > 0 &&
                        post?.comments[0].commentCreator?.name}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {post?.comments.length > 0 && post?.comments[0].content}
                    </p>
                  </div>
                </div>
                {post?.comments.length > 0 &&
                post.user._id === user?.data?.user?._id ? (
                  <EditComment comment={post?.comments[0]} />
                ) : (
                  ""
                )}
                <CreateCommentModal postId={post.id} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
