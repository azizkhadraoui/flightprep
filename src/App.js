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
import ResetPassword from './pages/password_reset';
import LandingPage from "./pages/LandingPage";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup1} />
          <Route exact path="/reset" component={ResetPassword} />
          <Route exact path="/home" component={LandingPage}/>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;