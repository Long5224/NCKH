/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {
  Button,
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
} from "reactstrap";

const UserHeader = () => {
  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 pt-md-8 align-items-center"
        style={{
          minHeight: "600px",
          backgroundColor: "",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* Header container */}
        <Container className="align-items-center " fluid>
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
                            require("../../assets/images/User_Img.png")
                              .default
                          }
                        />
                      </a>
                    </div>
                  </Col>
                </Row>
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  <div className="d-flex justify-content-between">
                    <Button
                      className="mr-4"
                      color="info"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Thay đổi ảnh đại diện
                    </Button>
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
                          Phạm Hoàng Long
                          <span className="font-weight-light">, 21</span>
                        </h3>
                        <div className="h5 font-weight-300">
                          <i className="ni location_pin mr-2" />
                          Thanh Oai, Hà Nội
                        </div>
                        <div className="h5 ">
                          <i className="ni business_briefcase-24 mr-2" />
                          Khoa Công Nghệ Thông tin lớp - CNTT1-K59
                        </div>
                        <div>
                          <i className="ni education_hat mr-2" />
                          Đại học giao thông vận tải
                        </div>
                        <hr className="my-4" />
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          Xem thêm
                        </a>
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
