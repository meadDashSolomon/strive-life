import Comment from "./comment";
import axios from "axios";
import { commentInterface, postInterface } from "./interfaces";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface PostProps {
  post: postInterface;
  currentUsername: string;
}

/**
 * Post component for displaying a single post and its comments.
 * @param {PostProps} props - Includes the post data and the current user's username.
 */
function Post({ post, currentUsername }: PostProps) {
  const [comments, setComments] = useState<commentInterface[]>([]);
  const [commentBody, setCommentBody] = useState<string>("");
  const navigate = useNavigate();

  /**
   * Navigates to the direct message page with the selected user.
   * @param {string} username - The username to navigate to.
   */
  const handleProfileClick = (username: string) => {
    if (username && currentUsername) {
      navigate(`/dm/${username}`);
    } else {
      console.log("Usernames are not set properly");
    }
  };

  /**
   * Fetches comments for the given post.
   */
  const getComments = () => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/comments`, {
        params: { id: post.id, skip: 0, take: 5 },
        withCredentials: true,
      })
      .then((response) => setComments(response.data));
  };

  // Effect to fetch comments when the component mounts
  useEffect(getComments, [post.id]);

  return (
    <div className="border-2 text-secondary mb-3 bg-white shadow-lg">
      <div className="flex flex-row p-4 items-center border-b-2">
        <div
          className="flex-shrink-0"
          onClick={() => handleProfileClick(post.user.username)}>
          <img
            className="w-20 h-20 rounded-full cursor-pointer"
            src={post.user.profile_pic || "/assets/bowser.jpeg"}
            alt="Profile"
          />
          <div className="text-center mt-2 font-semibold">
            {post.user.username}
          </div>
        </div>
        <div className="ml-4 flex-grow">
          <div className="text-lg font-bold mb-2">{post.title}</div>
          <div className="text-md">{post.body}</div>
        </div>
      </div>
      <div className="p-4 space-y-4 bg-gray-100">
        <div className="text-sm text-gray-500">Comments</div>
        {comments.map((comment, i) => {
          return (
            <Comment
              key={i}
              comment={comment}
            />
          );
        })}
      </div>
      <div className="p-4 border-t-2">
        <input
          type="text"
          placeholder="Comment..."
          className="input input-bordered input-sm w-full text-primary mb-2"
          value={commentBody}
          onChange={(e) => {
            setCommentBody(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && commentBody !== "") {
              axios
                .post(import.meta.env.VITE_SERVER_URL + "/comments", {
                  username: currentUsername,
                  post_id: post.id,
                  body: commentBody,
                })
                .then(() => {
                  getComments();
                })
                .catch((err) => {
                  console.error(err);
                });
              setCommentBody("");
            }
          }}
        />
      </div>
    </div>
  );
}

export default Post;
