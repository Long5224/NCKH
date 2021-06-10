import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AuthService from "../apis/auth.service";
import {Link} from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

const Login = () => {
  
  const [loading, setLoading] = useState(false);
  const schema = yup.object().shape({
    username: yup.string().required("Hãy nhập tên tài khoản"),
    password: yup.string().required("Hãy nhập mật khẩu"),
  });
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    setLoading(true);

    AuthService.login(data.username, data.password).then(
      () => {
        window.location.href = "http://localhost:3000/home/index";
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setLoading(false);
        if (resMessage === "Request failed with status code 500") {
          alert("Mật khẩu hoặc tài khoản không chính xác.");
        } else {
          alert(resMessage);
        }
      }
    );
  };
  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <h1>Sign In</h1>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form" onSubmit={handleSubmit(onSubmit)}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <input
                    className="form-control-alternative form-control"
                    placeholder="UserName"
                    type="text"
                    {...register("username")}
                    autoComplete="new-useName"
                  />
                </InputGroup>
                <p style={{ color: "red" }}>{errors.username?.message}</p>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <input
                    className="form-control-alternative form-control"
                    placeholder="Password"
                    type="password"
                    {...register("password")}
                    autoComplete="new-password"
                  />
                </InputGroup>
                <p style={{ color: "red" }}>{errors.password?.message}</p>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div>
              <div className="text-center">
                <Button
                  className="my-4"
                  color="primary"
                  type="submit"
                  disabled={loading}
                >
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span> Đăng nhập</span>
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <Link
              className="text-light"
              to="forgot"
            >
              <medium>Quên mật khẩu?</medium>
            </Link>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
