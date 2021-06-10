import React from "react";
import { useParams } from "react-router-dom";
import LocalService from "../apis/local.service"
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
      <h1>{notification.header}</h1>
      <p>{notification.content}</p>
      </>
  )
}
