import React, { useState, useEffect } from "react";
import Header from "../components/UserHeader/Header";
import Student from "./Student";
import Local from "../apis/local.service";
import { PATH } from "../constansts/API";
import SearchFilter from "../components/Filter/Search/index";
import Pagination from "../components/Pagination/index";
import AuthService from "../apis/auth.service";
// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  Container,
  Row,
  CardBody,
  ListGroup,
  Form,
  FormGroup,
} from "reactstrap";
import { Link, Switch, useRouteMatch, Route } from "react-router-dom";
function Students(props) {
  let { path, url } = useRouteMatch();
  const [students, setStudents] = useState([]);
  const [formValues, setFormValues] = useState({
    searched: "",
  });
  const currentUser = AuthService.getCurrentUser();
  const id = currentUser.username.split("-")[1];
  
  const dataPerPage = 2;
  const [pagesVisited, setPagesVisited] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  useEffect(() => {
    async function getData() {
      const response = await Local.getChildrenById(
        PATH.API_TEACHER,
        id,
        PATH.API_STUDENTS
      );
      setStudents(response.data);
      setPageCount(Math.ceil(response.data.length / dataPerPage));
    }
    getData();
  }, []);

  function handleOnChange(val) {
    setFormValues({ ...formValues, [val.name]: val.value });
    setPagesVisited(0);
  }

  function handlePageChange(selected) {
    const currentPage = selected;
    const offset = currentPage * dataPerPage;
    setPagesVisited(offset);
  }

  const displayData = students
    .filter((val) => {
      if (formValues.searched === "") {
        return val;
      } else if (
        val.firstName
          .concat(" ", val.lastName)
          .toLowerCase()
          .includes(formValues.search.toLowerCase())
      ){
        return val;
      }
    
    })
    .slice(pagesVisited, pagesVisited + dataPerPage)
    .map((prop, key) => {
      return (
        <Link
          to={`${url}/${prop.id}`}
          className="list-group-item-action px-0 d-inline list-group-item"
          key={key}
        >
          {prop.firstName + " " + prop.lastName + " (" + prop.id + ")"}
        </Link>
      );
    });
  return (
    <>
      {/*Header */}
      <Switch>
        <Route exact path={path}>
          <Header />
          {/* Page content */}
          <Container className="mt--8 w-100">
            {/* Table */}
            <Row>
              <div className="col">
                <Card className="shadow">
                  <CardHeader className="border-1">
                    <h3 className="mb-0">Danh sách sinh viên</h3>
                  </CardHeader>
                  <CardBody className="pt-1">
                    {/* Filter */}
                    <Form className="">
                      <div className="p-2 d-flex resFlex-column">
                        <FormGroup className="mb-0 ml-auto edit-form-group ">
                          <SearchFilter onChange={handleOnChange} />
                        </FormGroup>
                      </div>
                    </Form>
                    <hr className="m-0" />
                    <ListGroup className="list-group-flush list">
                      {displayData}
                    </ListGroup>
                  </CardBody>

                  <CardFooter className="py-4">
                    <nav aria-label="...">
                      <Pagination
                        pageCount={pageCount}
                        onPageChange={handlePageChange}
                      />
                    </nav>
                  </CardFooter>
                </Card>
              </div>
            </Row>
          </Container>
        </Route>

        <Route path={`${path}/:studentId`}>
          <Student />
        </Route>
      </Switch>
    </>
  );
}
export default Students;
