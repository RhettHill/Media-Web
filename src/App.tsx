import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import * as React from "react";
import "./index.css";
import { UserAuthProvider } from "./components/Context/userAuthContex";

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = () => {
  return (
    <UserAuthProvider>
      <RouterProvider router={router} />
    </UserAuthProvider>
  );
};

export default App;
