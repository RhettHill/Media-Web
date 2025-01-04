import * as React from "react";
import homeIcon from "@/assets/Icons/homeIcon.svg";
import profileIcon from "@/assets/Icons/profile.svg";
import myphotoIcon from "@/assets/Icons/myPhotos.svg";
import addIcon from "@/assets/Icons/add.svg";
import notificationIcon from "@/assets/Icons/notification.svg";
import SettingsIcon from "@/assets/Icons/settings.svg";
import LogOutIcon from "@/assets/Icons/Logout.svg";
import directIcon from "@/assets/Icons/Direct.svg";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { useUserAuth } from "../Context/userAuthContex";

interface ISidebarProps {}

const navItems = [
  {
    name: "home",
    link: "/",
    icon: homeIcon,
  },
  {
    name: "Profile",
    link: "/Profile",
    icon: profileIcon,
  },
  {
    name: "My Photos",
    link: "/MyPhotos",
    icon: myphotoIcon,
  },
  {
    name: "Add Photos",
    link: "/post",
    icon: addIcon,
  },
  {
    name: "Notification",
    link: "#",
    icon: notificationIcon,
  },
  {
    name: "Direct",
    link: "#",
    icon: directIcon,
  },

  {
    name: "Settings",
    link: "#",
    icon: SettingsIcon,
  },
];

const Sidebar: React.FunctionComponent<ISidebarProps> = () => {
  const { pathname } = useLocation();
  const { logOut } = useUserAuth();
  return (
    <nav className="flex flex-col relative h-screen max-w-sm w-full">
      <div className="flex justify-center m-5">
        <div className="text-white text-lg">Pages</div>
      </div>
      {navItems.map((item) => (
        <div
          className={cn(
            buttonVariants({ variant: "default" }),
            pathname === item.link
              ? "bg-white text-white-800 hover:bg-white rounded-none"
              : "hover:bg-slate-950 hover:text-white bg-transparent rounded-none",
            "justify-start"
          )}
          key={item.name}
        >
          <Link to={item.link} className="flex">
            <span>
              <img
                src={item.icon}
                className="w-5 h-5 mr-2"
                alt={item.name}
                style={{
                  filter: `${
                    pathname == item.link ? "invert(0)" : "invert(1)"
                  }`,
                }}
              />
            </span>
            <span>{item.name}</span>
          </Link>
        </div>
      ))}
      <div
        className={cn(
          buttonVariants({ variant: "default" }),
          pathname === "/login"
            ? "bg-white text-white-800 hover:bg-white rounded-none"
            : "hover:bg-slate-950 hover:text-white bg-transparent rounded-none",
          "justify-start"
        )}
      >
        <Link to="/login" className="flex" onClick={logOut}>
          <span>
            <img
              src={LogOutIcon}
              className="w-5 h-5 mr-2"
              alt="Log Out"
              style={{
                filter: `${pathname == "/login" ? "invert(0)" : "invert(1)"}`,
              }}
            />
          </span>
          <span>Log Out</span>
        </Link>
      </div>
    </nav>
  );
};

export default Sidebar;
