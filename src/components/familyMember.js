import { useState } from "react";
import DatePicker from "react-datepicker";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import * as studentActions from "../actions/studentActions";

export default function FamilyMember(props) {
  const [birthDate, setBirthDate] = useState(null);
  const [familyMember, setFamilyMember] = useState(props.familyMember);
  const [firstName, setFirstName] = useState(props.familyMember.firstName);
  const [lastName, setLastName] = useState(props.familyMember.lastName);
  const [relationship, setRelationship] = useState(
    props.familyMember.relationship
  );

  const [nationality, setNationality] = useState(
    props.familyMember?.nationality
  );
  function handleBirthDate(newDate) {
    setBirthDate(newDate);
    setFamilyMember({ ...familyMember, dateOfBirth: newDate });
    props.familyMember.dateOfBirth = newDate;
  }

  function handleFirstName(e) {
    setFirstName(e.target.value);
    setFamilyMember({ ...familyMember, firstName: e.target.value });
    props.familyMember.firstName = e.target.value;
  }

  function handleLastName(e) {
    setLastName(e.target.value);
    setFamilyMember({ ...familyMember, lastName: e.target.value });
    props.familyMember.lastName = e.target.value;
  }

  function handleNationalityChange(e) {
    setNationality(e.target.value);
    setFamilyMember({ ...familyMember, nationality: e.target.value });
    props.familyMember.nationality = e.target.value;
  }

  function handleRelationshipChange(e) {
    setRelationship(e.target.value);
    setFamilyMember({ ...familyMember, relationship: e.target.value });
    props.familyMember.relationship = e.target.value;
  }

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>
          {props.familyMember.firstName + " " + props.familyMember.lastName}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div className="row">
          <div className="col-md-6">
            <label htmlFor="inputEmail4" className="form-label">
              First Name
            </label>
            <input
              name="firstName"
              type="text"
              className="form-control"
              value={familyMember.firstName}
              id="inputEmail4"
              onChange={handleFirstName}
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
              value={familyMember.lastName}
              id="inputPassword4"
              onChange={handleLastName}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label htmlFor="inputEmail4" className="form-label">
              Date of Birth
            </label>
            <DatePicker
              className="form-control"
              selected={new Date(familyMember.dateOfBirth)}
              onChange={(date) => handleBirthDate(date)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputPassword4" className="form-label">
              Nationality
            </label>
            <select
              name="nationality"
              value={familyMember.nationality}
              className="form-select"
              id="floatingSelect"
              aria-label="Floating label select example"
              onChange={handleNationalityChange}
            >
              <option value="">Select</option>
              {props.nationalities.map((nationality) => (
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
        </div>
        <div className="row">
          <div className="col-md-6">
            <label htmlFor="inputPassword4" className="form-label">
              Relationship
            </label>
            <select
              name="nationality"
              value={familyMember.relationship}
              className="form-select"
              id="floatingSelect"
              aria-label="Floating label select example"
              onChange={handleRelationshipChange}
            >
              <option value="Parent">Parent</option>
              <option value="Sibling">Sibling</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="offset-md-9 col-md-6 allign-right float-end">
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => studentActions.deleteFamilyMember(familyMember.ID)}
            >
              Delete
            </button>
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
