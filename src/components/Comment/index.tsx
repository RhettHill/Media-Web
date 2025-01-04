import * as React from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { updateComments } from "@/repository/post.service";
import { Comment } from "@/types";
import { useUserAuth } from "../Context/userAuthContex";

interface ICommentProps {
  id: string;
}

const CommentArea: React.FunctionComponent<ICommentProps> = ({ id }) => {
  const { user } = useUserAuth();
  const [comment, setComment] = React.useState<Comment>({
    content: "",
    author: user!.displayName!,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      updateComments(id, comment!);
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <div className="flex">
      <div className="flex">
        <form
          onSubmit={handleSubmit}
          className="flex justify-center items-center p-2"
        >
          <Textarea
            value={comment.content}
            onChange={(e) =>
              setComment({ ...comment, content: e.target.value })
            }
            placeholder="I love this post!"
          />
          <Button type="submit">Post Comment</Button>
        </form>
      </div>
    </div>
  );
};

export default CommentArea;
