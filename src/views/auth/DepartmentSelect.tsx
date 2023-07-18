import React, { useState, useEffect, ReactElement } from "react";
import { useRecoilState } from "recoil";
import { loginState } from "./contexts/atom";
import axios from "axios";

function DepartmentSelect(): ReactElement {
  const [isLogined, setIsLogined] = useRecoilState(loginState);
  const [department, setDepartment] = useState(isLogined.department);
  const [showDepartmentRegisterModal, setShowDepartmentRegisterModal] =
    useState(false);
  const [isDepartment, setIsDepartment] = useState(false);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setDepartment(value);
  };

  const handleSaveChanges = () => {
    axios
      .patch(
        "http://localhost:8080/api/user/updateDepartment",
        {
          department: department,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: isLogined.token,
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
    setShowDepartmentRegisterModal(false);
  };

  const handleModalClose = () => {
    setIsDepartment(false);
  };

  return (
    <div
      className="modal fade"
      id="exampleModal"
      role="dialog"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Modal title
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
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
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSaveChanges}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DepartmentSelect;
