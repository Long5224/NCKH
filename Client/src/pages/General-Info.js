import React, { useState, useEffect, useContext } from "react";
import LocalService from "../apis/local.service";
import moment from "moment";
import { PATH } from "../constansts/API";
import { useForm } from "react-hook-form";
import AuthService from "../apis/auth.service"
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
import UserContext from "../components/UserContext/UserContext";

function Index() {
  const {user, handleChangeUser, UpdateUser} = useContext(UserContext);
  const id = user.username.split("-")[1];
  const { register, handleSubmit } = useForm();
  const [infoUser, setInfoUser] = useState({
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
  });

  useEffect(() => {
    async function getData() {
      if (user.role === "parent") {
        const response = await LocalService.getById(PATH.API_STUDENTS, id);
        setInfoUser({ ...response.data });
      } else {
        const response = await LocalService.getById(PATH.API_TEACHER, id);
        setInfoUser({ ...response.data });
      }
    }
    getData();
  }, [user.role, id]);

  const  saveInfo = async (data) => {

    const updateData = {
      placeOfBirth: infoUser.value.placeOfBirth,
      phoneNumber: infoUser.value.phoneNumber,
    };

    await UpdateUser(data.email)

    await LocalService.update(
      user.role === "parent" ? PATH.API_STUDENTS : PATH.API_TEACHER,
      infoUser.value.id,
      JSON.stringify(updateData))
      .then(() => {
        alert("Updated Success");
      })
      .catch((error) => {
        alert("UnSuccess");
      });
  };

  function handleChange(event) {
    const { name, value } = event.target;
    if(name === "email"){
      handleChangeUser(value, name);
    }
    setInfoUser({value: { ...infoUser.value, [name]: value}});
  }

  const handleUpdateAvatar = (value, name) => {
    handleChangeUser(value, name);
  }

  return (
    <>
      <UserHeader
        data={{...infoUser, imageSrc: user.imageSrc}}
        page="general"
        onUpdateAvatar={handleUpdateAvatar}
      />
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
                            Email
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            placeholder="Email"
                            type="text"
                            value={user.email}
                            {...register("email")}
                            onChange={handleChange}
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
                            value={infoUser.value.phoneNumber}
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
                            value={infoUser.value.firstName}
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
                            value={infoUser.value.lastName}
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
                            value={infoUser.value.id}
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
                            value={infoUser.value.dateOfBirth}
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
                              parseInt(infoUser.value.yearOfAdmission) -
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
                            value={infoUser.value.class.faculty.name}
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
                            value={infoUser.value.class.name}
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
                            value={
                              infoUser.value.gender === true ? "Nam" : "Nữ"
                            }
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
                            value={infoUser.value.placeOfBirth}
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
                            value={infoUser.value.placeOfBirth.split("-")[0]}
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
                            value={infoUser.value.placeOfBirth.split("-")[1]}
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
                            value={infoUser.value.placeOfBirth.split("-")[2]}
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
