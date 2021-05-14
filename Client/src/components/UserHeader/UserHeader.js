import moment from "moment";
import React, { useState, useEffect } from "react";
import { PATH } from "../../constansts/API";
import LocalService from "../../apis/local.service";
import { useForm } from "react-hook-form";
import FilterDropDown from "../Filter/FilterDropDown/index";
// reactstrap components
import {
  Button,
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Form,
  UncontrolledAlert,
  Input,
} from "reactstrap";

const UserHeader = (props) => {
  const { data, role } = props;
  const [isSeeMore, setIsSeeMore] = useState(false);
  const [evaluations, setEvaluations] = useState([]);
  const [currentEvaluation, setCurrentEvaluation] = useState({
    studentid: null,
    semesterid: null,
    semester: {
      id: null,
      name: "",
      begin_year: "",
      end_year: "",
      courses: null,
    },
    content: "",
  });
  const [isUpdate, setIsUpdate] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const { register, errors, handleSubmit } = useForm();
  const [currentSelected, setCurrentSelected] = useState("");
  useEffect(() => {
    async function getData() {
      const responseEvaluation = await LocalService.getChildrenById(
        PATH.API_STUDENTS,
        data.id,
        PATH.API_EVALUATION
      );
      setEvaluations(responseEvaluation.data);
      console.log(responseEvaluation);
      setCurrentEvaluation(responseEvaluation.data[0]);
      setCurrentSelected(responseEvaluation.data[0].semesterid);
    }
    getData();
  }, []);

  function handleOnChange(receiveValues) {
    const currentEvl = evaluations.filter((val) => {
      if (val.semester.id === Number(receiveValues.value)) {
        return val;
      }
    });
    setCurrentEvaluation({ ...currentEvl[0] });
    setCurrentSelected(receiveValues.semesterid)
  }

  function handleChangeTextArea(event) {
    const { name, value } = event.target;
    setCurrentEvaluation({ ...currentEvaluation, [name]: value });
  }

  function saveInfo() {
    const updateData = {
      semesterid: currentEvaluation.semesterid,
      content: currentEvaluation.content,
    };

    LocalService.updateForChildren(
      PATH.API_STUDENTS,
      currentEvaluation.studentid,
      PATH.API_EVALUATION,
      JSON.stringify(updateData)
    )
      .then(() => {
        setIsUpdate(true);
        setIsUpdated(true);
      })
      .catch((error) => {
        setIsUpdate(false);
      });
  }

  return (
    <>
      <div
        className="header bg-edit-header pb-8 pt-6 pt-lg-8 pt-md-8 align-items-center"
        style={{
          minHeight: "600px",
          backgroundColor: "",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* Header container */}
        <Container className="align-items-center ">
          <Row>
            <Col lg="12" md="12" xl="12">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={
                            require("../../assets/images/User_Img.png").default
                          }
                        />
                      </a>
                    </div>
                  </Col>
                </Row>
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  <div className="d-flex justify-content-between">
                    {window.location.pathname === "/home/teacher" ? (
                      ""
                    ) : (
                      <Button
                        className="mr-4 btn-edit"
                        color="info"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        size="sm"
                      >
                        Thay đổi ảnh đại diện
                      </Button>
                    )}

                    <Button
                      className="float-right"
                      color="default"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Tin nhắn
                    </Button>
                  </div>
                </CardHeader>
                <CardBody className="pt-0 pt-md-4">
                  <Row>
                    <div className="col">
                      <div className="card-profile-stats  justify-content-center mt-md-5 text-center ">
                        <h3>
                          {data.firstName + " " + data.lastName}
                          <span className="font-weight-light">
                            , {moment(data.dateOfBirth).fromNow(true)}
                          </span>
                        </h3>
                        <div className="h4 font-weight-300">
                          <i className="ni location_pin mr-2" />
                          {data.placeOfBirth}
                        </div>
                        <div className="h4 font-weight-300">
                          <i className="ni location_pin mr-2" />
                          {data.phoneNumber}
                        </div>
                        {role === "user" || role === "student" ? (
                          <div className="h5 ">
                            <i className="ni business_briefcase-24 mr-2" />
                            {"Khoa " +
                              data.class.faculty.name +
                              " " +
                              data.class.name}
                          </div>
                        ) : (
                          ""
                        )}

                        <hr className="my-4" />
                        {(role === "student" || role === "teacher") &&
                        isSeeMore === true ? (
                          <Card className="shadow mb-3">
                            <CardHeader className="border-0 d-flex">
                              <h3 className="mb-0 mt-2">Đánh giá học kì</h3>
                              <Form className="ml-auto">
                                <FilterDropDown
                                  dataFilter={data.yearOfAdmission}
                                  currentSelected={currentEvaluation.semesterid}
                                  onChange={handleOnChange}
                                />
                              </Form>
                            </CardHeader>
                            <hr className="my-4" />
                            <CardBody>
                              {isUpdated === true ? (
                                isUpdate === true ? (
                                  <UncontrolledAlert
                                    color="success"
                                    fade={false}
                                  >
                                    <span className="alert-inner--icon">
                                      <i className="ni ni-like-2" />
                                    </span>{" "}
                                    <span className="alert-inner--text">
                                      <strong>Success!</strong> Update Success
                                    </span>
                                  </UncontrolledAlert>
                                ) : (
                                  <UncontrolledAlert
                                    color="danger"
                                    fade={false}
                                  >
                                    <span className="alert-inner--icon">
                                      <i class="fas fa-exclamation-triangle"></i>
                                    </span>{" "}
                                    <span className="alert-inner--text">
                                      <strong>Error!</strong> Update Not Success
                                    </span>
                                  </UncontrolledAlert>
                                )
                              ) : (
                                ""
                              )}

                              <Form
                                className="mt-4"
                                onSubmit={handleSubmit(saveInfo)}
                              >
                                <div class="row mb-3">
                                  <label
                                    for="inputOldPassword"
                                    class="col-sm-2 col-form-label"
                                  >
                                    Nội dung đánh giá
                                  </label>
                                  <div class="col-sm-10">
                                    <textarea
                                      class="form-control "
                                      id="validationTextarea"
                                      name="content"
                                      placeholder="Required example textarea"
                                      value={currentEvaluation.content}
                                      onChange={handleChangeTextArea}
                                      ref={register}
                                    ></textarea>
                                  </div>
                                </div>

                                <button
                                  type="submit"
                                  class="btn btn-primary"
                                  disabled={role === "student" ? true : false}
                                >
                                  Submit
                                </button>
                              </Form>
                            </CardBody>
                          </Card>
                        ) : (
                          ""
                        )}

                        {(role === "student" || role === "teacher") &&
                        isSeeMore === true ? (
                          <span
                            className="seeMore"
                            onClick={() => {
                              setIsSeeMore(!isSeeMore);
                            }}
                          >
                            Thu gọn
                          </span>
                        ) : (
                          <span
                            className="seeMore"
                            onClick={() => {
                              setIsSeeMore(!isSeeMore);
                            }}
                          >
                            Xem thêm
                          </span>
                        )}
                      </div>
                    </div>
                  </Row>
                  <div className="text-center"></div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default UserHeader;
