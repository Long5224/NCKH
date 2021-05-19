import React from "react";
import Header from "../components/UserHeader/Header";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AuthService from "../apis/auth.service";

import {
  Card,
  CardHeader,
  Container,
  Row,
  CardBody,
  UncontrolledAlert,
  Form,
} from "reactstrap";


function ChangePassword(props) {
  
  const [isNotCorrect, setIsNotCorrect] = React.useState(false);
  const currentUser = AuthService.getCurrentUser();
  const userName = currentUser.username;
  const schema = yup.object().shape({
    oldPassword: yup.string().required("Hãy nhập mật khẩu cũ"),
    newPassword: yup
      .string()
      .required("Hãy nhập mật khẩu mới")
      .min(8, "Mật khẩu mới phải bao gồm 8 kí tự"),
    repeatPassword: yup.string().required("Hãy nhập lại mật khẩu mới"),
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    console.log(data);
    if (data.newPassword != data.repeatPassword) {
      setIsNotCorrect(true);
    }
    else{
      setIsNotCorrect(false)
      const sendData = {...data, userName: userName}
      AuthService.update(sendData)
      .then(() => {
        alert("Updated Success");
      })
      .catch(response => console.log(response))
    }
  };

  return (
    <>
      {/*Header */}
      <Header />

      {/* Page content */}
      <Container className="mt--8">
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0 d-flex">
                <h3 className="mb-0 mt-2">Đổi mật khẩu</h3>
              </CardHeader>
              <hr className="my-4" />
              <CardBody>
                
                <Form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
                  <div class="row mb-3">
                    <label
                      for="inputOldPassword"
                      class="col-sm-2 col-form-label"
                    >
                      Mật khẩu cũ
                    </label>
                    <div class="col-sm-10">
                      <input
                        type="password"
                        class="form-control"
                        id="inputOldPassword"
                        {...register("oldPassword")}
                      />
                      <p style={{ color: "red" }}>
                        {errors.oldPassword?.message}
                      </p>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label
                      for="inputNewPassword"
                      class="col-sm-2 col-form-label"
                    >
                      Mật khẩu mới
                    </label>
                    <div class="col-sm-10">
                      <input
                        type="password"
                        class="form-control"
                        id="inputNewPassword"
                        {...register("newPassword")}
                      />
                      <p style={{ color: "red" }}>
                        {errors.newPassword?.message}
                      </p>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label
                      for="inputReWritePassword"
                      class="col-sm-2 col-form-label"
                    >
                      Nhập lại mật khẩu
                    </label>
                    <div class="col-sm-10">
                      <input
                        type="password"
                        class="form-control"
                        id="inputRepeatPassword"
                        {...register("repeatPassword")}
                      />
                      <p style={{ color: "red" }}>
                        {errors.repeatPassword?.message}
                      </p>
                      {isNotCorrect ? (
                        <p style={{ color: "red" }}>
                          Nhập lại mật khẩu không chính xác
                        </p>
                      ) : (
                        ""
                      )}
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
export default ChangePassword;
