import React, { useEffect, useState } from "react";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
import { useUserAuth } from "../Context/userAuthContex";

import { updateComments } from "@/repository/post.service"; // Import your updateComments function
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

interface Comment {
  content: string;
  author: string;
}

interface CommentSectionProps {
  postId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const { user } = useUserAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");

  const db = getFirestore();

  // Fetch and listen to comments
  useEffect(() => {
    const docRef = doc(db, "posts", postId); // Adjust collection name if needed

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const postData = docSnap.data();
        setComments(postData.comments || []); // Assume `comments` is an array in Firestore
      }
    });

    return () => unsubscribe();
  }, [postId, db]);

  // Handle form submission for adding a new comment
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newComment.trim()) {
      console.log("Comment cannot be empty.");
      return;
    }

    try {
      const comment: Comment = {
        content: newComment,
        author: user?.displayName || "anonymous",
      };

      // Use the updateComments function to update Firestore
      await updateComments(postId, comment);

      // Clear the input field
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="comment-section mt-3 flex items-center flex-col">
      {/* Comment Input Area */}
      <form
        onSubmit={handleCommentSubmit}
        className="mb-4 flex items-center flex-col"
      >
        <Textarea
          value={newComment}
          className="rounded-80 w-80"
          onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
            setNewComment(e.target.value)
          }
          placeholder="Write a comment..."
        />
        <Button
          type="submit"
          className="mt-4 rounded-full text-black shadow-lg"
        >
          Post Comment
        </Button>
      </form>

      {/* Display Comments */}
      <div className="comments">
        {comments.map((comment, index) => (
          <div key={index} className="comment">
            <strong>{comment.author}:</strong> {comment.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
