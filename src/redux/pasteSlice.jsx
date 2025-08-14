import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const loadPastes = () => {
  const stored = localStorage.getItem("pastes");
  return stored ? JSON.parse(stored) : [];
};

const savePastes = (pastes) => {
  localStorage.setItem("pastes", JSON.stringify(pastes));
};

const initialState = {
  pastes: loadPastes(),
};

export const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;

      if (!paste.title.trim()) {
        toast.error("Title cannot be empty!");
        return;
      }

      state.pastes.push(paste);
      savePastes(state.pastes);
      toast.success("Paste created!");
    },

    updateToPastes: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id);

      if (index >= 0) {
        state.pastes[index] = paste;
        savePastes(state.pastes);
        toast.success("Paste updated!");
      }
    },

    resetAllPastes: (state) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
      toast.success("All pastes cleared!");
    },

    removeFromPastes: (state, action) => {
      const pasteId = action.payload;
      const newPastes = state.pastes.filter((item) => item._id !== pasteId);

      if (newPastes.length !== state.pastes.length) {
        state.pastes = newPastes;
        savePastes(state.pastes);
        toast.success("Paste deleted!");
      }
    },
  },
});

export const {
  addToPastes,
  updateToPastes,
  resetAllPastes,
  removeFromPastes,
} = pasteSlice.actions;

export default pasteSlice.reducer;
