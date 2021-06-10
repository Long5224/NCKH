import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AuthService from "../apis/auth.service";
import {useHistory, useLocation} from "react-router-dom";
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
  Col,
} from "reactstrap";

const ResetPassword = () => {
  const location = useLocation();
  const history =  useHistory();
  const [loading, setLoading] = useState(false);
  const schema = yup.object().shape({
    password: yup.string().required("Hãy nhập tên tài khoản"),
    confirmPassword: yup.string().oneOf([yup.ref("password")], "Password's not match").required("Hãy nhập mật khẩu"),
  });
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    setLoading(true);
    const sendData = {
      email: location.search.split("=")[1],
      password: data.password,
      confirmPassword: data.confirmPassword
    }

    AuthService.update(sendData, "reset")
    .then(() => {
      setLoading(false);
      history.replace("resetpasswordsuccess");
    })
    .catch(errors => {
      setLoading(false);
      console.log(errors)
    });
    
  };
  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <h1>Đặt lại mật khẩu</h1>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form" onSubmit={handleSubmit(onSubmit)}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-lock" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <input
                    className="form-control-alternative form-control"
                    placeholder="New Password"
                    type="password"
                    {...register("password")}
                    
                  />
                </InputGroup>
                <p style={{ color: "red" }}>{errors.password?.message}</p>
              </FormGroup>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-key" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <input
                    className="form-control-alternative form-control"
                    placeholder="Confirm Password"
                    type="password"
                    {...register("confirmPassword")}
                    
                  />
                </InputGroup>
                <p style={{ color: "red" }}>{errors.confirmPassword?.message}</p>
              </FormGroup>
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
                  <span>Tạo mới</span>
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
     
      </Col>
    </>
  );
};

export default ResetPassword;
