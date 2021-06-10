import React ,{ useState } from "react";
import { useForm } from "react-hook-form";
import AuthService from "../apis/auth.service";
import axios from "axios";

import {
  Card,
  CardHeader,

  CardBody,
  UncontrolledAlert,
  Form,
} from "reactstrap";

const AddNotification = (props) => {
  const {handleSubmit} = useForm();
  const [formValues, setFormValues] = useState({
    header: "",
    content: "",
  });
  const {classId, addNotification} = props;
  function handleOnChange(event) {
    const val = event.target;
    setFormValues({ ...formValues, [val.name]: val.value });
  }
  const onSubmit = () => {
    const currentUser = AuthService.getCurrentUser();
    const username = currentUser.username;
    const header = document.getElementById("notification-label").value
    const content = document.getElementById("notification-content").value;
    return axios.post("http://localhost:5000/api/notification/post-notification/" ,{
      header: header,
      content: content,
      username: username,
      classId: classId 
      }).then(() => {
        addNotification(true);
        alert("Add Success")
      }).catch(error => console.log(error))
    
        
  };
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
          <Form id="notification-form" role="form" onSubmit={handleSubmit(onSubmit)} className="mt-4">
            <div class="row mb-3">
              <label for="notification-label" class="col-sm-2 col-form-label">
                Tiêu đề
              </label>
              <div class="col-sm-10">
                <input 
                type="text" 
                class="form-control" 
                id="notification-label" 
                name="header"
                value={formValues.header} 
                onChange={handleOnChange} 
                
                ></input>
              </div>
            </div>
            <div class="row mb-3">
              <label for="notification-content" class="col-sm-2 col-form-label">
                Nội dung
              </label>
              <div class="col-sm-10">
                <textarea
                  class="form-control "
                  id="notification-content"
                  placeholder="Required example textarea"
                  required
                  name="content"
                  value={formValues.content}
                  onChange={handleOnChange}
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
