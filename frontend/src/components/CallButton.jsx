import { VideoIcon } from "lucide-react";

function CallButton({ handleVideoCall }) {
  return (
    <div className="fixed top-20 right-4 z-50">
      <button
        onClick={handleVideoCall}
        className="btn btn-success btn-sm text-white shadow-lg"
      >
        <VideoIcon className="w-6 h-6" />
      </button>
    </div>
  );
}

export default CallButton;