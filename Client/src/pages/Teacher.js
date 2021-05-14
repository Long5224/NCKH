import React, {useState, useEffect} from "react";
import Local from "../apis/local.service";
// core components
import UserHeader from "../components/UserHeader/UserHeader";
import { PATH } from "../constansts/API";
const Teacher = (props) => {
  const [infoTeacher, setInfoTeacher] = useState({
    id: null,
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    placeOfBirth: "",
    phoneNumber: "",
    gender: true,
    yearOfAdmission: "",
    classID: null,
  })
  useEffect(() => {
    async function getData() {
      const response = await Local.getChildrenById(PATH.API_STUDENTS, "2", PATH.API_TEACHER);
      console.log(response);
      setInfoTeacher(response.data[0])
    }
    getData();
  }, []);
  return (
    <>
      <UserHeader data={infoTeacher} role={"teacher"}/>
    </>
  );
};

export default Teacher;
