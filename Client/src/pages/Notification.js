import React from "react";
import Header from "../components/UserHeader/Header";
// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Label,
  CardBody,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
function Notification(props) {
  return (
    <>
      {/*Header */}
      <Header />

      {/* Page content */}
      <Container className="mt--8 w-100">
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-1">
                <h3 className="mb-0">Thông báo</h3>
              </CardHeader>
              <CardBody className="pt-1">
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
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}
export default Notification;
