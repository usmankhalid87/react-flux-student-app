import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import AddEditStudent from "./addEditStudent";
import * as roleManager from "../api/roleUtil";
import studentStore from "../stores/studentStore";

function StudentsList(props) {
  const [show, setShow] = useState(false);
  const [role, setRole] = useState("admin");
  const [modalTitle, setModalTitle] = useState("");
  const [student, setStudent] = useState({});
  const handleClose = () => setShow(false);
  const handleRole = (event) => {
    setRole(event.target.value);
    roleManager.setRole(event.target.value);
  };
  const handleShow = (student) => {
    if (student) setModalTitle("Edit Student Details");
    else {
      studentStore.resetFamilyMembers();
      setModalTitle("Add Student");
    }
    setStudent(student);
    setShow(true);
  };

  useEffect(() => {
    roleManager.setRole(role);
  }, [role]);

  return (
    <>
      <div className="row">
        <div className="col-md-6">
          {roleManager.getRole() === "admin" && (
            <a
              className="btn btn-primary"
              href="/#"
              onClick={() => handleShow(null)}
            >
              Add Student
            </a>
          )}
        </div>
        <div className="col-md-6">
          <select
            name="nationality"
            value={role}
            className="form-select"
            id="floatingSelect"
            aria-label="Floating label select example"
            onChange={handleRole}
          >
            <option value="admin">Admin</option>
            <option value="registrar">Registrar</option>
          </select>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Birth Date</th>
            <td>&nbsp;</td>
          </tr>
        </thead>
        <tbody>
          {props.students.map((student) => {
            return (
              <tr key={student.ID}>
                <td>
                  <a href="/#" onClick={() => handleShow(student)}>
                    {student.ID}
                  </a>
                </td>
                <td>
                  <a href="/#" onClick={() => handleShow(student)}>
                    {student.firstName}
                  </a>
                </td>
                <td>
                  <a href="/#" onClick={() => handleShow(student)}>
                    {student.lastName}
                  </a>
                </td>
                <td>
                  <a href="/#" onClick={() => handleShow(student)}>
                    {new Date(student.dateOfBirth).toDateString()}
                  </a>
                </td>
                <td>
                  {roleManager.getRole() === "registrar" && (
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => handleShow(student)}
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Modal show={show}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddEditStudent selectedStudent={student} handleClose={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  );
}

StudentsList.propTypes = {
  students: PropTypes.arrayOf(
    PropTypes.shape({
      ID: PropTypes.number.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
    })
  ).isRequired,
};

StudentsList.defaultProps = {
  students: [],
};

export default StudentsList;
