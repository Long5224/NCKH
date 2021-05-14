import React, { useState, useEffect } from "react";
import Header from "../components/UserHeader/Header";
import Local from "../apis/local.service";
import Pagination from "../components/Pagination/index";
import SearchFilter from "../components/Filter/Search/index";
import SortName from "../components/Sorting/SortName";
import SortNumber from "../components/Sorting/SortNumber";
import DateTo from "../components/Filter/DayFilter/DateTo"
import DateFrom from "../components/Filter/DayFilter/DateFrom"
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
  Badge
} from "reactstrap";
import moment from "moment";

function Study(props) {
  const [courseClasses, setCourseClasses] = useState([]);
  const dataPerPage = 2;
  const [pagesVisited, setPagesVisited] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [formValues, setFormValues] = useState({
    search: "",
    fromDate: "",
    toDate: "",
  });
  const [sort, setSort] = useState({
    sortBy: "number",
    value: 1,
  });
  useEffect(() => {
    async function getData() {
      const response = await Local.getAll("study-schedule/");
      setCourseClasses(response.data);
      setPageCount(Math.ceil(response.data.length / dataPerPage));
    }
    getData();
  }, []);

  function handlePageChange(selected) {
    const currentPage = selected;
    const offset = currentPage * dataPerPage;
    setPagesVisited(offset);
  }

  function handleOnChange(val) {
    setFormValues({ ...formValues, [val.name]: val.value });
    setPagesVisited(0);
    console.log(formValues);
  }

  function handleOnClear() {
    setFormValues({
      search: "",
      fromDate: "",
      toDate: "",
    });
  }

  function handleOnSort(value) {
    setSort(value);
  }

  const displayData = courseClasses
    .sort((a, b) => {
      if (sort.sortBy === "name") {
        var nameA = a.studyTimes.course.name.toUpperCase();
        var nameB = b.studyTimes.course.name.toUpperCase();
        if (nameA < nameB) {
          return -sort.value;
        }
        if (nameA > nameB) {
          return sort.value;
        }
        return 0;
      }
      if (sort.sortBy === "number") {
        const aTime = new Date(a.begin_time).getTime();
        const bTime = new Date(b.begin_time).getTime();
        if (sort.value === 1) {
          return aTime - bTime;
        }
        if (sort.value === -1) {
          return bTime - aTime;
        }
      }
    })
    .filter((val) => {
      if (formValues.search === "") {
        return val;
      } else if (
        val.studyTimes.course.name
          .toLowerCase()
          .includes(formValues.search.toLowerCase())
      ) {
        return val;
      }
    })
    .filter((val) => {
      const begin_time = new Date(val.begin_time).getTime();
      const end_time = new Date(val.end_time).getTime();
      const fromTime = new Date(formValues.fromDate);
      const toTime = new Date(formValues.toDate);
      if (
        fromTime.getTime() > toTime.getTime() ||
        moment(fromTime).isValid() === false ||
        moment(toTime).isValid() === false
      ) {
        return val;
      } else if (
        fromTime.getTime() <= begin_time &&
        toTime.getTime() >= end_time
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
              <span className="mb-0 text-sm">
                {data.studyTimes.course.name + " (" + data.name + ")"}
              </span>
            </Media>
          </th>
          <td>{data.begin_time}</td>
          <td>{data.end_time}</td>
          <td>{data.location}</td>
        </tr>
      );
    });

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
                <h3 className="mb-0">Lich học</h3>
              </CardHeader>

              {/*Filter */}
              <Form className="">
                <div className="p-2 d-flex resFlex-column position-relative">
                  <FormGroup className=" mb-0 mr-3 edit-form-group d-flex align-items-center">
                    <DateFrom onChange={handleOnChange} />
                  </FormGroup>

                  <FormGroup className=" mb-0 mr-3 edit-form-group d-flex align-items-center">
                    <DateTo onChange={handleOnChange} />
                  </FormGroup>
                  {moment(formValues.fromDate).isValid() === true &&
                  moment(formValues.toDate).isValid() ? (
                    <Badge
                      className="badge-danger position-absolute badge-study-schedule"
                      href="#pablo"
                      onClick={handleOnClear}
                    >
                      <i class="fas fa-times"></i>
                    </Badge>
                  ) : (
                    ""
                  )}

                  <FormGroup className=" mb-0 ml-auto edit-form-group">
                    <SearchFilter onChange={handleOnChange} />
                  </FormGroup>
                </div>
              </Form>

              <Table className="align-items-center table-flush " responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">
                      {/*Sort by Name */}
                      <SortName onSortName={handleOnSort} name={"Lớp học phần"}/>
                    </th>
                    <th scope="col">
                      {/*Sort by Number */}
                      <SortNumber
                        onSortNumber={handleOnSort}
                        name={"Thời gian bắt đầu"}
                      />
                    </th>
                    <th scope="col">
                      {/*Sort by Number */}
                      <SortNumber
                        onSortNumber={handleOnSort}
                        name={"Thời gian kết thúc"}
                      />
                    </th>
                    <th scope="col">Địa điểm</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>{displayData}</tbody>
              </Table>

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
}
export default Study;
