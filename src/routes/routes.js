import React, { Suspense } from "react";
import { Switch, Route, Redirect } from "react-router";
import MainPage from "../pages/MainPage/MainPage";

export const Routes = (props) => {
  return (
    <Suspense fallback={<div> Loading... </div>}>
      {" "}
      <Switch>
        {" "}
        <Route path="/home/" component={MainPage} />{" "}
        <Route exact path="/*" render={() => <Redirect to="/home" />} />{" "}
      </Switch>{" "}
    </Suspense>
  );
};
