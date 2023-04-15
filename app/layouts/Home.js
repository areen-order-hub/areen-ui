import React from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
import Sidebar from "components/Sidebar/Sidebar.js";
import RtNavBar from "containers/RtNavBar";
import { useSelector } from "react-redux";
import { initialState } from "../containers/Dashboard/reducer";
import routes from "routes.js";
import get from "lodash/get";
import { useCookies } from "react-cookie";
import isEmpty from "lodash/isEmpty";
import { useAccess } from "utils/permissions";

function Home() {
  const dashboard = useSelector((state) =>
    get(state, "dashboard", { initialState })
  );
  const appData = useSelector((state) => get(state, "global", {}));
  const [cookie] = useCookies(["user"]);
  const pictureFromCookie = get(cookie, "user.picture", null);

  const [sidenavOpen, setSidenavOpen] = React.useState(true);
  const location = useLocation();
  const mainContentRef = React.useRef(null);

  React.useEffect(() => {
    document.body.classList.add("bg-default");
    if (!document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.add("g-sidenav-hidden");
    }
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.remove("bg-default");
      document.body.classList.remove("g-sidenav-hidden");
    };
  });
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContentRef.current.scrollTop = 0;
  }, [location]);

  React.useEffect(() => {
    if (document.body.classList.contains("g-sidenav-show"))
      document.body.classList.remove("g-sidenav-show");
  }, []);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.moduleName && !useAccess(prop.moduleName)) return null;
      if (prop.layout === "" && prop.component) {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
            exact={get(prop, "exact", false)}
          />
        );
      } else {
        return null;
      }
    });
  };

  const toggleSidenav = (e) => {
    if (document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.remove("g-sidenav-pinned");
      document.body.classList.add("g-sidenav-hidden");
    } else {
      document.body.classList.remove("g-sidenav-hidden");
      document.body.classList.add("g-sidenav-pinned");
    }
    setSidenavOpen(!sidenavOpen);
  };

  const getProfileUrl = () => {
    if (isEmpty(dashboard.profilePicture)) {
      if (isEmpty(appData.profilePicture)) {
        if (isEmpty(pictureFromCookie)) {
          return "";
        }
        return pictureFromCookie;
      }
      return appData.profilePicture;
    }
    return dashboard.profilePicture;
  };

  return (
    <>
      <Sidebar
        routes={routes.home}
        toggleSidenav={toggleSidenav}
        sidenavOpen={sidenavOpen}
        logo={{
          innerLink: "#",
          imgSrc: require("assets/img/brand/hikers-light.png"),
          imgAlt: "...",
        }}
      />
      <div className="main-content ml-1" ref={mainContentRef}>
        <RtNavBar
          toggleSidenav={toggleSidenav}
          sidenavOpen={sidenavOpen}
          brandText="Hikers"
          logo={{
            innerLink: "#",
            imgSrc: require("assets/img/brand/hikers-dark.png"),
            imgAlt: "...",
          }}
          profilePicture={getProfileUrl()}
        />
        <Switch>
          {getRoutes(routes.home)}
          <Redirect from="*" to="/dashboard" />
        </Switch>
      </div>
    </>
  );
}

export default Home;
