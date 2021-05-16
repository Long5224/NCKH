import React from "react";
import Header from "../components/UserHeader/Header";
import { Link, Switch, useRouteMatch, Route } from "react-router-dom";
import AddNotification from "./AddNotification"
import * as signalR from "@microsoft/signalr";
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
  ListGroupItem,
  Form,
  FormGroup,
  InputGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
function Notification(props) {
  const connection = new signalR.HubConnectionBuilder()
        .withUrl("http://localhost:5000/Hubs/notification/",{
          skipNegotiation: true,
          transport: signalR.HttpTransportType.WebSockets
        })
        .configureLogging(signalR.LogLevel.Information)
        .build();
        connection.start().then(() => {
          connection.on("sendToReact", (message) => {
            console.log(message)
          });
        })
        .catch((error) => console.log(error));;
        
  let { path, url } = useRouteMatch();
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
                    <Link
                      className="ml-auto btn-add-notification"
                      to={`${url}/add`}
                    >
                      <i class="fas fa-plus"></i>
                    </Link>
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
                    <ListGroup id="notificationList" className="list-group-flush list ">
                      <ListGroupItem id="testNotification"
                        className=" list-group-item-action px-0"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tag="a"
                      >
                        Dapibus ac facilisis in
                      </ListGroupItem>
                      
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
              <Route path={`${path}/:add`}>
                <AddNotification />
              </Route>
            </Switch>
            {/*
            <Card className="shadow">
              <CardHeader className="border-1 d-flex flex-row">
                <h3 className="mb-0">Thông báo</h3>
                <Link className="ml-auto btn-add-notification" to="/home/notification/add"><i class="fas fa-plus"></i></Link>
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
                  <ListGroupItem
                    className=" list-group-item-action px-0"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    tag="a"
                  >
                    Dapibus ac facilisis in
                  </ListGroupItem>
                  <ListGroupItem
                    className=" list-group-item-action px-0"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    tag="a"
                  >
                    Morbi leo risus
                  </ListGroupItem>
                  <ListGroupItem
                    className=" list-group-item-action px-0"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    tag="a"
                  >
                    Porta ac consectetur ac
                  </ListGroupItem>
                  <ListGroupItem
                    className=" list-group-item-action px-0"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    tag="a"
                  >
                    Vestibulum at eros
                  </ListGroupItem>
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
           </Card>*/}
          </div>
        </Row>
      </Container>
    </>
  );
}
export default Notification;
