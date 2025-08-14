
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Paste from "./components/Paste";
import ViewPaste from "./components/ViewPaste";

const Layout = () => (
  <div>
    <Navbar />
    <div className="max-w-4xl mx-auto p-4">
      <Outlet />
    </div>
  </div>
);

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/pastes", element: <Paste /> },
      { path: "/pastes/:pasteId", element: <ViewPaste /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
