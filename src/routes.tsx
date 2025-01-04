import { createBrowserRouter } from "react-router-dom";
import CreatePost from "./pages/Post";
import MyPhotos from "./pages/MyPhotos";
import Profile from "./pages/Profile";
import Signin from "./pages/signin";
import Error from "./pages/error";
import Home from "./pages/home";
import ProtectedRoutes from "./components/ui/ProtectedRoutes";
import Login from "./pages/login";
import EditProfile from "./pages/Profile/editProfile";

export const router = createBrowserRouter([
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/MyPhotos",
        element: <MyPhotos />,
        errorElement: <Error />,
      },
      {
        path: "/Profile",
        element: <Profile />,
        errorElement: <Error />,
      },
      {
        path: "/edit-profile",
        element: <EditProfile />,
        errorElement: <Error />,
      },
      {
        path: "/post",
        element: <CreatePost />,
        errorElement: <Error />,
      },
      {
        path: "/",
        element: <Home />,
        errorElement: <Error />,
      },
    ],
  },

  {
    path: "/signin",
    element: <Signin />,
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
]);
