import { useState, useEffect } from "react";
import nationalityStore from "../stores/nationalityStore";
import "react-datepicker/dist/react-datepicker.css";
import { loadNationalities } from "../actions/nationalityActions";
import studentStore from "../stores/studentStore";
import * as studentActions from "../actions/studentActions";
import FamilyMember from "./familyMember";
import * as roleManager from "../api/roleUtil";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function AddEditStudent(props) {
  const [student, setStudent] = useState({
    ID: null,
    firstName: "",
    lastName: "",
    dateOfBirth: null,
  });
  const [birthDate, setBirthDate] = useState(null);
  const [disabled, setDisabled] = useState(false);
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
      setStudent({ ...props.selectedStudent });
      studentActions.loadStudentDetails(props.selectedStudent.ID);
      setDisabled(roleManager.getRole() === "admin");
    }

    return () => {
      nationalityStore.removeChangeListener(onChange);
      studentStore.removeChangeListener(onChange);
      studentStore.resetStudentNationality();
      // setStudent({});
      // setStudentNationality(null);
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
      nationality: { ID: "1" },
      relationship: "Parent",
    };
    setFamilyMembers([...familyMembers, newMember]);

    console.log(familyMembers);
  }

  return (
    <form className="row g-3" onSubmit={handleSubmit}>
      <div className="col-md-6">
        <TextField
          required
          id="firstName"
          name="firstName"
          label="First Name"
          onChange={handleChange}
          value={student.firstName}
          disabled={disabled}
        />
      </div>
      <div className="col-md-6">
        <TextField
          required
          id="lastName"
          label="Last Name"
          name="lastName"
          onChange={handleChange}
          value={student.lastName}
          disabled={disabled}
        />
      </div>
      <div className="col-md-6">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date of Birth"
            disabled={disabled}
            value={new Date(student.dateOfBirth)}
            onChange={(date) => handleBirthDate(date)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
      <div className="col-md-6">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Nationality</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={studentNationality || ""}
            label="Nationality"
            onChange={handleNationalityChange}
            disabled={disabled}
          >
            {nationalities.map((nationality) => (
              <MenuItem
                name={nationality.ID}
                key={nationality.ID}
                value={nationality.ID}
              >
                {nationality.Title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="col-12">
        <Box
          sx={{
            borderRadius: 1,
            border: 1,
          }}
        >
          <h4>Family Members</h4>
          {familyMembers.map((familyMember) => {
            return (
              <FamilyMember
                key={familyMember.ID}
                familyMember={familyMember}
                nationalities={nationalities}
                handleChange={handleChange}
                disabled={disabled}
              />
            );
          })}
        </Box>
      </div>
      <div className="col-12">
        <button
          type="button"
          className="btn btn-success"
          onClick={handleAddNewFamilyMember}
          disabled={disabled}
        >
          Add New Family Member
        </button>
      </div>
      <div className="col-12 float-right">
        <button
          type="submit"
          className="btn btn-primary btn-md center-block mx-2"
          disabled={disabled}
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
  );
}

export default AddEditStudent;
