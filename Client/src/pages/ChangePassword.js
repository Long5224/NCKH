import React from "react";
import Header from "../components/UserHeader/Header";
import {
  Card,
  CardHeader,
  Container,
  Row,
  CardBody,
  UncontrolledAlert,
  Form,
  Input,
  FormGroup,
  Label,
  Button,
} from "reactstrap";
function index(props) {
  return (
    <>
      {/*Header */}
      <Header />

      {/* Page content */}
      <Container className="mt--8" >
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0 d-flex">
                <h3 className="mb-0 mt-2">Đổi mật khẩu</h3>
              </CardHeader>
              <hr className="my-4" />
              <CardBody>
                <UncontrolledAlert color="success" fade={false}>
                  <span className="alert-inner--icon">
                    <i className="ni ni-like-2" />
                  </span>{" "}
                  <span className="alert-inner--text">
                    <strong>Success!</strong> This is a success alert—check it
                    out!
                  </span>
                </UncontrolledAlert>
                <Form className="mt-4">
                  <div class="row mb-3">
                    <label for="inputOldPassword" class="col-sm-2 col-form-label">
                      Mật khẩu cũ
                    </label>
                    <div class="col-sm-10">
                      <input
                        type="password"
                        class="form-control"
                        id="inputOldPassword"
                      />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="inputNewPassword" class="col-sm-2 col-form-label">
                      Mật khẩu mới
                    </label>
                    <div class="col-sm-10">
                      <input
                        type="password"
                        class="form-control"
                        id="inputNewPassword"
                      />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label for="inputReWritePassword" class="col-sm-2 col-form-label">
                      Nhập lại mật khẩu
                    </label>
                    <div class="col-sm-10">
                      <input
                        type="password"
                        class="form-control"
                        id="inputReWritePassword"
                      />
                    </div>
                  </div>
                  <button type="submit" class="btn btn-primary">
                    Sign in
                  </button>
                </Form>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}
export default index;
