import React, { useState,useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "components/navbar";
import Sidebar from "components/sidebar";
import Footer from "components/footer/Footer";
import routes from "routes";
import axios from "axios";
import ProjectDashboard from "views/admin/default/pages/ProjectDashboard";
import { getCookie } from "views/auth/cookie";

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
            <Route path={`/${prop.path}`} element={prop.component} key={key} />
          );
        }
      } else {
        return null;
      }
    });
  };

  document.documentElement.dir = "ltr";

  window.addEventListener("unload", (event) => {
    // 페이지가 완전히 떠난 후에 실행되는 작업을 수행할 수 있습니다.
    try {
      axios
        .patch(
          "http://localhost:8080/api/user/status",
          {
            loginState: false,
          },
          {
            headers: {
              Authorization: getCookie("id"),
            },
          }
        )
        .then((response) => {
          console.log(response.data); // Process the response as needed
        })
        .catch((error) => {
          console.error(error);
          // Handle error cases here
        });
    } catch (error) {
      console.error(error);
    }
    alert("정말 종료하시겠습니까?");
  });

  /*department 설정*/
  const [showDepartmentRegisterModal, setShowDepartmentRegisterModal] =useState(false);
  const [isDepartment, setIsDepartment] = useState(false);
  const [department, setDepartment] = useState(
    localStorage.getItem("department")
  );

  useEffect(() => {
      if (localStorage.getItem("department") === "null") {
        console.log("showdepartment");
        setShowDepartmentRegisterModal(true);
      }
  }, []);

  const handleModalClose = () => {
    setIsDepartment(false);
  };

  const handleSelectUserDepartmentChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setDepartment(value);
  };

  const handleClickSaveChangeButton = () => {
    axios
      .patch(
        "http://localhost:8080/api/user",
        {
          department: department,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        console.log(response.data); // Process the response as needed
        localStorage.setItem("department", department);
        setDepartment(localStorage.getItem("department"));
      })
      .catch((error) => {
        console.error(error);
        // Handle error cases here
      });
    setShowDepartmentRegisterModal(false);
  };


  return (
    <>
    <div className="flex h-full w-full">
      {open ? <Sidebar open={open} onClose={() => setOpen(false)} /> : null}
      {/* Navbar & Main Content */}
      <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
        {/* Main Content */}
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
    {showDepartmentRegisterModal && (
        <div className="userprofileCard-modal-overlay">
          <div className="userprofileCard-modal-content">
            <span className="userprofileCard-close" onClick={handleModalClose}>
              &times;
            </span>
            <h2>Select Department</h2>
            {/* Department selection options */}
            <div className="modal-body">
              <select
                name="department"
                value={department}
                onChange={handleSelectUserDepartmentChange}
              >
                <option value="Department 1">Department 1</option>
                <option value="Department 2">Department 2</option>
                <option value="Department 3">Department 3</option>
              </select>
            </div>
            <button type="button" onClick={handleClickSaveChangeButton}>
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
}
