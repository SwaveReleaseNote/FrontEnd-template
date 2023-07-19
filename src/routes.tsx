import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/tables";
import RTLDefault from "views/rtl/default";

// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
} from "react-icons/md";
import MyPage from "views/auth/MyPage";


import CreateProject from "views/admin/default/pages/CreateProject";
import ProjectDashboard from "views/admin/default/pages/ProjectDashboard";
import SearchProjectList from "views/admin/default/pages/SearchProjectList";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Create Project",
    layout: "/admin",
    path: "createProject",
    icon: <MdHome className="h-6 w-6" />,
    component: <CreateProject />,
  },
  {
    name: "Search ProjectList",
    layout: "/admin",
    path: "project/searchResult",
    icon: <MdHome className="h-6 w-6" />,
    component: <SearchProjectList />,
  },
  {
    name: "Project Dashboard",
    layout: "/admin",
    path: "dashboard", 
    icon: <MdHome className="h-6 w-6" />,
    component: <ProjectDashboard />, 
  },
  {
    name: "NFT Marketplace",
    layout: "/admin",
    path: "nft-marketplace",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <NFTMarketplace />,
    secondary: true,
  },
  {
    name: "Data Tables",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "data-tables",
    component: <DataTables />,
  },
  // {
  //   name: "Profile",
  //   layout: "/admin",
  //   path: "profile",
  //   icon: <MdPerson className="h-6 w-6" />,
  //   component: <Profile />,
  // },
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
    name: "RTL Admin",
    layout: "/rtl",
    path: "rtl",
    icon: <MdHome className="h-6 w-6" />,
    component: <RTLDefault />,
  },
];
export default routes;
