import React from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import { observer } from "mobx-react-lite";
import { Route, Switch, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import TestErrors from "../../features/errors/TestError";
import { ToastContainer } from "react-toastify";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";

function App() {
  const location = useLocation();
  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar />
      <Route path="/" exact component={HomePage}></Route>
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            {" "}
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <Route path="/activities" exact component={ActivityDashboard}></Route>
                <Route path="/activities/:id" component={ActivityDetails}></Route>
                <Route key={location.key} path={["/createActivity", "/manage/:id"]} component={ActivityForm}></Route>
                <Route key={location.key} path="/server-error" component={ServerError}></Route>
                <Route path="/errors" component={TestErrors} />

                <Route component={NotFound}></Route>
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);
