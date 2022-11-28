import { useState } from "react";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import * as studentActions from "../actions/studentActions";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function FamilyMember(props) {
  const [birthDate, setBirthDate] = useState(null);
  const [familyMember, setFamilyMember] = useState(props.familyMember);
  const [firstName, setFirstName] = useState(props.familyMember.firstName);
  const [lastName, setLastName] = useState(props.familyMember.lastName);
  const [relationship, setRelationship] = useState(
    props.familyMember.relationship
  );

  const [nationality, setNationality] = useState("");
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
    setFamilyMember({ ...familyMember, nationality: { ID: e.target.value } });
    props.familyMember.nationality = { ID: e.target.value };
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
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First Name"
              onChange={handleFirstName}
              disabled={props.disabled}
              value={familyMember.firstName}
            />
          </div>
          <div className="col-md-6">
            <TextField
              required
              id="lastName"
              label="Last Name"
              name="lastName"
              value={familyMember.lastName}
              onChange={handleLastName}
              disabled={props.disabled}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date of Birth"
                disabled={props.disabled}
                value={new Date(familyMember.dateOfBirth)}
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
                name="nationality"
                value={familyMember?.nationality?.ID}
                label="Nationality"
                onChange={handleNationalityChange}
                disabled={props.disabled}
              >
                <MenuItem value="">
                  <em>Select</em>
                </MenuItem>
                {props.nationalities.map((nationality) => (
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
        </div>
        <div className="row mt-3">
          <div className="col-md-6">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Relationship
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="relationship"
                value={familyMember.relationship}
                label="relationship"
                onChange={handleRelationshipChange}
                disabled={props.disabled}
              >
                <MenuItem name="Parent" key="parent" value="Parent">
                  Parent
                </MenuItem>
                <MenuItem name="Sibling" key="Sibling" value="Sibling">
                  Sibling
                </MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="row">
          <div className="offset-md-9 col-md-6 allign-right float-end">
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => studentActions.deleteFamilyMember(familyMember.ID)}
              disabled={props.disabled}
            >
              Delete
            </button>
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
