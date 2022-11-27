import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import nationalityStore from "../stores/nationalityStore";
import "react-datepicker/dist/react-datepicker.css";
import { loadNationalities } from "../actions/nationalityActions";
import studentStore from "../stores/studentStore";
import * as studentActions from "../actions/studentActions";
import FamilyMember from "./familyMember";

function AddEditStudent(props) {
  const [student, setStudent] = useState({
    ID: null,
    firstName: "",
    lastName: "",
    dateOfBirth: null,
  });
  const [birthDate, setBirthDate] = useState(null);
  const [nationalities, setNationalities] = useState(
    nationalityStore.getNationalities()
  );

  const [studentNationality, setStudentNationality] = useState(
    studentStore.getStudentNationality()
  );

  const [familyMembers, setFamilyMembers] = useState(
    studentStore.getStudentfamilyMembers()
  );

  useEffect(() => {
    nationalityStore.addChangeListener(onChange);
    studentStore.addChangeListener(onChange);
    if (nationalityStore.getNationalities().length === 0) {
      loadNationalities();
    }

    if (props.selectedStudent) {
      setStudent(props.selectedStudent);
      studentActions.loadStudentDetails(props.selectedStudent.ID);
    }

    return () => {
      nationalityStore.removeChangeListener(onChange);
      studentStore.removeChangeListener(onChange);
      studentStore.resetStudentNationality();
      setStudent({});
      setStudentNationality(null);
    };
  }, [props.selectedStudent]);

  function onChange() {
    setNationalities(nationalityStore.getNationalities());
    setStudentNationality(studentStore.getStudentNationality());
    setFamilyMembers(studentStore.getStudentfamilyMembers());
  }

  function handleChange({ target }) {
    setStudent({ ...student, [target.name]: target.value });
  }

  function handleNationalityChange(e) {
    setStudentNationality(e.target.value);
  }

  function handleBirthDate(newDate) {
    setBirthDate(newDate);
    student.dateOfBirth = newDate;
  }
  function handleSubmit(event) {
    event.preventDefault();
    studentActions
      .saveStudent({
        ...student,
        nationality: studentNationality,
        familyMembers: familyMembers,
      })
      .then(() => {
        props.handleClose();
      });
  }

  function handleAddNewFamilyMember() {
    let newMember = {
      ID: 0,
      firstName: "",
      lastName: "",
      dateOfBirth: null,
      nationality: "",
    };
    setFamilyMembers([...familyMembers, newMember]);

    console.log(familyMembers);
  }

  return (
    <>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">
            First Name
          </label>
          <input
            name="firstName"
            type="text"
            className="form-control"
            value={student.firstName}
            id="inputEmail4"
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputPassword4" className="form-label">
            Last Name
          </label>
          <input
            name="lastName"
            type="text"
            className="form-control"
            value={student.lastName}
            id="inputPassword4"
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">
            Date of Birth
          </label>
          <DatePicker
            className="form-control"
            selected={new Date(student.dateOfBirth)}
            onChange={(date) => handleBirthDate(date)}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputPassword4" className="form-label">
            Nationality
          </label>
          <select
            name="nationality"
            value={studentNationality || ""}
            onChange={handleNationalityChange}
            className="form-select"
            id="floatingSelect"
            aria-label="Floating label select example"
          >
            <option value="">Select</option>
            {nationalities.map((nationality) => (
              <option
                name={nationality.ID}
                key={nationality.ID}
                value={nationality.ID}
              >
                {nationality.Title}
              </option>
            ))}
          </select>
        </div>
        <div className="col-12">
          <h4>Family Members</h4>
          {familyMembers.map((familyMember) => {
            return (
              <FamilyMember
                key={familyMember.ID}
                familyMember={familyMember}
                nationalities={nationalities}
                handleChange={handleChange}
              />
            );
          })}
        </div>
        <div className="col-12">
          <button
            type="button"
            className="btn btn-success"
            onClick={handleAddNewFamilyMember}
          >
            Add New Family Member
          </button>
        </div>
        <div className="col-12 float-right">
          <button
            type="submit"
            className="btn btn-primary btn-md center-block mx-2"
          >
            Submit
          </button>
          <button
            type="button"
            className="btn btn-danger btn-md center-block mx-2"
            onClick={() => props.handleClose()}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}

export default AddEditStudent;
