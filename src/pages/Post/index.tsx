import * as React from "react";
import Layout from "@/components/Layout";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import FileUploader from "@/components/FileUploader";
import { useUserAuth } from "@/components/Context/userAuthContex";
import { FileEntry, PhotoMeta, Post } from "../../types";
import { createPost } from "@/repository/post.service";
import { useNavigate } from "react-router";

interface ICreatePostProps {}

const CreatePost: React.FunctionComponent<ICreatePostProps> = () => {
  const { user } = useUserAuth();
  const [fileEntry, setFileEntry] = React.useState<FileEntry>({ files: [] });
  const [isError, setIsError] = React.useState(false);
  const [post, setpost] = React.useState<Post>({
    caption: "",
    photos: [],
    likes: 0,
    userlikes: [],
    username: "",
    photoURL: "",
    userId: null,
    date: new Date(),
    comments: [],
  });

  const navigate = useNavigate();
  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Uploaded File Entry: ", fileEntry);
    console.log("The created post is: ", post);

    setIsError(false);
    const photoMeta: PhotoMeta[] = fileEntry.files.map((file) => {
      return { cdnUrl: file.cdnUrl!, uuid: file!.uuid! };
    });
    if (user != null) {
      const newPost: Post = {
        ...post,
        userId: user.uid!,
        photos: photoMeta,
        photoURL: user.photoURL!,
        username: user.displayName!,
      };
      if (newPost.photos.length !== 0) {
        console.log("The final posy is  : ", newPost.photoURL);
        await createPost(newPost);
        navigate("/");
      } else {
        setIsError(true);
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <Layout>
      <div className="flex justify-center">
        <div className="border max-w-3xl w-full">
          <h3 className="bg-slate-800 text-white text-center text-lg p-2">
            Create Post
          </h3>
          <div className="p-8">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <Label className="mb-4">Photo Caption</Label>
                <Textarea
                  className="mb-8"
                  id="caption"
                  placeholder="what's in your photo"
                  value={post.caption}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setpost({ ...post, caption: e.target.value })
                  }
                />
                <div className="flex flex-col">
                  <Label className="mb-8" htmlFor="photo">
                    Photos
                  </Label>
                  <FileUploader
                    fileEntry={fileEntry}
                    onChange={setFileEntry}
                    preview={true}
                  />
                  {isError ? (
                    <p className="text-red-400">
                      Must submit a photo for post!
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <Button className="mt-8 w-32" type="submit">
                  Post
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreatePost;
