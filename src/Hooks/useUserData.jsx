import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useUserData = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () =>
      axios.get(`https://linked-posts.routemisr.com/users/profile-data`, {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      }),
  });
};
