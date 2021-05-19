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

function Scholarship(props) {
    const [generals, setGenerals] = React.useState([])
  const currentUser = AuthService.getCurrentUser();
  const id = currentUser.username.split("-")[1];
  useEffect(() => {
    async function getData() {
   const response = await Local.getChildrenById("students", id, "general");
   setGenerals(response.data);
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
                <h3 className="mb-0">Thông tin khác</h3>
              </CardHeader>

              <Table
                className="align-items-center table-flush "
                responsive
              >
                <thead className="thead-light">
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Năm học</th>
                    <th scope="col">Học kì</th>
                    <th scope="col">Điểm rèn luyện</th>
                    <th scope="col">Xếp loại</th>
                    <th scope="col">Học phí</th>
                    <th scope="col">Học bổng</th>
                  </tr>
                </thead>
                <tbody>
                 {generals.map((item, index) => {
                     return (
                         <tr>
                             <th scope="col">{index + 1}</th>
                             <th scope="col">{item.semester.begin_year + "-" + item.semester.end_year}</th>
                             <th scope="col">{item.semester.times}</th>
                             <th scope="col">{item.training_point}</th>
                             <th scope="col">{item.classification}</th>
                             <th scope="col">{item.tuition}</th>
                             <th scope="col">{item.scholarship}</th>
                         </tr>
                     )
                 })}
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
export default Scholarship;
