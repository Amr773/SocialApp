import React, { useState } from 'react'
import UpdateComment from "../UpdateComment/UpdateComment";
import DeleteComment from "../DeleteComment/DeleteComment";

export default function EditComment({comment}) {
  const [isShow, setisShow] = useState(false);
  
    function changeToggle() {
      setisShow(!isShow);
    }
  
    let { _id } = comment;
    return (
      <>
                    {/* Edit Comment */}
                    <hr />
          <div className="flex justify-end">
            <div></div>
            <div className="">
              <button
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                className={`text-black border-2 border-black hover:bg-black hover:text-white focus:outline-none  font-medium rounded-lg text-sm  py-2.5 text-center ${isShow ? `px-10` : `px-5` }`}
                type="button"
                onClick={changeToggle}
              >
                Edit Comment
              </button>
              {/* Dropdown menu */}
              {isShow && (
                <div
                  id="dropdown"
                  className="z-10 border-2  rounded-lg shadow-sm w-44 "
                >
                  <ul
                    className="px-0  text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownDefaultButton"
                  >
                    <li>
                      <a
                        href="#"
                        className="flex justify-center py-2 "
                      >
                        <UpdateComment id={_id} />
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex justify-center py-2 "
                      >
                        <DeleteComment id={_id} />
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
      </>
    );
}
