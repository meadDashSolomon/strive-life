import { commentInterface } from "./interfaces";

interface CommentProps {
  comment: commentInterface;
}

/**
 * Comment component for displaying a single comment.
 * @param {CommentProps} props - Includes the comment data.
 */
function Comment({ comment }: CommentProps) {
  return (
    <div className="w-full flex flex-row pl-8 p-2">
      <div>
        {/* User profile picture */}
        <img
          className="w-12 h-12 rounded-full m-auto"
          src={
            comment.user.profile_pic ||
            "https://upload.wikimedia.org/wikipedia/commons/b/b5/Windows_10_Default_Profile_Picture.svg"
          }
          alt={`Profile of ${comment.user.username}`}
        />
        {/* Username */}
        <div className="text-xs">{comment.user.username}</div>
      </div>
      {/* Comment body */}
      <div className="w-full ml-2 p-2 text-sm">{comment.body}</div>
    </div>
  );
}

export default Comment;
