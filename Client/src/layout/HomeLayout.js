import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import { Route, Switch, Redirect, useLocation } from 'react-router-dom'
import routes from '../routes/routes'
import Navbar from '../components/Navbar/Navbar'
import { Container } from 'reactstrap'
import Footer from '../components/Footer/Footer'
function HomeLayout(props) {
    const mainContent = React.useRef(null);
    const location = useLocation();
    React.useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        mainContent.current.scrollTop = 0;
    }, [location]);

    const getRoutes = (routes) => {
        return routes.map((prop, key) => {
            if (prop.layout === "/home") {
                return (
                    <Route
                        path={prop.layout + prop.path}
                        component={prop.component}
                        key={key}
                    />
                );
            } else {
                return null;
            }
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
                {...props}
                routes={routes}
                logo={{
                    innerLink: "/home/index",
                    imgSrc: require("../assets/images/main-logo.png").default,
                    imgAlt: "...",
                }}
            />
            <div className="main-content" ref={mainContent}>
                <Navbar
                    {...props}
                    brandText={getBrandText(props.location.pathname)}
                />
                <Switch>
                    {getRoutes(routes)}
                    <Redirect from="*" to="/home/index" />
                </Switch>
                {/*Footer */}
                <Container>
                    <Footer />
                </Container>
            </div>

        </>
    )
}
export default HomeLayout;