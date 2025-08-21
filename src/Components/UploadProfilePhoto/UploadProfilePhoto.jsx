import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
// import { axios } from "axios";
axios;

export default function UploadProfilePhoto() {
  const [isShow, setisShow] = useState(false);
  const form = useForm({
    defaultValues: {
      photo: "",
    },
  });

  let { register, handleSubmit } = form;

  function changeShow() {
    setisShow(!isShow);
  }

  function handleUploadPhoto(values) {
    console.log(values.photo[0]);
    let myData = new FormData();
    myData.append("photo", values.photo[0]);

    axios
      .put(`https://linked-posts.routemisr.com/users/upload-photo`, myData, {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.message === `success`) {
          toast.success(`Photo Changed Successfully`);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      });
  }

  return (
    <>
      <div>
        {/* Modal toggle */}
        <button
          data-modal-target="authentication-modal"
          data-modal-toggle="authentication-modal"
          className="block text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
          onClick={changeShow}
        >
          Update Profile Photo
        </button>
        {/* Main modal */}
        {isShow && (
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
                    Upload Photo
                  </h3>
                  <button
                    type="button"
                    className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="authentication-modal"
                    onClick={changeShow}
                  >
                    <i className="fas fa-close"></i>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                {/* Modal body */}
                <div className="p-4 md:p-5">
                  <form
                    onSubmit={handleSubmit(handleUploadPhoto)}
                    className="space-y-4"
                    action="#"
                  >
                    <div className="flex items-center justify-center my-4 gap-2">
                      <input
                        type="file"
                        {...register("photo")}
                        id="photo"
                        className="bg-gray-50 hidden border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder=""
                        required
                      />
                      <label htmlFor="photo" className=" cursor-pointer">
                        <i className="fas fa-image text-6xl text-white  "></i>
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Confirm Photo
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
