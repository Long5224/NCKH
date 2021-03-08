
import React from "react";

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

const index = () => {
  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" >
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Thông tin chung</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Cập nhật
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
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
                          <Input
                            className="form-control-alternative"
                            id="input-phone"
                            placeholder="0123456789"
                            type="text"
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
                            type="text"
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
                            type="text"
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
                      <Col lg="6">
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
                            type="date"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-department"
                          >
                            Khóa
                          </label>
                          <Input id="input-faculty" type="select">
                            <option>61</option>
                            <option>60</option>
                            <option>59</option>
                            <option>58</option>
                            <option>57</option>
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-faculty"
                          >
                            Khoa
                          </label>
                          <Input id="input-faculty" type="select">
                            <option>Công nghệ thông tin</option>
                            <option>Kinh tế</option>
                            <option>Cớ khí</option>
                            <option>Điện/Điện tử</option>
                            <option>Công trình</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-faculty"
                          >
                            Lớp
                          </label>
                          <Input id="input-faculty" type="select">
                            <option>Công nghệ thông tin 1</option>
                            <option>Công nghệ thông tin 2</option>
                            <option>Công nghệ thông tin 3</option>
                            <option>Công nghệ thông tin 4</option>
                            <option>Công nghệ thông tin 5</option>
                          </Input>
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
                            htmlFor="input-address"
                          >
                            Địa chỉ cụ thể
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-address"
                            type="text"
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
                          />
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
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default index;
