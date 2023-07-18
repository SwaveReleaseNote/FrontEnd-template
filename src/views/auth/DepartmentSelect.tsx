import React, { useState, useEffect, ReactElement } from "react";
import axios from "axios";


function DepartmentSelect(): ReactElement {
  const [department, setDepartment] = useState("------");
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setDepartment(value);
  };

  const handleSaveChanges = () => {
    axios
      .post("/user/department", { department })
      .then((response) => {
        // Handle the response if needed
      })
      .catch((error) => {
        // Handle the error if needed
      });
  };

  return (
    <div className="modal fade" id="exampleModal" role="dialog" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <select name="department" value={department} onChange={handleSelectChange}>
              <option value="Department 1">Department 1</option>
              <option value="Department 2">Department 2</option>
              <option value="Department 3">Department 3</option>
            </select>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>Save changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DepartmentSelect;