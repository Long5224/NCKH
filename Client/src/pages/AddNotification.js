import React from "react";
import {
  Card,
  CardHeader,

  CardBody,
  UncontrolledAlert,
  Form,
} from "reactstrap";
function AddNotification(props) {
  return (
    <>
      {/*Header */}

      {/* Page content */}

      <Card className="shadow">
        <CardHeader className="border-0 d-flex">
          <h3 className="mb-0 mt-2">Thêm thông báo</h3>
        </CardHeader>
        <hr className="my-4" />
        <CardBody>
          <UncontrolledAlert color="success" fade={false}>
            <span className="alert-inner--icon">
              <i className="ni ni-like-2" />
            </span>{" "}
            <span className="alert-inner--text">
              <strong>Success!</strong> This is a success alert—check it out!
            </span>
          </UncontrolledAlert>
          <Form className="mt-4">
            <div class="row mb-3">
              <label for="inputOldPassword" class="col-sm-2 col-form-label">
                Tiêu đề
              </label>
              <div class="col-sm-10">
                <input type="text" class="form-control" id="inputOldPassword" />
              </div>
            </div>
            <div class="row mb-3">
              <label for="inputOldPassword" class="col-sm-2 col-form-label">
                Nội dung
              </label>
              <div class="col-sm-10">
                <textarea
                  class="form-control "
                  id="validationTextarea"
                  placeholder="Required example textarea"
                  required
                ></textarea>
              </div>
            </div>

            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </Form>
        </CardBody>
      </Card>
    </>
  );
}

export default AddNotification;
