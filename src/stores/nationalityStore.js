import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import actionTypes from "../actions/nationalityActions.types";

const CHANGE_EVENT = "change";
let _nationalities = [];

class NationalityStore extends EventEmitter {
  addChangeListener(callBack) {
    this.on(CHANGE_EVENT, callBack);
  }

  removeChangeListener(callBack) {
    this.removeListener(CHANGE_EVENT, callBack);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getNationalities() {
    return _nationalities;
  }
}

const nationalityStore = new NationalityStore();
Dispatcher.register((action) => {
  switch (action.actionType) {
    case actionTypes.LOAD_NATIONALITIES:
      _nationalities = action.nationalities;
      nationalityStore.emitChange();
      break;
    default:
    //nothing to do
  }
});

export default nationalityStore;
