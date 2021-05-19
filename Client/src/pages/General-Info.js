import React, { useState, useEffect } from "react";
import LocalService from "../apis/local.service";
import moment from "moment";
import { PATH } from "../constansts/API";
import { useForm } from "react-hook-form";
import AuthService from "../apis/auth.service"
import jwt_decode from "jwt-decode";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import UserHeader from "../components/UserHeader/UserHeader";

function Index() {
  const [infoUser, setInfoUser] = useState({
    id: null,
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    placeOfBirth: "",
    phoneNumber: "",
    gender: null,
    yearOfAdmission: "",
    classID: null,
    class: {
      id: null,
      name: "",
      facultyId: null,
      faculty: {
        id: null,
        name: "",
      }
    }
  });
  const currentUser = AuthService.getCurrentUser();
  const id = currentUser.username.split('-')[1]
  const role = currentUser.role
  const useName = currentUser.username
  const { register,  formState: { errors } , handleSubmit } = useForm();
  useEffect(() => {
    async function getData() {
      
      if(role === "student" || role === "parent"){
      const response = await LocalService.getById(
        PATH.API_STUDENTS,
        id
      );
      setInfoUser({...response.data})
      console.log();
      } else if (role === "teacher"){
        const response = await LocalService.getById(
          PATH.API_TEACHER,
          id
        );
        setInfoUser({...response.data})
      }
      else {
        const response = await LocalService.getById(
          PATH.API_PARENT,
          id
        );
        setInfoUser({...response.data.student})
      }
      
    }
    getData();
  }, []);

  const saveInfo = (data) => {
   
    const updateData = {
      placeOfBirth: infoUser.placeOfBirth,
      phoneNumber: infoUser.phoneNumber,
    };
    console.log(data)
    
    LocalService.update(PATH.API_STUDENTS, infoUser.id, JSON.stringify(updateData))
      .then(() => {
        alert("Updated Success");
      })
      .catch((error) => {
        alert("Mật khẩu chưa chính xác");
      });
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setInfoUser({ ...infoUser, [name]: value });
    console.log(infoUser);
  }
  return (
    <>
      <UserHeader data={infoUser} page="general"/>
      {/* Page content */}
      <Container className="mt--7">
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <Form onSubmit={handleSubmit(saveInfo)}>
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Thông tin chung</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                      <Button color="primary" size="sm" type="submit">
                        Cập nhật
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <h6 className="heading-small text-muted mb-4">
                    Thông tin tài khoản
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Tên người dùng
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-username"
                            placeholder="Username"
                            type="text"
                            disabled
                            value={useName}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-phone"
                          >
                            Số điện thoại
                          </label>
                          <input
                            className="form-control-alternative form-control"
                            id="input-phone"
                            placeholder="0123456789"
                            value={infoUser.phoneNumber}
                            {...register("phoneNumber")}
                            type="text"
                            onChange={handleChange}
                            
                          />
                          
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Họ
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-first-name"
                            placeholder="First name"
                            value={infoUser.firstName}
                            type="text"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Tên
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-last-name"
                            placeholder="Last name"
                            value={infoUser.lastName}
                            type="text"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Student Information */}
                  <h6 className="heading-small text-muted mb-4">
                    Thông tin sinh viên
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-studentId"
                          >
                            Mã sinh viên
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-studentId"
                            value={infoUser.id}
                            type="text"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-dateOfBirth"
                          >
                            Ngày sinh
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-dateOfBirth"
                            value={infoUser.dateOfBirth}
                            type="date"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-faculty"
                          >
                            Khóa
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-faculty"
                            type="text"
                            value={
                              parseInt(infoUser.yearOfAdmission) -
                              parseInt(moment("1959").get("year"))
                            }
                            disabled
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-faculty"
                          >
                            Khoa
                          </label>
                          <Input
                            id="input-gender"
                            type="text"
                            value={infoUser.class.faculty.name}
                            disabled
                          ></Input>
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-faculty"
                          >
                            Lớp
                          </label>
                          <Input
                            id="input-faculty"
                            type="text"
                            value={infoUser.class.name}
                            disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-gender"
                          >
                            Giới tính
                          </label>
                          <Input
                            id="input-gender"
                            type="text"
                            value={infoUser.gender === true ? "Nam" : "Nữ"}
                            disabled
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                  <h6 className="heading-small text-muted mb-4">
                    Thông tin liên lạc
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-placeOfBirth"
                          >
                            Địa chỉ cụ thể
                          </label>
                          <input
                            className="form-control-alternative form-control"
                            id="input-placeOfBirth"
                            type="text"
                            {...register("placeOfBirth")}
                            value={infoUser.placeOfBirth}
                            onChange={handleChange}
                         
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-city"
                          >
                            Tỉnh/Thành phố
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-city"
                            type="text"
                            value={infoUser.placeOfBirth.split("-")[0]}
                            disabled
                          ></Input>
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-district"
                          >
                            Quận/Huyện
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-district"
                            type="text"
                            value={infoUser.placeOfBirth.split("-")[1]}
                            disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-ward"
                          >
                            Phường/Xã
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-ward"
                            type="text"
                            value={infoUser.placeOfBirth.split("-")[2]}
                            disabled
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                </CardBody>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Index;
