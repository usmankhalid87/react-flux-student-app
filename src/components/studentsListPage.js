import React, { useState, useEffect } from "react";
import studentStore from "../stores/studentStore";
import StudentsList from "../components/studentsList";
import { loadStudents } from "../actions/studentActions";

function StudentsListPage() {
  const [students, setStudents] = useState(studentStore.getStudents());

  useEffect(() => {
    studentStore.addChangeListener(onChange);
    if (studentStore.getStudents().length === 0) {
      loadStudents();
    }
    return () => studentStore.removeChangeListener(onChange);
  }, []);

  function onChange() {
    console.log("Student :", studentStore.getStudents());
    setStudents([...studentStore.getStudents()]);
  }

  return (
    <>
      <h2>Students</h2>
      <StudentsList students={students} />
    </>
  );
}

export default StudentsListPage;
