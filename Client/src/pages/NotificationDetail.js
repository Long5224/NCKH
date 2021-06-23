import React from "react";
import { useParams } from "react-router-dom";
import LocalService from "../apis/local.service";
import Header from "../components/UserHeader/Header";
import {
    Card,
    CardHeader,
    CardFooter,
    Pagination,
    PaginationItem,
    PaginationLink,
    Container,
    Row,
    CardBody,
    ListGroup,
    ListGroupItem,
    Form,
    FormGroup,
    InputGroup,
    Input,
    InputGroupAddon,
    InputGroupText,
  } from "reactstrap";
export default function NotificationDetail(props) {
  let { notificationId } = useParams();
  const [notification, setNotification] = React.useState({})
  React.useEffect(() => {
      async function getData() {
          const response = await LocalService.getById("notification", notificationId);
          setNotification(response.data)
          console.log(response)
      }
      getData()
  }, [])
  return (
      <>
      <Header />

      <Container className="mt--8 w-100">
      <Row>
          <div className="col">
                <Card className="shadow">
                  <CardHeader className="border-1 d-flex flex-row">
                    <h3 className="mb-0">{notification.header}</h3>                                   
                  </CardHeader>
                  <CardBody className="pt-1">
                    <p className="mb-0">{notification.content}</p> 
                  </CardBody>
                </Card>           
          </div>
        </Row>
      </Container>
      </>
  )
}
