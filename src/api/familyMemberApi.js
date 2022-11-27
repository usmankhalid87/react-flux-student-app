import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "http://localhost:8088/api/FamilyMembers/";

export function saveFamilyMemberNationality(familyMemberId, nationalityId) {
  return fetch(baseUrl + familyMemberId + "/Nationality/" + nationalityId, {
    method: "PUT", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      ID: nationalityId,
    }),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function putFamilyMember(familyMember) {
  return fetch(baseUrl + familyMember.ID, {
    method: "PUT", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      ...familyMember,
      dateOfBirth: new Date(familyMember.dateOfBirth),
    }),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteFamilyMember(familyMemberId) {
  return fetch(baseUrl + familyMemberId, {
    method: "DELETE",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      id: familyMemberId,
    }),
  })
    .then((response) => console.log(response))
    .catch(handleError);
}
