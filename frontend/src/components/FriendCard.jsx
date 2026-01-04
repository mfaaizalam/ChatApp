import { Link } from "react-router";
import { LANGUAGE_TO_FLAG } from "../constants";

const FriendCard = ({ friend }) => {
  return (
    <div className="card bg-base-200 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
      <div className="card-body p-4 flex flex-col flex-1">
        {/* USER INFO */}
        <div className="flex items-center gap-3 mb-3">
          <div className="avatar size-12 rounded-full overflow-hidden">
            <img src={friend.profilePic} alt={friend.fullName} />
          </div>
          <h3 className="font-semibold truncate text-base">{friend.fullName}</h3>
        </div>

        {/* LANGUAGES */}
        <div className="flex flex-col flex-wrap gap-2 mb-3">
          <div className="badge badge-secondary text-xs flex items-center gap-1">
            {getLanguageFlag(friend.nativeLanguage)}
            Native: {friend.nativeLanguage}
          </div>
          <div className="badge badge-outline text-xs flex items-center gap-1">
            {getLanguageFlag(friend.learningLanguage)}
            Learning: {friend.learningLanguage}
          </div>
        </div>

        {/* MESSAGE BUTTON */}
        <div className="mt-auto">
          <Link to={`/chat/${friend._id}`} className="btn btn-outline w-full">
            Message
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FriendCard;

export function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="h-3 mr-1 inline-block"
      />
    );
  }
  return null;
}
