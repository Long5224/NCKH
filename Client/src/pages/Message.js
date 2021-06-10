import React from "react";
import { Container } from "reactstrap";
import Header from "../components/UserHeader/Header";
import { useForm } from "react-hook-form";
import AuthService from "../apis/auth.service";
import axios from "axios";
import LocalService from "../apis/local.service";
import RecentMessage from "../components/RecentMessage/RecentMessage";
function Message() {
  const [parentMessages, setParentMessages] = React.useState([]);
  const [teacherMessages, setTeacherMessages] = React.useState([]);
  const [currentReceiverId, setCurrentReceiverId] = React.useState(null)
  const [users, setUsers] = React.useState([]);
  const currentUser = AuthService.getCurrentUser();
  const currentUserRole = currentUser.role;  
  const username = currentUser.username;
  React.useEffect(() => {
    async function getData() {
      const response = await LocalService.getById("message/username", username);
      if (currentUserRole ==="parent"){
        setParentMessages(response.data.messages);
      }else{
        setTeacherMessages(response.data.messages);
      }
        
      const tempUsers = response.data.messages.map((item) => {
        return {
          recentMessage: item.recentMessage,
          user: item.parent,
        }
      });
      setUsers(tempUsers);
    }
    getData();
  }, [])


  const {handleSubmit} = useForm();
  const onSubmit = () => {
    

    const message = document.getElementById("message").value
    if  (currentUserRole==="parent"){
      return axios.post("http://localhost:5000/api/message/send-message" ,{
      message: message,
      senderUsername: username,
      });
    }else {
      return axios.post("http://localhost:5000/api/message/send-message" ,{
      message: message,
      senderUsername: username,
      receiverId: currentReceiverId,
      });
    }
  }

  const handleSetCurrentUser = (value) => {
    const id = value.split("-")[0];
    const index = value.split("-")[1];
    setCurrentReceiverId(id);
    setParentMessages(teacherMessages[index].messages);
    console.log(parentMessages);
  }
  
  return (
    <>
      <Header />
      <Container className="mt--8">
        <div className="row rounded-lg overflow-hidden shadow">
          <div className="col-7 px-0">
            <div className="px-4 py-5 chat-box bg-white">

            {parentMessages.map((item) => {
              if(item.senderId == currentReceiverId) {
                return (
                  <div className="media w-50 mb-3">
                <img
                  src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg"
                  alt="user"
                  width="50"
                  className="rounded-circle"
                />
                <div className="media-body ml-3">
                  <div className="bg-light rounded py-2 px-3 mb-2">
                    <p className="text-small mb-0 text-muted">
                      {item.content}
                    </p>
                  </div>
                  <p className="small text-muted">12:00 PM | Aug 13</p>
                </div>
              </div>
                 )
              }else {
                return(
                  <div className="media w-50 ml-auto mb-3">
                <div className="media-body">
                  <div className="bg-primary rounded py-2 px-3 mb-2">
                    <p className="text-small mb-0 text-white">
                      {item.content}
                    </p>
                  </div>
                  <p className="small text-muted">12:00 PM | Aug 13</p>
                </div>
            </div>
                )
              }
                      
              })}
            </div>
          <form onSubmit={handleSubmit(onSubmit)} action="#" className="bg-light">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Type a message"
                  aria-describedby="button-addon2"
                  className="form-control rounded-0 border-0 py-4 bg-light"
                  id="message"
                />
                <div className="input-group-append">
                  <button
                    id="button-addon2"
                    type="submit"
                    className="btn btn-link"
                    
                  >
                    {" "}
                    <i className="fa fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
          {currentUserRole == "parent" ? "" : <RecentMessage users={users} currentUser={handleSetCurrentUser}/>}
        </div>
      </Container>
    </>
  );
}
export default Message;
