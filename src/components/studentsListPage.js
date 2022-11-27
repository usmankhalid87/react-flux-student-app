import React, { useState, useEffect } from "react";
import studentStore from "../stores/studentStore";
import StudentsList from "../components/studentsList";
import { loadStudents } from "../actions/studentActions";

function StudentsListPage() {
  const [students, setstudents] = useState(studentStore.getStudents());

  useEffect(() => {
    studentStore.addChangeListener(onChange);
    if (studentStore.getStudents().length === 0) {
      loadStudents();
    }
    return () => studentStore.removeChangeListener(onChange);
  }, []);

  function onChange() {
    setstudents(studentStore.getStudents());
  }

  return (
    <>
      <h2>Students</h2>
      <StudentsList students={students} />
    </>
  );
}

export default StudentsListPage;
