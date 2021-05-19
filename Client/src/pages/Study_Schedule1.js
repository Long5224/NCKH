import React, { useState, useEffect } from "react";
import Header from "../components/UserHeader/Header";
import Local from "../apis/local.service";
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
  Badge,
} from "reactstrap";
import moment from "moment";

function Study_Schedule(props) {
  const [courseClasses, setCourseClasses] = useState({
    t1: [],
    t2: [],
    t3: [],
    t4: [],
  });
  const currentUser = AuthService.getCurrentUser();
  const id = currentUser.username.split("-")[1];
  useEffect(() => {
    async function getData() {
      const response = await Local.getChildrenById(
        "students",
        id,
        "study_schedule"
      );
      setCourseClasses(response.data);
      console.log(response.data);
    }
    getData();
  }, []);

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
                <h3 className="mb-0">Lich học tuần hiện tại</h3>
              </CardHeader>

              <Table
                className="align-items-center table-flush "
                responsive
                striped
                bordered
                hover
              >
                <thead className="thead-light">
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">Thứ 2</th>
                    <th scope="col">Thứ 3</th>
                    <th scope="col">Thứ 4</th>
                    <th scope="col">Thứ 5</th>
                    <th scope="col">Thứ 6</th>
                    <th scope="col">Thứ 7</th>
                    <th scope="col">Chủ nhật</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="col">Tiết 1</th>
                    {courseClasses.t1
                      .sort((a, b) => a.day - b.day)
                      .map((item, index) => {
                        return (
                          <th key={index} scope="col">
                            {item.courseName + "(" + item.courseClassName + ")"}
                          </th>
                        );
                      })}
                  </tr>
                  <tr>
                    <th scope="col">Tiết 2</th>
                    {courseClasses.t2
                      .sort((a, b) => a.day - b.day)
                      .map((item, index) => {
                        return (
                          <th key={index} scope="col">
                            {item.courseName + " (" + item.courseClassName + ")"}
                          </th>
                        );
                      })}
                  </tr>
                  <tr>
                    <th scope="col">Tiết 3</th>
                    {courseClasses.t3
                      .sort((a, b) => a.day - b.day)
                      .map((item, index) => {
                        return (
                          <th key={index} scope="col">
                            {item.courseName + "(" + item.courseClassName + ")"}
                          </th>
                        );
                      })}
                  </tr>
                  <tr>
                    <th scope="col">Tiết 4</th>
                    {courseClasses.t4
                      .sort((a, b) => a.day - b.day)
                      .map((item, index) => {
                        return (
                          <th key={index} scope="col">
                            {item.courseName + "(" + item.courseClassName + ")"}
                          </th>
                        );
                      })}
                  </tr>
                </tbody>
              </Table>

              <CardFooter className="py-4"></CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}
export default Study_Schedule;
