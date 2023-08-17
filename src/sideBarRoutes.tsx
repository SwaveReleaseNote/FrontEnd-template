import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default/MainPage";
import ReleaseNote from "views/admin/marketplace";

// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdPerson,
  MdLock,
} from "react-icons/md";
import MyPage from "views/auth/MyPage";


import CreateProject from "views/admin/default/pages/CreateProject";
import EditableNote from "./components/noteEdit/EditableNote";

const sideBarRoutes = [
  {
    name: "Release Note",
    layout: "/admin",
    path: "release-note",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <ReleaseNote />,
    secondary: true,
  },
  {
    name: "Main Page",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Create Project",
    layout: "/admin",
    path: "project/create",
    icon: <MdHome className="h-6 w-6" />,
    component: <CreateProject />,
  },
  {
    name: "My Page",
    layout: "/admin",
    path: "mypage",
    icon: <MdPerson className="h-6 w-6" />,
    component: <MyPage />,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
  },
  {
    name: "Create Release Note",
    layout: "/admin",
    path: "create-note",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <EditableNote />,
  }
];
export default sideBarRoutes;
