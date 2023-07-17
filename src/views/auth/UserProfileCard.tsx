import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReactElement } from "react";
import { useRecoilState } from "recoil";
import { loginState } from "./contexts/atom";
import axios from "axios";
import "./UserProfileCard.css";
function UserProfileCard(): ReactElement {
  const navigate = useNavigate();
  const [isLogined, setIsLogined] = useRecoilState(loginState);

  const [userName, setUserName] = useState(isLogined.name);
  const [email, setEmail] = useState(isLogined.email);
  const [phone, setPhone] = useState("0001-213-998761");
  const [department, setDepartment] = useState(isLogined.department);
  const [mostViewed, setMostViewed] = useState("dolor sit amet.");

  const [tempName, setTempName] = useState(isLogined.name);
  const [tempInfo, setTempInfo] = useState(isLogined.info);
  const [tempEmail, setTempEmail] = useState(isLogined.email);
  const [showDepartmentRegisterModal, setShowDepartmentRegisterModal] =useState(false);

  useEffect(() => {
    console.log(isLogined.token);
    console.log(isLogined.department);
    console.log(localStorage.getItem("token"));
    if (isLogined.department === "") {
      console.log("showdepartment");
      setShowDepartmentRegisterModal(true);
    }
    try {
      axios
        .get(`http://localhost:8080/api/user/me`, {
          headers: {
            Authorization: isLogined.token,
          },
        })
        .then((response) => {
          //api의 응답을 제대로 받은경우
          console.log(response);
          console.log(response.data);
          setIsLogined((prev) => {
            return {
              state: true,
              name: response.data.username,
              email: response.data.email,
              info: "",
              department: response.data.department,
              token: String(isLogined.token),
            };
          });
        })
        .catch((error) => {
          alert("재로그인해주세요.");
          navigate("/auth");
          console.error(error);
        });
    } catch (e) {
      alert("재로그인해주세요.");
      navigate("/auth");
      console.error(e);
    }
  }, []);
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(userName, email, phone, department, mostViewed);
    axios
      .put("http://localhost:8080/api/user/update", {
        name:userName,
        email:email,
        phone:phone,
        department:department,
        mostViewed:mostViewed,
      },
      {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': isLogined.token
        }
    })
      .then((response) => {
        console.log(response.data); // Process the response as needed
      })
      .catch((error) => {
        console.error(error);
        // Handle error cases here
      });
    console.log("Form submitted");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

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
      case "department":
        setDepartment(value);
        break;
      case "mostViewed":
        setMostViewed(value);
        break;
      default:
        break;
    }
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDepartment(value);
  };


  const [isDepartment, setIsDepartment] = useState(false);


  const handleModalSave = () => {
    axios
      .patch("http://localhost:8080/api/user/updateDepartment", {
        department:department
      },
      {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': isLogined.token
        }
    })
      .then((response) => {
        console.log(response.data); // Process the response as needed
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
  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className="wrapper h-full w-full" style={{ paddingTop: '10px' }}>
          <div className="left">
            <img src="https://i.imgur.com/cMy8V5j.png" alt="user" width="100" />
            <h3>Name</h3>
            <input
              type="text"
              name="name"
              value={userName}
              onChange={handleInputChange}
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
                    onChange={handleInputChange}
                  />
                </div>
                <div className="data">
                  <h4>Phone</h4>
                  <input
                    type="text"
                    name="phone"
                    value={phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div className="projects">
              <h3>Project</h3>
              <div className="projects_data">
                <div className="data">
                  <h4>Department</h4>
                  {/* <input
                  type="text"
                  name="department"
                  value={department}
                  onChange={handleInputChange}
                /> */}
                  <select
                    name="department"
                    value={department}
                    onChange={handleSelectChange}
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
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <button type="submit">Save</button>
          </div>
        </div>
        {/* <button type="button" onClick={() => setIsDepartment(true)}>
  Select Department
</button> */}
      </form>
      {showDepartmentRegisterModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close" onClick={handleModalClose}>
              &times;
            </span>
            <h2>Select Department</h2>
            {/* Department selection options */}
            <div className="modal-body">
              <select
                name="department"
                value={department}
                onChange={handleSelectChange}
              >
                <option value="Department 1">Department 1</option>
                <option value="Department 2">Department 2</option>
                <option value="Department 3">Department 3</option>
              </select>
            </div>
            <button type="button" onClick={handleModalSave}>
              Select Department
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default UserProfileCard;
