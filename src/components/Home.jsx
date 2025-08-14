import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");

  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  // Load paste data if editing
  useEffect(() => {
    if (pasteId && allPastes.length > 0) {
      const paste = allPastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, allPastes]);

  function createOrUpdatePaste() {
    const existingPaste = allPastes.find((p) => p._id === pasteId);

    const paste = {
      title: title.trim(),
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: pasteId
        ? existingPaste?.createdAt || new Date().toISOString()
        : new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    // Reset form
    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <div>
      <div className="flex flex-row gap-7 place-content-between">
        <input
          className="p-2 rounded-2xl mt-2 w-[65%] pl-5 bg-yellow-200 text-gray-950"
          type="text"
          placeholder="Enter a title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          onClick={createOrUpdatePaste}
          className={`p-2 rounded-2xl mt-2 ${
            pasteId ? "bg-blue-400" : "bg-green-400  text-gray-950"
          }`}
        >
          {pasteId ? "Update" : "Create"}
        </button>
      </div>

      <div>
        <textarea
          className="rounded-2xl mt-8 min-w-[500px] p-4  bg-gray-100 text-gray-950"
          value={value}
          placeholder="Enter text here"
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  );
};

export default Home;
