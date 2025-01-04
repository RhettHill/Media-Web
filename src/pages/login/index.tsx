import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserLogIn } from "@/Types";
import { Icons } from "@/components/ui/icons";
import { useNavigate } from "react-router";
import { useUserAuth } from "@/components/Context/userAuthContex";
import { Link } from "react-router-dom";

const initialValue: UserLogIn = {
  email: "",
  password: "",
};

interface IloginProps {}

const login: React.FunctionComponent<IloginProps> = () => {
  const { googleSignIn, login } = useUserAuth();
  const navigate = useNavigate();
  const [userLoginInfo, setUserLogInInfo] =
    React.useState<UserLogIn>(initialValue);
  const handleGoogleSignin = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/");
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log("The user info is: ", userLoginInfo);
      await login(userLoginInfo.email, userLoginInfo.password);
      navigate("/");
    } catch (error) {
      console.log("Error:", error);
    }
  };
  return (
    <div className="bg-gradient-to-br from-gray-500 to-gray-800 w-full h-screen">
      <div className="container mx-auto p-6 flex h-full justify-center items-center w-full">
        <div className=" min-w-80 max-w-80">
          <div className="p-6 w-2/3 hidden lg:block">
            <div className="grid grid-cols-2 gap-2"></div>
          </div>
          <div className="max-w-sm rounded-xl border bg-card text-card-foreground shadow-sm">
            <Card>
              <form onSubmit={handleSubmit}>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl text-center mb-4">
                    Log In
                  </CardTitle>
                  <CardDescription>Enter your email below</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid">
                    <Button variant="outline" onClick={handleGoogleSignin}>
                      <Icons.google className="mr-2 h-4 w-4" />
                      Google
                    </Button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Or
                      </span>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={userLoginInfo.email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setUserLogInInfo({
                          ...userLoginInfo,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Password"
                      value={userLoginInfo.password}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setUserLogInInfo({
                          ...userLoginInfo,
                          password: e.target.value,
                        })
                      }
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <Button className="w-full" type="submit">
                    Login
                  </Button>
                  <p className="mt-3 text-sm text-center">
                    Don't have an account ? <Link to="/signin">Sign up</Link>
                  </p>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default login;
