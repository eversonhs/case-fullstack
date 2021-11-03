import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CreateLeadController } from "./controllers/CreateLeadController";
import { LeadsPanelController } from "./controllers/LeadsPanelController";
import { SignUpController } from "./controllers/SignUpController";
import "./global.css";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/">
          <SignUpController />
        </Route>
        <Route exact path="/leads">
          <LeadsPanelController />
        </Route>
        <Route exact path="/create-lead">
          <CreateLeadController />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
