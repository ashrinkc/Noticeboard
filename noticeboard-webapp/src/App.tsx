import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import CreateClass from "./pages/CreateClass";
import JoinClass from "./pages/JoinClass";
import Notices from "./pages/Notices";

function App() {
  const user = localStorage.getItem("user");
  const Layout = () => {
    return (
      <>
        <Navbar />
        <Outlet />
      </>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: user ? <Layout /> : <Navigate to="/login" replace />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/n/:id",
          element: <Notices />,
        },
        {
          path: "/create",
          element: <CreateClass />,
        },
        {
          path: "/join",
          element: <JoinClass />,
        },
      ],
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: !user ? <Login /> : <Navigate to="/" replace />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
