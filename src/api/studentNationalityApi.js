import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "http://localhost:8088/api/Students/1/Nationality/";

export function getNationalities() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}
