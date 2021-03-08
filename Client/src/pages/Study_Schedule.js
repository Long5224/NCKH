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
} from "reactstrap";
function Study(props) {
  return (
    <>
      {/*Header */}
      <Header />

      {/* Page content */}
      <Container className="mt--8" >
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-1">
                <h3 className="mb-0">Lich học</h3>
              </CardHeader>
              <Form className="">
                <div className="p-2 d-flex resFlex-column">
                  <FormGroup className=" mb-0 mr-3 edit-form-group d-flex align-items-center">
                    <Label
                      for="input-From_dateOfBirth"
                      className="mr-1 mb-0"
                    >
                      Từ: 
                    </Label>
                    <Input
                      className="form-control-alternative "
                      id="input-From_dateOfBirth"
                      type="date"
                    />
                  </FormGroup>

                  <FormGroup className=" mb-0 edit-form-group d-flex align-items-center">
                  <Label
                      for="input-From_dateOfBirth"
                      className="mr-1 mb-0"
                    >
                      Đến: 
                    </Label>
                    <Input
                      className="form-control-alternative "
                      id="input-From_dateOfBirth"
                      type="date"
                    />
                  </FormGroup>
                  <FormGroup className=" mb-0 ml-auto edit-form-group">
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

                <Table className="align-items-center table-flush " responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">
                        Lớp học phần <i className="fas fa-sort"></i>
                      </th>
                      <th scope="col">
                        Thời gian <i className="fas fa-sort"></i>
                      </th>
                      <th scope="col">Địa điểm</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">
                        <Media>
                          <span className="mb-0 text-sm">
                            Những nguyên lý cơ bản của chủ nghĩa MLN F2
                          </span>
                        </Media>
                      </th>
                      <td>10</td>

                      <td>10</td>

                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Another action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Something else here
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Form>

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
export default Study;
