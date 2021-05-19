import React, { useState, useEffect } from "react";
import Local from "../apis/local.service";
import {PATH} from "../constansts/API"
// core components
import UserHeader from "../components/UserHeader/UserHeader";
import { useParams } from "react-router-dom";
const Student = (props) => {
  let { studentId } = useParams();
  const [infoStudent, setInfoStudent] = useState({
    id: null,
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    placeOfBirth: "",
    phoneNumber: "",
    gender: true,
    yearOfAdmission: "",
    classID: null,
    class: {
      faculty: {
        id: null,
        name: ""
      },
      facultyId: null,
      id: null,
      name: ""
    }
  });
  
  useEffect(() => {
    async function getData() {
      const response = await Local.getById(PATH.API_STUDENTS, studentId);
      setInfoStudent(response.data);
    }
    getData();
  }, [studentId]);
  return (
    <>
      <UserHeader data={infoStudent} page="student"/>
    </>
  );
};

export default Student;
