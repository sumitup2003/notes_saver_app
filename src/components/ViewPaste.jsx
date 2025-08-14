import React from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const ViewPaste = () => {
  const { pasteId } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes) || [];
  const paste = allPastes.find((p) => p._id === pasteId);

  if (!paste) {
    return (
      <div className="p-5">
        <p className="text-red-500">Paste not found.</p>
        <Link to="/" className="text-blue-500 underline">
          Go back
        </Link>
      </div>
    );
  }

  const formattedDate = new Date(paste.createdAt).toLocaleString();

  const handleCopy = () => {
    navigator.clipboard
      .writeText(paste.content)
      .then(() => toast.success("Copied to clipboard"))
      .catch(() => toast.error("Failed to copy"));
  };

  const handleShare = () => {
    const shareLink = `${window.location.origin}/pastes/${paste._id}`;
    if (navigator.share) {
      navigator.share({
        title: paste.title,
        text: "Check out this paste!",
        url: shareLink,
      }).catch(() => {});
    } else {
      navigator.clipboard
        .writeText(shareLink)
        .then(() => toast.success("Share link copied"))
        .catch(() => toast.error("Failed to copy link"));
    }
  };

  return (
    <div className="p-5 max-w-3xl mx-auto border rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-4">{paste.title}</h1>
      <pre className=" break-words bg-black-100 p-4 rounded-lg">
        {paste.content}
      </pre>

      <div className="mt-4 text-sm text-gray-500">
        Created at: {formattedDate}
      </div>

      <div className="flex gap-4 mt-5 flex-wrap">
        <button
          onClick={handleCopy}
          className="bg-green-500 text-black px-4 py-2 rounded-lg"
        >
          Copy Content
        </button>
        <button
          onClick={handleShare}
          className="bg-blue-500 text-black px-4 py-2 rounded-lg"
        >
          Share Link
        </button>
        <Link
          to={`/?pasteId=${paste._id}`}
          className="bg-yellow-500 text-black px-4 py-2 rounded-lg"
        >
          Edit
        </Link>
      </div>
    </div>
  );
};

export default ViewPaste;
