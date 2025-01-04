import { documentResponse } from "@/types";
import * as React from "react";
import { useUserAuth } from "../Context/userAuthContex";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import image1 from "/src/assets/user.svg";
import { HeartIcon, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { updateLikesOnPost } from "@/repository/post.service";
import CommentSection from "../Comment/section";

interface IpostCardProps {
  data: documentResponse;
}

const PostCard: React.FunctionComponent<IpostCardProps> = ({ data }) => {
  console.log("Post data is : ", data.date);
  const { user } = useUserAuth();
  React.useEffect(() => {
    console.log("Data updated:", data);
  }, [data]);
  const [likesInfo, setLikesInfo] = React.useState<{
    likes: number;
    isLike: Boolean;
  }>({
    likes: data.likes!,
    isLike: data.userlikes?.includes(user!.uid) ? true : false,
  });
  const [showComments, setShowComments] = React.useState(false);
  const updateLike = async (isVal: boolean) => {
    setLikesInfo({
      likes: isVal ? likesInfo.likes + 1 : likesInfo.likes - 1,
      isLike: !likesInfo.isLike,
    });
    if (isVal) {
      data.userlikes!.push(user!.uid);
    } else {
      data.userlikes?.splice(data.userlikes?.indexOf(user!.uid));
    }

    await updateLikesOnPost(
      data.id!,
      data.userlikes!,
      isVal ? likesInfo.likes + 1 : likesInfo.likes - 1
    );
  };

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-col p-3">
        <CardTitle className="text-sm test-center flex justify-start item-center">
          <span className="mr-2">
            <img
              src={data.photoURL || image1}
              className="w-10 h-10 rounded-full border-2 border-slate-800 object-cover"
            ></img>
          </span>
          <span>{data.username}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <img src={data.photos ? data.photos[0].cdnUrl : ""} />
      </CardContent>
      <CardFooter className="flex flex-col p-3">
        <div className="flex justify-between w-full mb-3 ">
          <HeartIcon
            className={cn(
              "mr-3",
              "cursor-pointer",
              likesInfo.isLike ? "fill-red-500" : "fill-none"
            )}
            onClick={() => updateLike(!likesInfo.isLike)}
          />
          <MessageCircle
            className={cn(
              "mr-3",
              "cursor-pointer",
              showComments ? "fill-gray-600" : "fill-none"
            )}
            onClick={() => setShowComments(!showComments)}
          />
        </div>
        <div className="w-full text-sm">{likesInfo.likes} Likes</div>
        <div className="w-full text-sm">
          <span>{data.caption}</span>
        </div>
        <div className="flex justify-center items-center">
          {showComments && <CommentSection postId={data.id!} />}
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
