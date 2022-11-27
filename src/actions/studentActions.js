import dispatcher from "../appDispatcher";
import * as studentApi from "../api/studentApi";
import * as familyApi from "../api/familyMemberApi";
import actionTypes from "./studentActions.types";

export function loadStudents() {
  return studentApi.getStudents().then((students) => {
    dispatcher.dispatch({
      actionType: actionTypes.LOAD_STUDENTS,
      students,
    });
  });
}

export function loadStudentDetails(studentId) {
  return Promise.all([
    studentApi.getStudentNationality(studentId),
    studentApi.getStudentFamilyMembers(studentId),
  ]).then((response) => {
    dispatcher.dispatch({
      actionType: actionTypes.LOAD_STUDENT_DETAILS,
      studentNationality: response[0].nationality?.ID,
      familyMembers: response[1],
    });
  });
}

export function saveStudent(student) {
  let promises = [];
  let nationalityPromises = [];
  return studentApi.saveStudent(student).then((savedStudent) => {
    studentApi.updateStudentNationality(savedStudent.ID, student.nationality);

    student.familyMembers.map((familyMember) => {
      if (familyMember.ID && familyMember.ID > 0) {
        promises.push(familyApi.putFamilyMember(familyMember));
      } else {
        promises.push(studentApi.postFamilyMember(student.ID, familyMember));
      }
    });

    Promise.all(promises).then((response) => {
      response.map((familyMember, index) => {
        nationalityPromises.push(
          familyApi.saveFamilyMemberNationality(
            familyMember.ID,
            student.familyMembers[index].nationality
          )
        );
      });

      Promise.all(nationalityPromises).then((res) => {
        console.log("Family", student.familyMembers);
        dispatcher.dispatch({
          actionType: student.ID
            ? actionTypes.UPDATE_STUDENT
            : actionTypes.CREATE_STUDENT,
          student: savedStudent,
          familyMembers: student.familyMembers,
        });
      });
    });
  });
}

export function deleteFamilyMember(id) {
  return familyApi.deleteFamilyMember(id).then((res) => {
    console.log("Response : ", res);
    dispatcher.dispatch({
      actionType: actionTypes.DELETE_FAMILY_MEMBER,
      id,
    });
  });
}
