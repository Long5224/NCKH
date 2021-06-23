import { Container } from "reactstrap";
import Header from "../components/UserHeader/Header";
import { useForm } from "react-hook-form";
import AuthService from "../apis/auth.service";
import axios from "axios";
import LocalService from "../apis/local.service";
import RecentMessage from "../components/RecentMessage/RecentMessage";
import * as signalR from "@microsoft/signalr";
import React, { useState, useEffect, useRef } from "react";
import mesConnection from "../layout/HomeLayout"


function Message() {
  const [parentMessages, setParentMessages] = React.useState([]);
  const [teacherMessages, setTeacherMessages] = React.useState([]);
  const [currentReceiverId, setCurrentReceiverId] = React.useState(null)
  const [users, setUsers] = React.useState([]);
  const currentUser = AuthService.getCurrentUser();
  const currentUserRole = currentUser.role;  
  const username = currentUser.username;
  const currentUserId = username.split("-")[1];
  const messagesEndRef = useRef(null)
  
  const mesConnection = new signalR.HubConnectionBuilder()
  .withUrl("http://localhost:5000/hubs/message",{
    skipNegotiation: false,
    accessTokenFactory: () => AuthService.getCurrentUser().token,
    transport: signalR.HttpTransportType.WebSockets
  })
  .configureLogging(signalR.LogLevel.Information)
  .build();

  React.useEffect(() => {
    async function getData() {
      const response = await LocalService.getById("message/username", username);
      if (currentUserRole ==="parent"){
        setParentMessages(parentMessages => response.data.messages);
        console.log(parentMessages)
      }else{
        setTeacherMessages(teacher => response.data.messages);
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

  useEffect(() => {
    mesConnection.start();
    return() => {
      mesConnection.stop()
    }
  }, []);

  useEffect(() => {   
    mesConnection.on("SendMessage", (message) => {
      setParentMessages(parentMessages => [...parentMessages,message])
      console.log("tin nhan den: ")
      console.log(parentMessages)  
  });  
  },[parentMessages]);

  

  const {handleSubmit} = useForm();
  const onSubmit = () => {
    
      
    const message = document.getElementById("message").value.toString()
    if  (currentUserRole==="parent"){
      return axios.post("http://localhost:5000/api/message/send-message" ,{
      message: message,
      senderUsername: username,
      })
      .then((response) => {
        setParentMessages(parentMessages => [...parentMessages,response.data])
        console.log("tin nhan di")
        console.log(parentMessages)
      })
    }else {
      return axios.post("http://localhost:5000/api/message/send-message" ,{
      message: message,
      senderUsername: username,
      receiverId: currentReceiverId,
      }).then((response) => {
        setParentMessages(parentMessages => [...parentMessages,response.data])
      });
    }
    
  }

  const handleSetCurrentUser = (value) => {
    const id = value.split("-")[0];
    const index = value.split("-")[1];
    setCurrentReceiverId(id);
    console.log(teacherMessages);
    setParentMessages(parentMessages => teacherMessages[index].messages);
    console.log(parentMessages)
  }

  const scrollToBottom = () =>{
    messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
  }
  
  useEffect(() => {
    scrollToBottom()
  },[parentMessages])

  return (
    <>
      <Header />
      <Container className="mt--8">
        <div className="row rounded-lg overflow-hidden shadow">
          <div className="col-7 px-0">
            <div className="px-4 py-5 chat-box bg-white">

            {parentMessages.map((item) => {
              if(currentUserRole === "teacher"){
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
                          <div ref={messagesEndRef}>
                          </div>
                        </div>
                        <p className="small text-muted">{item.sendDate.split("T")[0]}</p>
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
                      <div ref={messagesEndRef}>
                      </div>
                    </div>
                    <p className="small text-muted">{item.sendDate.split("T")[0]}</p>
                  </div>
              </div>
                  )
                }
              }else {
                if(item.senderId != currentUserId) {
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
                      <div ref={messagesEndRef}>
                      </div>
                    </div>
                    <p className="small text-muted">{item.sendDate.split("T")[0]}</p>
                  </div>
                </div>
                   )
                }else if (item.senderId == currentUserId){
                  return(
                    <div className="media w-50 ml-auto mb-3">
                  <div className="media-body">
                    <div className="bg-primary rounded py-2 px-3 mb-2">
                      <p className="text-small mb-0 text-white">
                        {item.content}
                      </p>
                      <div ref={messagesEndRef}>
                      </div>
                    </div>
                    <p className="small text-muted">{item.sendDate.split("T")[0]}</p>
                  </div>
              </div>
                  )
                }
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
