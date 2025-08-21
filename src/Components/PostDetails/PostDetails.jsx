import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Comment from "../Comment/Comment";
import UpdatePost from "../UpdatePost/UpdatePost";
import DeletePost from "../DeletePost/DeletePost";
import CreateCommentModal from "../CreateCommentModal/CreateCommentModal";
import EditComment from "../EditComment/EditComment";
import { useUserData } from "../../Hooks/useUserData";

export default function PostDetails() {
  let { id } = useParams();
  const [editShow, seteditShow] = useState(false);

  const { data: user } = useUserData();

  function toggleEdit() {
    seteditShow(!editShow);
  }

  function getSinglePost() {
    return axios.get(`https://linked-posts.routemisr.com/posts/${id}`, {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
  }

  let { data, isError, isLoading, error } = useQuery({
    queryKey: ["getSinglePost"],
    queryFn: getSinglePost,
    select: (data) => data?.data?.post,
  });

  if (isError) {
    return <h3>{error.message}</h3>;
  }

  if (isLoading) {
    return <div className="spinner"></div>;
  }

  return (
    <div
      key={data.id}
      className="w-full md:w-[80%] lg:w-[60%] rounded-md my-8 p-4 mx-auto"
    >
      <div className="flex items-center justify-center">
        <div className="bg-white p-4 rounded-lg max-w-md shadow-2xl">
          {/* User Info with Three-Dot Menu */}
          <div className="flex items-center justify-between mb-4 ">
            <div className="flex items-center space-x-2">
              <img src={data.user.photo} className="size-[36px]" alt="" />
              <div>
                <p className="text-gray-800 font-semibold">{data.user.name}</p>
                <p className="text-gray-500 text-sm">{data.createdAt}</p>
              </div>
            </div>
            <div className="text-gray-500 cursor-pointer">
              {/* Three-dot menu icon */}
              {data.user._id === user?.data?.user?._id && (
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
                          <UpdatePost id={data?.id} />
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex justify-center py-2 ">
                          <DeletePost id={data?.id} />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Message */}
          <div className="mb-4">
            <p className="text-gray-800">
              {data.body && <span className="mb-4">{data.body}</span>}
            </p>
          </div>
          {/* Image */}
          <div className="mb-4">
            {data.image && (
              <img
                src={data.image}
                className="w-full rounded-md"
                alt={data.body}
              />
            )}
          </div>

          {/* Like and Comment Section */}
          <hr className="mt-2 mb-2" />
          <p className="text-gray-800 font-semibold">Comments</p>
          <hr className="mt-2 mb-2" />

          <div className="mt-4">
            {data?.comments.map((comment) => (
              <Comment key={comment._id} comment={comment} />
            ))}
            {data?.comments.length > 0 &&
            data.user._id === user?.data?.user?._id ? (
              <EditComment comment={data?.comments[0]} />
            ) : (
              ""
            )}
            <CreateCommentModal postId={data.id} />
          </div>
        </div>
      </div>
    </div>
  );
}

// {<div
//       key={data?.id}
//       className="w-full md:w-[80%] lg:w-[60%] rounded-md bg-slate-200 my-8 p-4 mx-auto"
//     >
//       <div className="flex justify-between items-center mb-4">
//         <div className="flex items-center gap-4">
//           <img src={data?.user.photo} className="size-[36px]" alt="" />
//           <p>{data?.user.name}</p>
//         </div>
//         <div className="text-xs text-slate-500">{data?.createdAt}</div>
//       </div>
//       {data?.body && <h2 className="mb-4">{data?.body}</h2>}
//       {data?.image && (
//         <img src={data?.image} className="w-full rounded-md" alt={data?.body} />
//       )}
//       {data?.comments.map((comment) => (
//         <Comment key={comment._id} comment={comment} />
//       ))}
//     </div>}
