import React, { useState, useEffect } from "react";
import Header from "../components/UserHeader/Header";
import FilterDropDown from "../components/Filter/FilterDropDown/index";
import FilterForScore from "../components/Filter/FilterDropDown/filterForScore";
import Pagination from "../components/Pagination/index";
import SearchFilter from "../components/Filter/Search/index";
import { PATH } from "../constansts/API";
import LocalService from "../apis/local.service";
import AuthService from "../apis/auth.service";
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
  Label,
} from "reactstrap";

const Score = () => {
  const dataPerPage = 10;
  const [pagesVisited, setPagesVisited] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [formValues, setFormValues] = useState({
    searched: "",
    scoreFilter: "all",
    semesterFilter: "all",
  });
  const [scores, setScores] = useState([]);
  const [totalScores, setTotalSCore] = useState([]);
  const currentUser = AuthService.getCurrentUser();
  const id = currentUser.username.split("-")[1];
  useEffect(() => {
    async function getData() {
      const responseScore = await LocalService.getChildrenById(
        PATH.API_STUDENTS,
        id,
        PATH.API_SCORE
      );
      const responseTotalScores = await LocalService.getChildrenById(
        PATH.API_STUDENTS,
        id,
        "averageScore"
      );
      setScores(responseScore.data);
      setTotalSCore(responseTotalScores.data);
      console.log(responseScore);
      setPageCount(Math.ceil(responseScore.data.length / dataPerPage));
    }
    getData();
  }, [id]);

  function handleOnChange(val) {
    setFormValues({ ...formValues, [val.name]: val.value });
    setPagesVisited(0);
  }

  const displayData = scores
    .filter((val) => {
      if (val.semesterId === Number(formValues.semesterFilter)) {
        return val;
      } else if (formValues.semesterFilter === "all") {
        return val
      } 
    })
    .filter((val) => {
      if (val.results.evaluation === formValues.scoreFilter) {
        return val;
      } else if (formValues.scoreFilter === "all") {
        return val;
      } else {
        return;
      }
    })

    .filter((val) => {
      if (formValues.searched === "") {
        return val;
      } else if (
        val.course.toLowerCase().includes(formValues.searched.toLowerCase())
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
              <span className="mb-0 text-sm">{data.course}</span>
            </Media>
          </th>
          <td>{data.results.mark_process}</td>
          <td>{data.results.mark_exam}</td>
          <td>
            {parseFloat(
              data.results.mark_process * 0.3 + data.results.mark_exam * 0.7
            ).toFixed(2)}
          </td>
          <td>{data.results.evaluation}</td>
          <td>{data.times}</td>
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
                <h3 className="mb-0 mt-2">
                  BẢNG ĐIỂM TRUNG BÌNH HỌC TẬP NĂM HỌC, HỌC KỲ, TOÀN KHÓA:
                </h3>
              </CardHeader>

              <Table className="align-items-center table-flush " responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">
                      Năm học<i className="fas fa-sort"></i>
                    </th>
                    <th scope="col">
                      Học kỳ<i className="fas fa-sort"></i>
                    </th>
                    <th scope="col">
                      TBTL Hệ 10 N1 <i className="fas fa-sort"></i>
                    </th>
                    <th scope="col">
                      TBTL Hệ4 N1 <i className="fas fa-sort"></i>
                    </th>
                    <th scope="col">
                      Số TC N1 <i className="fas fa-sort"></i>
                    </th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {totalScores.map((data, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">
                          <Media>
                            <span className="mb-0 text-sm">
                              {data.begin_year + "-" + data.end_year}
                            </span>
                          </Media>
                        </th>
                        <td>{data.times === "3" ? "Cả năm" : data.times}</td>
                        <td>{data.totalByTen}</td>
                        <td>{data.totalByFour}</td>
                        <td>{data.tinchi}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>

              <CardFooter className="py-4"></CardFooter>
            </Card>
          </div>
        </Row>

        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-1">
                <h3 className="mb-0 mt-2">BẢNG ĐIỂM CHI TIẾT:</h3>
              </CardHeader>
              <Form className="">
                <div className="p-2 d-flex resFlex-column">
                  <FormGroup className="mb-0 d-flex align-items-center">
                    <Label for="input-From_dateOfBirth" className="mr-1 mb-0">
                      Kỳ:
                    </Label>
                    <FilterDropDown
                      onChange={handleOnChange}
                      page="score"
                      id={id}
                    />
                  </FormGroup>
                  <FormGroup className="mb-0 ml-7 d-flex align-items-center">
                    <Label for="input-From_dateOfBirth" className="mr-1 mb-0">
                      Lọc:
                    </Label>
                    <FilterForScore onChange={handleOnChange} />
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
