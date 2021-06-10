import React from "react";
import Header from "../components/UserHeader/Header";
import BarChart from "../components/BarChart/BarChart";
import LocalService from "../apis/local.service";
import AuthService from "../apis/auth.service";
import FilterForStatistics from "../components/Filter/FilterDropDown/filterForStatistics";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  ListGroup,
  Row,
  Label,
  FormGroup,
} from "reactstrap";


export default function Statistics() {
  const currentUser = AuthService.getCurrentUser();
  const id = currentUser.username.split("-")[1];
  const [data, setData] = React.useState([]);
  const[displayData, setDisplayData] = React.useState([]);
  React.useEffect(() => {
    async function getData() {
      const response = await LocalService.getChildrenById(
        "teachers",
        id,
        "statistics"
      );
      const data = response.data;
      const initialData = response.data[0];
      setData(data);
      setDisplayData(initialData.scoresSheet);
      console.log(response);
    }
    getData();
  }, [id]);
  const handleOnChange = (value) => {

    setDisplayData(data.find(x => x.semesterId === value).scoresSheet)
  };
  return (
    <>
      <Header />
      <Container className="mt--8 w-100">
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-1 d-flex">
                <h3 className="mb-0">Phổ điểm</h3>
                <FormGroup className="mb-0 ml-auto edit-form-group d-flex align-items-center ">
                  <Label for="input-From_dateOfBirth" className="mr-1 mb-0">
                    Kỳ:
                  </Label>
                  <FilterForStatistics
                    className="ml-auto"
                    data={data}
                    onChange={handleOnChange}
                  />
                </FormGroup>
              </CardHeader>
              <CardBody className="pt-1">
                <ListGroup className="list-group-flush list">
                  <BarChart data={displayData} />
                </ListGroup>
              </CardBody>

              <CardFooter className="py-4"></CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}
