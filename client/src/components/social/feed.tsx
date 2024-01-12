import { useState, useEffect } from "react";
import axios from "axios";
import Post from "./post";
import { postInterface } from "./interfaces";
import PostForm from "./PostForm";

interface FeedProps {
  currentUsername: string;
}

/**
 * Feed component for displaying a list of posts and a form for creating new posts.
 * @param {FeedProps} props - Properties including the current user's username.
 */
function Feed({ currentUsername }: FeedProps) {
  const [posts, setPosts] = useState<postInterface[]>([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/posts`, {
        withCredentials: true,
      })
      .then((response) => setPosts(response.data));
  }, []);

  return (
    <div
      className="m-auto mt-2"
      style={{ width: "75vw" }}>
      <div
        className="card w-1/1 bg-primary p-4 overflow-scroll"
        style={{ minHeight: "200px", maxHeight: "90vh" }}>
        <div className="h-full overflow-y-scroll">
          {posts.map((post, i) => (
            <Post
              key={i}
              post={post}
              currentUsername={currentUsername}
            />
          ))}
        </div>
        <PostForm />
      </div>
    </div>
  );
}

export default Feed;
