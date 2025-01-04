import { getAllUsers } from "@/repository/user.sevice";
import { ProfileResponse } from "@/types";
import * as React from "react";
import { useUserAuth } from "../Context/userAuthContex";
import image1 from "/src/assets/user.svg";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

interface IuserListProps {}

const userList: React.FunctionComponent<IuserListProps> = () => {
  const [suggestedUser, setSuggestedUser] = React.useState<ProfileResponse[]>(
    []
  );
  const { user } = useUserAuth();

  const getSuggestedUsers = async (userId: string) => {
    const response = (await getAllUsers(userId)) || [];
    setSuggestedUser(response);
  };

  React.useEffect(() => {
    if (user?.uid != null) {
      getSuggestedUsers(user.uid);
    }
  });

  const renderUsers = () => {
    return suggestedUser.map((user) => {
      return (
        <div className="flex flex-row items-center mb-4 bg-gray-500 justify-start">
          <span className="mr-2">
            <img
              src={user.photoURL ? user.photoURL : image1}
              className="w-10 h-10 rounded-full border-2 bg-slate-800 object-cover"
            />
          </span>
          <span className="text-xs">
            {user.displayName ? user.displayName : ""}
          </span>
          <Button className="text-xs p-3 py-2 h-6 bg-slate-800 last-of-type:ml-auto">
            Follow
          </Button>
        </div>
      );
    });
  };

  return (
    <div className="text-white py-8 px-3">
      <Link to="/Profile">
        <div className="flex flex-row items-center border-b p-4">
          <span className="mr-2">
            <img
              src={user?.photoURL || image1}
              className="w-20 h-20 rounded-full border-2 bg-slate-800 object-cover"
            />
          </span>
          <span className="test-xs">
            {user?.displayName ? user.displayName : ""}
          </span>
        </div>
      </Link>
      <h3 className="test-sm text-slate-300">Suggested Friends</h3>
      <div className="my-4">
        {suggestedUser.length > 0 ? renderUsers() : ""}
      </div>
    </div>
  );
};

export default userList;
