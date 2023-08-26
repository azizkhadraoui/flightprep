import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
//import SignUp from "./h";
import Signup1 from './pages/signup1';
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import Infos from "./infos";
import Login from "./pages/login";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup1} />
          <PrivateRoute exact path="/infos" component={Infos} />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;