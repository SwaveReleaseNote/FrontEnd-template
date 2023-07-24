import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReactElement } from "react";
import axios from "axios";
import "./UserProfileCard.css";
import { useCookies } from 'react-cookie';
import {setCookie,getCookie} from './cookie'

function UserProfileCard(): ReactElement {

  const navigate = useNavigate();

  const [userName, setUserName] = useState(localStorage.getItem("name"));
  const [email, setEmail] = useState(localStorage.getItem("department"));
  const [phone, setPhone] = useState("0001-213-998761");
  const [department, setDepartment] = useState(
    localStorage.getItem("department")
  );
  const [mostViewed, setMostViewed] = useState("dolor sit amet.");
  const [showDepartmentRegisterModal, setShowDepartmentRegisterModal] =
    useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/auth/sign-in");
    } else {
      console.log(localStorage.getItem("department"));
      const cookieId = getCookie("id");
      console.log(cookieId);
      if (localStorage.getItem("department") === "null") {
        console.log("showdepartment");
        setShowDepartmentRegisterModal(true);
      }
      try {
        setUserName(localStorage.getItem("name"));
        setEmail(localStorage.getItem("email"));
        setDepartment(localStorage.getItem("department"));
      } catch (error) {
        alert("재로그인해주세요.");
        navigate("/auth");
        console.error(error);
      }
    }
  }, []);
  const handleUserUpdateFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(userName, email, phone, department, mostViewed);
    axios
      .put(
        "http://localhost:8080/api/user/update",
        {
          name: userName,
          email: email,
          phone: phone,
          department: department,
          mostViewed: mostViewed,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        console.log(response.data); // Process the response as needed
        localStorage.setItem("name", userName);
        localStorage.setItem("email", email);
        localStorage.setItem("department", department);
        setUserName(localStorage.getItem("name"));
        setEmail(localStorage.getItem("email"));
        setDepartment(localStorage.getItem("department"));
      })
      .catch((error) => {
        console.error(error);
        // Handle error cases here
      });
    console.log("Form submitted");
  };

  const handleChangeUserInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    switch (name) {
      case "name":
        setUserName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "phone":
        setPhone(value);
        break;
      case "mostViewed":
        setMostViewed(value);
        break;
      default:
        break;
    }
  };
  const handleSelectUserDepartmentChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setDepartment(value);
  };

  const [isDepartment, setIsDepartment] = useState(false);

  const handleClickSaveChangeButton = () => {
    axios
      .patch(
        "http://localhost:8080/api/user/updateDepartment",
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

  const handleModalClose = () => {
    setIsDepartment(false);
  };

  /* 유저 삭제 */
  const handleClickButtonDeleteUser = () => {
    console.log(localStorage.getItem("token"));
    axios
      .delete("http://localhost:8080/api/user/delete", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response.data); // Process the response as needed
        // Navigate to the authentication page or perform other necessary actions
        navigate("/auth");
      })
      .catch((error) => {
        console.error(error);
        // Handle error cases here
      });
  };

  return (
    <>
      <form onSubmit={handleUserUpdateFormSubmit}>
        <div className="wrapper h-full w-full" style={{ paddingTop: "10px" }}>
          <div className="left">
            <img src="https://i.imgur.com/cMy8V5j.png" alt="user" width="100" />
            <h3>Name</h3>
            <input
              type="text"
              name="name"
              value={userName}
              onChange={handleChangeUserInputChange}
              style={{
                background: "#01dbdf",
                textAlign: "center",
              }}
            />
          </div>
          <div className="right">
            <div className="info">
              <h3>Information</h3>
              <div className="info_data">
                <div className="data">
                  <h4>Email</h4>
                  <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={handleChangeUserInputChange}
                    size={30}
                  />
                </div>
                <div className="data">
                  <h4>Phone</h4>
                  <input
                    type="text"
                    name="phone"
                    value={phone}
                    onChange={handleChangeUserInputChange}
                  />
                </div>
              </div>
            </div>

            <div className="projects">
              <h3>Project</h3>
              <div className="projects_data">
                <div className="data">
                  <h4>Department</h4>
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
                <div className="data">
                  <h4>Most Viewed</h4>
                  <input
                    type="text"
                    name="mostViewed"
                    value={mostViewed}
                    onChange={handleChangeUserInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button type="submit" className="mr-2">
                Save
              </button>
              <div className="ml-auto">
                <button
                  type="button"
                  onClick={handleClickButtonDeleteUser}
                  className="text-red-600"
                >
                  Delete User
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
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

export default UserProfileCard;
