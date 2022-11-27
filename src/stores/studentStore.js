import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import actionTypes from "../actions/studentActions.types";

const CHANGE_EVENT = "change";
let _students = [];
let _studentNationality = null;
let _familyMembers = [];

class StudentStore extends EventEmitter {
  addChangeListener(callBack) {
    this.on(CHANGE_EVENT, callBack);
  }

  removeChangeListener(callBack) {
    this.removeListener(CHANGE_EVENT, callBack);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getStudents() {
    return _students;
  }

  getStudentfamilyMembers() {
    return _familyMembers;
  }

  getStudentById(studentId) {
    return _students.find((student) => student.ID === studentId);
  }

  getStudentNationality() {
    return _studentNationality;
  }

  resetStudentNationality() {
    _studentNationality = null;
  }

  resetFamilyMembers() {
    _familyMembers = [];
  }
}

const studentStore = new StudentStore();
Dispatcher.register((action) => {
  switch (action.actionType) {
    case actionTypes.CREATE_STUDENT:
      _students.push(action.student);
      studentStore.emitChange();
      break;
    case actionTypes.LOAD_STUDENTS:
      _students = action.students;
      studentStore.emitChange();
      break;
    case actionTypes.LOAD_STUDENT_NATIONALITY:
      _studentNationality = action.studentNationality;
      studentStore.emitChange();
      break;
    case actionTypes.LOAD_STUDENT_DETAILS:
      _studentNationality = action.studentNationality;
      _familyMembers = action.familyMembers;
      studentStore.emitChange();
      break;
    case actionTypes.UPDATE_STUDENT:
      _students = _students.map((student) =>
        student.ID === action.student.ID ? action.student : student
      );
      _familyMembers = action.familyMembers;
      studentStore.emitChange();
      break;
    case actionTypes.DELETE_FAMILY_MEMBER:
      console.log(action.id);
      _familyMembers = _familyMembers.filter(
        (familyMember) => familyMember.ID !== action.id
      );
      studentStore.emitChange();
      break;
    default:
    //nothing to do
  }
});

export default studentStore;
