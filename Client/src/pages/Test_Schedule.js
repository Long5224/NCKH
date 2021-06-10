import React from "react";
import Header from "../components/UserHeader/Header";
import LocalService from "../apis/local.service";
import AuthService from "../apis/auth.service";
import moment from "moment";
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
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
} from "reactstrap";

function Test(props) {
  const [exams, setExams] = React.useState([]);
  const currentUser = AuthService.getCurrentUser();
  const id = currentUser.username.split("-")[1];
  React.useEffect(() => {
    async function getData() {
      const response = await LocalService.getChildrenById(
        "students",
        id,
        "exam_schedule"
      );
      setExams(response.data);
      console.log(response)
    }
    getData()
  }, [id]);
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
                <h3 className="mb-0 mt-2">Lịch thi</h3>
              </CardHeader>
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
                <Table className="align-items-center table-flush " responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">
                        Học phần <i className="fas fa-sort"></i>
                      </th>
                      <th scope="col">
                        Ngày thi <i className="fas fa-sort"></i>
                      </th>
                      <th scope="col">
                        Ca thi <i className="fas fa-sort"></i>
                      </th>
                      <th scope="col">
                        Hình thức thi <i className="fas fa-sort"></i>
                      </th>
                      <th scope="col">
                        Số báo danh <i className="fas fa-sort"></i>
                      </th>
                      <th scope="col">
                        Phòng thi <i className="fas fa-sort"></i>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {exams.map((item, index) => {
                      return (
                        <tr>
                          <th scope="row">
                            <Media>
                              <span className="mb-0 text-sm">
                                {item.courseClass}
                              </span>
                            </Media>
                          </th>
                          <td>{moment(item.day).format("YYYY-MM-DD")}</td>

                          <td>{item.shift}</td>

                          <td>{item.type}</td>

                          <td>{item.number}</td>

                          <td>{item.room}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Form>

              <CardFooter className="py-4">
                <nav aria-label="...">
                
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}
export default Test;
