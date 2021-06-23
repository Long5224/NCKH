import moment from "moment";
import React, { useState, useEffect, useContext } from "react";
import { PATH } from "../../constansts/API";
import LocalService from "../../apis/local.service";
import { useForm } from "react-hook-form";
import FilterDropDown from "../Filter/FilterDropDown/index";
import AuthService from "../../apis/auth.service";
import UserContext from "../UserContext/UserContext"
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
  Modal,
} from "reactstrap";
import Skeleton from "react-loading-skeleton";

const UserHeader = (props) => {
  const { data, page, onUpdateAvatar } = props;
  const [previewFile, setPreviewFile] = useState({
    imageSrc: "/User_Img.png",
    imageFile: null,
  });
  const user = AuthService.getCurrentUser()
  const [isSeeMore, setIsSeeMore] = useState(false);
  const [evaluations, setEvaluations] = useState([]);
  const [defaultModal, setDefaultModal] = useState(false);
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
  const { register, handleSubmit } = useForm();
  useEffect(() => {
    async function getData() {
      const responseEvaluation = await LocalService.getChildrenById(
        PATH.API_STUDENTS,
        data.value.id,
        PATH.API_EVALUATION
      );
      setEvaluations(responseEvaluation.data);
      setCurrentEvaluation(responseEvaluation.data[0]);
      setIsUpdate(false);
    }
    getData();
  }, [data, isUpdate]);


  function handleOnChange(receiveValues) {
    const currentEvl = evaluations.filter((val) => {
      if (val.semester.id === Number(receiveValues.value)) {
        return val;
      }
    });
    setCurrentEvaluation({ ...currentEvl[0] });
  }

  function handleChangeTextArea(event) {
    const { name, value } = event.target;
    setCurrentEvaluation({ ...currentEvaluation, [name]: value });
  }

  function showPreview(e) {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setPreviewFile({
          ...previewFile,
          imageFile,
          imageSrc: x.target.result,
        });
      };
      reader.readAsDataURL(imageFile);
    }
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
        alert("Update Success");
      })
      .catch((error) => {
        setIsUpdate(false);
      });
  }

  const handleUpdateAvatar = (value) => {
    onUpdateAvatar(value, "imageSrc");
  }

  const updateFile = (updatedData) => {
    if (updatedData.file[0] != null) {
      const formData = new FormData();
      formData.append("username", user.username);
      formData.append("avatar", updatedData.file[0]);
      AuthService.update(formData, "update_avatar")
        .then((response) => {
          document.getElementById('image-uploader').value = null;
          setPreviewFile({
            imageSrc: "/User_Img.png",
            imageFile: null,
          });
          setDefaultModal(!defaultModal);
          handleUpdateAvatar(response.data);
          alert("Upload File Success");

        })
        .catch((errors) => alert(errors));
    } else {
      alert("Bạn chưa chọn file");
    }
  };

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
                          src={ data.imageSrc}
                        />
                      </a>
                    </div>
                  </Col>
                </Row>
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  <div className="d-flex justify-content-between">
                    {window.location.pathname === "/home/teacher"  ? (
                      ""
                    ) : page !== "student" ? (
                      <Button
                        className="mr-4 btn-edit"
                        color="info"
                        onClick={() => setDefaultModal(!defaultModal)}
                        size="sm"
                      >
                        Thay đổi ảnh đại diện
                      </Button>
                    ) : (
                      <Button
                      className="float-right"
                      color="default"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Tin nhắn
                    </Button>
                    )}
                  </div>
                </CardHeader>
                <CardBody className="pt-0 pt-md-4">
                  <Row>
                    <div className="col">
                      <div className="card-profile-stats  justify-content-center mt-md-5 text-center ">
                        <h3>
                          {data.value.firstName + " " + data.value.lastName || <Skeleton/>}
                          <span className="font-weight-light">
                            , {moment(data.value.dateOfBirth).fromNow(true) || <Skeleton/>}
                          </span>
                        </h3>
                        <div className="h4 font-weight-300">
                          <i className="ni location_pin mr-2" />
                          {data.value.placeOfBirth || <Skeleton/>}
                        </div>
                        <div className="h4 font-weight-300">
                          <i className="ni location_pin mr-2" />
                          {data.value.phoneNumber || <Skeleton/>}
                        </div>
                        {(user.role === "parent" || user.role === "student") &&
                        page === "general" ? (
                          <div className="h5 ">
                            <i className="ni business_briefcase-24 mr-2" />
                            {"Khoa " +
                              data.value.class.faculty.name +
                              " - Lop " +
                              data.value.class.name || <Skeleton/>}
                          </div>
                        ) : (
                          ""
                        )}

                        <hr className="my-4" />
                        {(user.role === "parent" || user.role === "teacher") &&
                        isSeeMore === true ? (
                          <Card className="shadow mb-3">
                            <CardHeader className="border-0 d-flex">
                              <h3 className="mb-0 mt-2">Đánh giá học kì</h3>
                              <Form className="ml-auto">
                                <FilterDropDown
                                  id={data.value.id}
                                  onChange={handleOnChange}
                                  page=""
                                />
                              </Form>
                            </CardHeader>
                            <hr className="my-4" />
                            <CardBody>
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
                                      {...register("content", {
                                        required: true,
                                      })}
                                      disabled={
                                        user.role === "parent" ? true : false
                                      }
                                    ></textarea>
                                  </div>
                                </div>

                                <button
                                  type="submit"
                                  class="btn btn-primary"
                                  disabled={user.role === "parent" ? true : false}
                                >
                                  Submit
                                </button>
                              </Form>
                            </CardBody>
                          </Card>
                        ) : (
                          ""
                        )}

                        {(user.role === "parent" && page === "general") ||
                        (user.role === "teacher" && page === "student") ? (
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
                          )
                        ) : (
                          ""
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
      <Modal
        className="modal-dialog-centered"
        isOpen={defaultModal}
        toggle={() => setDefaultModal(!defaultModal)}
      >
        <div className="modal-header">
          <h2 className="modal-title" id="modal-title-default">
            Thay đổi ảnh đại diện
          </h2>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => setDefaultModal(!defaultModal)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body">
          <form
            autoComplete="off"
            noValidate
            id="update-file"
            onSubmit={handleSubmit(updateFile)}
          >
            <div className="card">
              <img
                src={previewFile.imageSrc}
                className="card-img-top"
                height="300"
                width="300"
                alt="preview"
              />
              <div className="card-body">
                <div className="form-group">
                  <input
                    type="file"
                    accept="/*"
                    id="image-uploader"
                    className="form-control-file"
                    {...register("file")}
                    onChange={showPreview}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <Button color="primary" type="submit" form="update-file">
            Lưu
          </Button>
          <Button
            className="ml-auto"
            color="danger"
            data-dismiss="modal"
            type="button"
            onClick={() => {
              setDefaultModal(!defaultModal);
              setPreviewFile({
                imageSrc: "/User_Img.png",
                imageFile: null,
              });
            }}
          >
            Đóng
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default UserHeader;
