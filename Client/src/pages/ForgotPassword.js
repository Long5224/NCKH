import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AuthService from "../apis/auth.service";
import {Link} from "react-router-dom";
import {useHistory} from "react-router-dom"
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

const Forget = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit} = useForm();
  const onSubmit = (data) => {
    setLoading(true);
    AuthService.create(data, "forgot")
    .then(() => {
      setLoading(false);
      history.replace({pathname: "forgotpasswordconfirmation"});
      
    })
    .catch(errors => console.error(errors))
  };
  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <h1>Quên mật khẩu</h1>
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
                    placeholder="Email"
                    type="email"
                    {...register("email")}
                    required
                  />
                </InputGroup>
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
                  <span>Gửi</span>
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <Link
              className="text-light"
              to="login"
            >
              <medium>Quay lại đăng nhập</medium>
            </Link>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Forget;
