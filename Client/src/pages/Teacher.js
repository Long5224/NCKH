import React, {useState, useEffect} from "react";
import Local from "../apis/local.service";
// core components
import UserHeader from "../components/UserHeader/UserHeader";
import { PATH } from "../constansts/API";
import AuthService from "../apis/auth.service"
const Teacher = (props) => {
  const currentUser = AuthService.getCurrentUser();
  const id = currentUser.username.split("-")[1];
  const [infoTeacher, setInfoTeacher] = useState({
    value: {
      id: null,
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      placeOfBirth: "",
      phoneNumber: "",
      gender: true,
      yearOfAdmission: "",
      classID: null
    },
    imageSrc: ""
  })
  useEffect(() => {
    async function getData() {
      const response = await Local.getChildrenById(PATH.API_STUDENTS, id, "teacher" );
      console.log(response);
      setInfoTeacher({ ...response.data})
    }
    getData();
  }, [id]);
  return (
    <>
      <UserHeader data={infoTeacher} page="teacher"/>
    </>
  );
};

export default Teacher;
