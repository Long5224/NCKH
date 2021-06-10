import React, { useState, useEffect } from "react";
import Local from "../apis/local.service";
import {PATH} from "../constansts/API"
// core components
import UserHeader from "../components/UserHeader/UserHeader";
import { useParams } from "react-router-dom";
import authService from "../apis/auth.service";
const Student = (props) => {
  const user = authService.getCurrentUser();
  let { studentId } = useParams();
  const [infoStudent, setInfoStudent] = useState({
    value: {
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
        id: null,
        name: "",
        facultyID: null,
        faculty: {
          id: null,
          name: "",
        },
      },
    },
    imageSrc: ""
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
