import * as React from "react";
import { ProfileResponse } from "@/types";
import { getAllUsers } from "@/repository/user.sevice";
import { useUserAuth } from "../Context/userAuthContex";

interface IStoriesProps {}

const Stories: React.FunctionComponent<IStoriesProps> = () => {
  const [otherUsers, setOtherUsers] = React.useState<ProfileResponse[]>([]);
  const { user } = useUserAuth();
  const getUsers = async (userId: string) => {
    const response = (await getAllUsers(userId)) || [];
    setOtherUsers(response);
  };
  React.useEffect(() => {
    if (user?.uid != null) {
      getUsers(user!.uid);
    }
  });

  const renderUsers = () => {
    return otherUsers.map((item) => {
      return (
        <div className="flex items-center  flex-col ml-5 mr-5 justisfy-start">
          <img
            src={item.photoURL}
            className="w-20 h-20 rounded-full border-4 border-slate-800"
          ></img>
          {item.displayName}
        </div>
      );
    });
  };
  return (
    <div className="flex mr-5 ml-5">
      <div className="flex  justify-between flex-row items-center">
        {otherUsers.length > 0 ? renderUsers() : "Not Available"}
      </div>
    </div>
  );
};

export default Stories;
