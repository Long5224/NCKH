import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import routes from "../routes/routes";
import Navbar from "../components/Navbar/Navbar";
import { Container } from "reactstrap";
import Footer from "../components/Footer/Footer";
import AuthService from "../apis/auth.service";
import { UserProvider } from "../components/UserContext/UserContext";
import * as signalR from "@microsoft/signalr";
import { NotificationProvider } from "../components/UserContext/NotificationContext"
function HomeLayout(props) {
  const mainContent = React.useRef(null);
  const location = useLocation();
  const [currentRoutes, setCurrentRoutes] = useState([]);
  const [user, setUser] = React.useState(AuthService.getCurrentUser());
  const notiConnection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5000/hubs/notification/",{
      skipNegotiation: false,
       accessTokenFactory: () => AuthService.getCurrentUser().token,
      transport: signalR.HttpTransportType.WebSockets
    })
    .configureLogging(signalR.LogLevel.Information)
    .build();
  // mesConnection = new signalR.HubConnectionBuilder()
  // .withUrl("http://localhost:5000/hubs/message",{
  //   skipNegotiation: false,
  //   accessTokenFactory: () => AuthService.getCurrentUser().token,
  //   transport: signalR.HttpTransportType.WebSockets
  // })
  // .configureLogging(signalR.LogLevel.Information)
  // .build();  

  useEffect(() => {
    async function getData() {
      const routesResult = routes.filter((prop) => {
        if (prop.role.includes(user.role) === true) {
          return prop;
        }
      });
      const response = await AuthService.get(user.username);
      setUser({...response.data});
      setCurrentRoutes(routesResult);
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      mainContent.current.scrollTop = 0;
    }
    getData();
  }, [location]);
  
  useEffect(() => {
    notiConnection.start();
    notiConnection.on("Send", (message) => {
      alert(message);
    });
  }, []);
  
  // useEffect(() => {
  //   mesConnection.start();
  //   mesConnection.on("Send", (message) => {
      
  //   });
  // }, []);
  
  
  const getRoutes = () => {
    return currentRoutes.map((prop, key) => {
      return (
        <Route
          path={prop.layout + prop.path}
          component={prop.component}
          key={key}
        />
      );
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  const handleChangeUser = (value, name) => {
    setUser({...user, [name]: value});
  }

  const UpdateUser = () => {
    const data = {
      username: user.username,
      email: user.email
    }
    AuthService.update(data, "email")
    .then((res) => {
      console.log(res);
      setUser({...user, email: data.email});
    })
    .catch((error) => console.error(error));
  }

  const onLoadNotifcation = () => {
    notiConnection.start().then(() => {
      notiConnection.on("Send", (message) => {
        
      })
    });
  }

  return (
    <NotificationProvider value={onLoadNotifcation}>
      <UserProvider value={{user, handleChangeUser, UpdateUser}}>
        <Sidebar
          className="custom-sidebar"
          {...props}
          routes={currentRoutes}
          logo={{
            innerLink: "/home/index",
            imgSrc: require("../assets/images/main-logo.png").default,
            imgAlt: "...",
          }}
        />
        <div className="main-content" ref={mainContent}>
          <Navbar  brandText={getBrandText(props.location.pathname)} user={user} />
          <Switch>
            {getRoutes(routes)}
            <Redirect from="/" to="/home/general" />
          </Switch>
          {/*Footer */}
          <Container>
            <Footer />
          </Container>
        </div>
      </UserProvider>
    </NotificationProvider>
  );
}
export default HomeLayout;
