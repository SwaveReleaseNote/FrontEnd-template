import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "components/navbar";
import Sidebar from "components/sidebar";
import Footer from "components/footer/Footer";
import routes from "routes";

import ProjectDashboard from "views/admin/default/pages/ProjectDashboard";

export default function Admin(props: { [x: string]: any }) {
  const { ...rest } = props;
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const [currentRoute, setCurrentRoute] = React.useState("Main Dashboard");

  React.useEffect(() => {
    getActiveRoute(routes);
    console.log(location.pathname);
    if (location.pathname === "/admin/default") {
      setOpen(false);
    } else if (location.pathname === "/admin/createProject") {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [location.pathname]);
  React.useEffect(() => {
    console.log(open);
  }, [open]);

  const getActiveRoute = (routes: RoutesType[]): string | boolean => {
    let activeRoute = "Main Dashboard";
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(
          routes[i].layout + "/" + routes[i].path
        ) !== -1
      ) {
        setCurrentRoute(routes[i].name);
      }
    }
    return activeRoute;
  };
  const getActiveNavbar = (routes: RoutesType[]): string | boolean => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i].secondary;
      }
    }
    return activeNavbar;
  };

  const getRoutes = (routes: RoutesType[]): any => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        if (prop.path === "dashboard/:projectId/:role") {
          return (
            <Route
              path={`/${prop.path}`}
              element={<ProjectDashboard />}
              key={key}
            />
          );
        } else {
          return (
            <Route
              path={`/${prop.path}`}
              element={prop.component}
              key={key}
            />
          );
        }
      } else {
        return null;
      }
    });
  };

  document.documentElement.dir = "ltr";
  return (
    <div className="flex h-full w-full">
      {open ? <Sidebar open={open} onClose={() => setOpen(false)} /> : null}
      {/* Navbar & Main Content */}
      <div className="h-full w-fvmfhwull bg-lightPrimary dark:!bg-navy-900">
        {/* Main Content */}
        {/* ml-auto로 조정시 전체 width 사용 before - 313px*/}
        <main
          className={`mx-12 h-full flex-none transition-all md:pr-2 ${
            open ? "xl:ml-[313px]" : "xl:ml-[150px]]"
          }`}
        >
          {/* Routes */}
          <div className="h-full">
            <Navbar
              onOpenSidenav={() => setOpen(true)}
              brandText={currentRoute}
              secondary={getActiveNavbar(routes)}
              {...rest}
            />
            <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
              <Routes>
                {/* TODO: routes.tsx에 프로젝트 리스트 선택할 수 있도록 추가
                     */}
                {getRoutes(routes)}

                <Route
                  path="/"
                  element={<Navigate to="/admin/default" replace />}
                />
              </Routes>
            </div>
            <div className="p-3">
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
