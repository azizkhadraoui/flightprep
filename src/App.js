import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./l";
import SignUp from "./h";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import Infos from "./infos";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/infos" component={Infos} />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;