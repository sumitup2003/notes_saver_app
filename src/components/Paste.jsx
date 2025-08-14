import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes) || [];
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    if (window.confirm("Are you sure you want to delete this paste?")) {
      dispatch(removeFromPastes(pasteId));
      toast.success("Paste deleted");
    }
  }

  return (
    <div>
      <input
        className="p-2 rounded-2xl min-w-[600px] mt-5"
        type="search"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex flex-col gap-5 mt-5">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div className="border p-4 rounded-xl" key={paste?._id}>
              <div className="font-bold text-lg">{paste.title}</div>
              <div className="text-yellow-500">{paste.content}</div>

              <div className="flex flex-row gap-4 mt-3">
                {/* <Link to={`/?pasteId=${paste?._id}`} className="text-green-500">
                  Edit
                </Link> */}
                <Link to={`/pastes/${paste?._id}`} className="text-green-500">
                  View
                </Link>
                <button
                  onClick={() => handleDelete(paste?._id)}
                  className="text-red-500"
                >
                  Delete
                </button>
                {/* <button
                  className="text-green-500"
                  onClick={() => {
                    navigator.clipboard.writeText(paste?.content);
                    toast.success("Copied to clipboard");
                  }}
                >
                  Copy
                </button>
                <button className="text-green-500">Share</button> */}
              </div>

              <div className="text-sm text-yellow-500">{paste.createdAt}</div>
            </div>
          ))
        ) : (
          <p>No pastes found.</p>
        )}
      </div>
    </div>
  );
};

export default Paste;
