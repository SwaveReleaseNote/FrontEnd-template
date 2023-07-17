import React, { useState, useEffect, ReactElement } from "react";
import { useRecoilState } from "recoil";
import { loginState } from "./contexts/atom";
import axios from "axios";

function DepartmentSelect(): ReactElement {
  const [isLogined, setIsLogined] = useRecoilState(loginState);
  const [department, setDepartment] = useState(isLogined.department);
  const [showDepartmentRegisterModal, setShowDepartmentRegisterModal] =useState(false);
  
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setDepartment(value);
  };

  const [isDepartment, setIsDepartment] = useState(false);

  const handleClickSaveChangeButton = () => {
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
            <button type="button" onClick={handleClickSaveChangeButton}>
              Select Department
            </button>
          </div>
        </div>
  );
}

export default DepartmentSelect;