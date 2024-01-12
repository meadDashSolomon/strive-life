import Feed from "./feed";

interface SocialProps {
  currentUsername: string;
}

/**
 * Social component that acts as a container for the Feed component.
 * @param {SocialProps} props - Properties including the current user's username.
 */
function Social({ currentUsername }: SocialProps) {
  return (
    <div>
      <Feed currentUsername={currentUsername} />
    </div>
  );
}

export default Social;
