import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AuthService from "../apis/auth.service";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

const Login = () => {
  const { register, handleSubmit, errors } = useForm();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });
  function handleOnChange(event) {
    const val = event.target;
    setFormValues({ ...formValues, [val.name]: val.value });
  }
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
                    name="username"
                    value={formValues.username}
                    onChange={handleOnChange}
                    ref={register({ required: true })}
                    autoComplete="new-useName"
                  />
                </InputGroup>
                {errors.username && (
                  <div className="form_error">This field is required</div>
                )}
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
                    name="password"
                    value={formValues.password}
                    onChange={handleOnChange}
                    ref={register({ required: true })}
                    autoComplete="new-password"
                  />
                </InputGroup>
                {errors.password && (
                  <div className="form_error">This field is required</div>
                )}
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
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
