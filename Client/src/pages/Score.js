import React, { useState, useEffect } from "react";
import Header from "../components/UserHeader/Header";
import FilterDropDown from "../components/Filter/FilterDropDown/index";
import Pagination from "../components/Pagination/index";
import SearchFilter from "../components/Filter/Search/index";
import { PATH } from "../constansts/API";
import LocalService from "../apis/local.service";
import AuthService from "../apis/auth.service"
// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  Media,
  Table,
  Container,
  Row,
  Form,
  FormGroup,
} from "reactstrap";
// core components

const Score = () => {
  const dataPerPage = 2;
  const [pagesVisited, setPagesVisited] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [formValues, setFormValues] = useState({
    search: "",
    select: "",
  });
  const [infoUser, setInfoUser] = useState({
    id: null,
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    placeOfBirth: "",
    phoneNumber: "",
    gender: null,
    yearOfAdmission: "",
    classID: null,
    class: {
      id: null,
      name: "",
      facultyId: null,
      faculty: {
        id: null,
        name: "",
      }
    }
  });
  const [scores, setScores] = useState([]);
  const [currentSemesterId, setCurrentSemesterId] = useState("");
  useEffect(() => {
    async function getData() {
      const id = AuthService.getCurrentUser().username.split('-')[1]
      const responseScore = await LocalService.getChildrenById(
        PATH.API_STUDENTS,
        id,
        PATH.API_SCORE
      );
      const response = await LocalService.getById(
        PATH.API_STUDENTS,
        id
      );
      setInfoUser({...response.data.student})
      setScores(responseScore.data);
      setPageCount(Math.ceil(responseScore.data.length / dataPerPage));
    }
    getData();
  }, []);

  function handleOnChange(val) {
    setFormValues({...formValues,[val.name]: val.value})
    setPagesVisited(0);
    if (val.name == "select") {
      if (val.value === "all") {
        setPageCount(scores.length / dataPerPage)
        setCurrentSemesterId("")
        return;
      } else {
        setCurrentSemesterId(val.value);
        const count = scores.filter((values) => {
          if (values.studyTime.course.semester.id == val.value) {
            return val;
          }
        }).length;
        setPageCount(Math.ceil(count / dataPerPage));
      }
    }
  }

  const displayData = scores
    .filter((val) => {
      if (val.studyTime.course.semester.id == currentSemesterId) {
        return val;
      }
      else if(currentSemesterId === ""){
        return val;
      }
    })
    .filter((val) => {
      if (formValues.search === "") {
        return val;
      } else if (
        val.studyTime.course.name
          .toLowerCase()
          .includes(formValues.search.toLowerCase())
      ) {
        return val;
      }
    })
    .slice(pagesVisited, pagesVisited + dataPerPage)
    .map((data, key) => {
      return (
        <tr key={key}>
          <th scope="row">
            <Media>
              <span className="mb-0 text-sm">{data.studyTime.course.name}</span>
            </Media>
          </th>
          <td>{data.mark_process}</td>
          <td>{data.mark_exam}</td>
          <td>{data.mark_exam}</td>
          <td>{data.evaluation}</td>
        </tr>
      );
    });

  function handlePageChange(selected) {
    const currentPage = selected;
    const offset = currentPage * dataPerPage;
    setPagesVisited(offset);
  }
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
              <CardHeader className="border-1">
                <h3 className="mb-0 mt-2">Điểm thi</h3>
              </CardHeader>
              <Form className="">
                <div className="p-2 d-flex resFlex-column">
                  <FormGroup className="mb-0">
                    <FilterDropDown
                      dataFilter={infoUser.yearOfAdmission}
                      onChange={handleOnChange}
                      role="student"
                      currentSelected={currentSemesterId}
                    />
                  </FormGroup>

                  <FormGroup className=" mb-0 ml-auto edit-form-group">
                    <SearchFilter onChange={handleOnChange} />
                  </FormGroup>
                </div>
                <Table className="align-items-center table-flush " responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">
                        Học phần <i className="fas fa-sort"></i>
                      </th>
                      <th scope="col">
                        Điểm thành phần <i className="fas fa-sort"></i>
                      </th>
                      <th scope="col">
                        Điểm thi cuối kì <i className="fas fa-sort"></i>
                      </th>
                      <th scope="col">
                        Điểm tổng kết <i className="fas fa-sort"></i>
                      </th>
                      <th scope="col">
                        Đánh giá <i className="fas fa-sort"></i>
                      </th>
                      <th scope="col">
                        Lần thi <i className="fas fa-sort"></i>
                      </th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>{displayData}</tbody>
                </Table>
              </Form>

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
    </>
  );
};

export default Score;
