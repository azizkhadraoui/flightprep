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
import Chapters from "./pages/Chapters";
import Question from "./pages/Question";
import Contact from "./pages/Contact";
import Subscription from "./pages/Subscription";
import Exam from "./pages/Exam";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ResetFlags from './pages/ResetFlags';

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
          <PrivateRoute exact path='/chapters' component={Chapters}/>
          <PrivateRoute exact path='/questions' component={Question}/>
          <PrivateRoute exact path='/contact' component={Contact}/>
          <PrivateRoute exact path='/subscription' component={Subscription}/>
          <PrivateRoute exact path='/exam' component={Exam}/>
          <Route exact path='/dashboard' component={Dashboard}/>
          <PrivateRoute exact path='/profile' component={Profile}/>
          <Route exact path="/resetflags" component={ResetFlags}/>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;