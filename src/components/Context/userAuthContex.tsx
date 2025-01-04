import { auth } from "@/FirebaseConfig";
import { ProfileInfo } from "@/types";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
  updateProfile,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

interface IUserAuthProviderProps {
  children: React.ReactNode;
}

type AuthContexData = {
  user: User | null;
  login: typeof login;
  signin: typeof signin;
  logOut: typeof logOut;
  googleSignIn: typeof googleSignIn;
  updateProfileInfo: typeof updateProfileInfo;
};

const login = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const signin = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};
const logOut = () => {
  return signOut(auth);
};

const googleSignIn = () => {
  const googleAuthProvider = new GoogleAuthProvider();
  return signInWithPopup(auth, googleAuthProvider);
};
const updateProfileInfo = (profileInfo: ProfileInfo) => {
  console.log("The user profile info is : ", profileInfo);
  return updateProfile(profileInfo.user!, {
    displayName: profileInfo.displayName,
    photoURL: profileInfo.photoURL,
  });
};

export const userAuthContext = createContext<AuthContexData>({
  user: null,
  login,
  signin,
  logOut,
  googleSignIn,
  updateProfileInfo,
});

export const UserAuthProvider: React.FunctionComponent<
  IUserAuthProviderProps
> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("I am in useEffect and user is : ", user);
      if (user) {
        console.log("The logged in user state is : ", user);
        setUser(user);
      }

      return () => {
        unsubscribe();
      };
    });
  });

  const value: AuthContexData = {
    user,
    login,
    signin,
    logOut,
    googleSignIn,
    updateProfileInfo,
  };

  return (
    <userAuthContext.Provider value={value}>
      {children}
    </userAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(userAuthContext);
};
