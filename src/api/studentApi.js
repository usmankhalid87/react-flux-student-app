import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "http://localhost:8088/api/students/";

export function getStudents() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function saveStudent(student) {
  return fetch(baseUrl + (student.ID || ""), {
    method: student.ID ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      ...student,
      // Parse dateOfBirth to a date (in case it was sent as a string).
      dateOfBirth: new Date(student.dateOfBirth),
    }),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function updateStudentNationality(studentId, nationalityId) {
  return fetch(baseUrl + studentId + "/Nationality/" + nationalityId, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      ID: nationalityId,
    }),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getSingleStudent(studentId) {
  return fetch(baseUrl + studentId)
    .then(handleResponse)
    .catch(handleError);
}

export function getStudentNationality(studentId) {
  return fetch(baseUrl + studentId + "/Nationality/")
    .then(handleResponse)
    .catch(handleError);
}

export function getStudentFamilyMembers(studentId) {
  return fetch(baseUrl + studentId + "/FamilyMembers/")
    .then(handleResponse)
    .catch(handleError);
}

export function postFamilyMember(studentId, familyMember) {
  return fetch(baseUrl + studentId + "/FamilyMembers", {
    method: "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      ...familyMember,
      dateOfBirth: new Date(familyMember.dateOfBirth),
    }),
  })
    .then(handleResponse)
    .catch(handleError);
}
