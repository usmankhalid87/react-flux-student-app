import dispatcher from "../appDispatcher";
import * as nationalityApi from "../api/nationalityApi";
import actionTypes from "./nationalityActions.types";

export function loadNationalities() {
  return nationalityApi.getNationalities().then((nationalities) => {
    dispatcher.dispatch({
      actionType: actionTypes.LOAD_NATIONALITIES,
      nationalities,
    });
  });
}
