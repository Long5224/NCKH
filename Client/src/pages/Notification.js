import React from "react";
import Header from "../components/UserHeader/Header";
import { Link, Switch, useRouteMatch, Route } from "react-router-dom";
import AddNotification from "./AddNotification"
import AuthService from "../apis/auth.service";
import LocalService from "../apis/local.service"
import NotificationDetail from "./NotificationDetail";
// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Container,
  Row,
  CardBody,
  ListGroup,
  Form,
  FormGroup,
  InputGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
function Notification(props) {
  let { path, url } = useRouteMatch();
  const [notifications, setNotifications] = React.useState([]);
  const currentUser = AuthService.getCurrentUser();
  const userName = currentUser.username;
  React.useEffect(() => {
    async function getData() {
      const response = await LocalService.getById("notification/username", userName);
      setNotifications(response.data);
      console.log(response)
    }
    getData();
  }, [userName])
  return (
    <>
      {/*Header */}
      <Header />

      {/* Page content */}
      <Container className="mt--8 w-100">
        {/* Table */}
        <Row>
          <div className="col">
            <Switch>
              <Route exact path={path}>
                <Card className="shadow">
                  <CardHeader className="border-1 d-flex flex-row">
                   <h3 className="mb-0">Thông báo</h3>
                    {
                      currentUser.role == "teacher" ? <Link className="ml-auto btn-add-notification" to={`${url}/add`}><i className="fas fa-plus"></i></Link> : ""
                    }
                   
                  </CardHeader>
                  <CardBody className="pt-1">
                    <Form className="">
                      <div className="p-2 d-flex resFlex-column">
                        <FormGroup className="mb-0 ml-auto edit-form-group ">
                          <InputGroup className="">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-zoom-split-in" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Search" type="text" />
                          </InputGroup>
                        </FormGroup>
                      </div>
                    </Form>
                    <hr className="m-0" />
                    <ListGroup className="list-group-flush list ">
                     
                     {notifications.map((item, index) => {
                       return (
                        <Link
                        className=" list-group-item-action px-0"
                        to={`${url}/${item.id}`}
                        key={index}
                      >
                        {item.header}
                      </Link>
                       )
                     })}
                    </ListGroup>
                  </CardBody>

                  <CardFooter className="py-4">
                    <nav aria-label="...">
                      <Pagination
                        className="pagination justify-content-end mb-0"
                        listClassName="justify-content-end mb-0"
                      >
                        <PaginationItem className="disabled">
                          <PaginationLink
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            tabIndex="-1"
                          >
                            <i className="fas fa-angle-left" />
                            <span className="sr-only">Previous</span>
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem className="active">
                          <PaginationLink
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            1
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            2 <span className="sr-only">(current)</span>
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            3
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="fas fa-angle-right" />
                            <span className="sr-only">Next</span>
                          </PaginationLink>
                        </PaginationItem>
                      </Pagination>
                    </nav>
                  </CardFooter>
                </Card>
              </Route>
              <Route exact path={`${path}/add`}>
                <AddNotification />
              </Route>
              <Route path={`${path}/:notificationId`}>
                <NotificationDetail/>
              </Route>
            </Switch>
           
          </div>
        </Row>
      </Container>
    </>
  );
}
export default Notification;
