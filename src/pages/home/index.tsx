import Layout from "@/components/Layout";
import Stories from "@/components/Stories";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import * as React from "react";
import { documentResponse } from "../../types";
import { useUserAuth } from "@/components/Context/userAuthContex";
import { getPosts } from "@/repository/post.service";
import PostCard from "@/components/postCard";

interface IHomeProps {}

const Home: React.FunctionComponent<IHomeProps> = () => {
  const { user } = useUserAuth();
  const [data, setData] = React.useState<documentResponse[]>([]);
  const getAllPost = async () => {
    const response: documentResponse[] = (await getPosts()) || [];
    console.log("All posts are : ", response);
    setData(response);
  };
  React.useEffect(() => {
    if (user != null) {
      getAllPost();
    }
  }, []);

  const renderPost = () => {
    return data.map((item) => {
      return <PostCard data={item} key={item.id} />;
    });
  };

  const renderUsers = () => {
    return <Stories></Stories>;
  };

  return (
    <Layout>
      <div className="flex flex-col">
        <div className="relative mn-6 w-full text-gray-600">
          <Input
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-sm text-base fous:outline-none"
            placeholder="search"
            type="search"
            name="search"
          />
          <button type="submit" className="absolute right-2.5 top-2.5">
            <Search className="w-5 h-5 text-gray-400"></Search>
          </button>
        </div>
        <div className="mb-5 overflow-y-auto">
          <h2 className="mb-5">Stories</h2>
          <div className="flex flex-row justify-start">{renderUsers()}</div>
        </div>
        <div className="mb-5">
          <h2 className="mb5">Feed</h2>
          <div className="w-full flex justify-center">
            <div className="flex flex-col max-w-sm rounded-sm overflow-hidden">
              {data.length > 0 ? renderPost() : <div>...Loading</div>}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
