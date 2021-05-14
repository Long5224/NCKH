import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import routes from "../routes/routes";
import Navbar from "../components/Navbar/Navbar";
import { Container } from "reactstrap";
import Footer from "../components/Footer/Footer";
import AuthService from "../apis/auth.service";
function HomeLayout(props) {
  const mainContent = React.useRef(null);
  const location = useLocation();
  const [currentRoutes, setCurrentRoutes] = useState([]);
  useEffect(() => {
    async function getData() {
      const routesResult = routes.filter((prop) => {
        if (prop.role.includes(currentUserRole) === true) {
          return prop;
        }
      });
      setCurrentRoutes(routesResult);
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      mainContent.current.scrollTop = 0;
    }
    getData();
  }, [location]);
  const currentUserRole = AuthService.getCurrentUser().role;
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
  return (
    <>
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
        <Navbar {...props} brandText={getBrandText(props.location.pathname)} />
        <Switch>
          {getRoutes(routes)}
          <Redirect exact from="/home" to="/home/index" />
        </Switch>
        {/*Footer */}
        <Container>
          <Footer />
        </Container>
      </div>
    </>
  );
}
export default HomeLayout;
