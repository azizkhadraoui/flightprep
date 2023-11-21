import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
//import SignUp from "./h";
import Signup1 from "./pages/signup1";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import Infos from "./infos";
import Login from "./pages/login";
import ResetPassword from "./pages/password_reset";
import LandingPage from "./pages/LandingPage";
import Chapters2 from "./pages/Chapters2";
import Question from "./pages/Question";
import Contact from "./pages/Contact";
import Subscription from "./pages/Subscription";
import Exam from "./pages/Exam";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ResetFlags from "./pages/ResetFlags";
import Notes from "./pages/Notes";
import Comments from "./pages/Comments";
import AllTests from "./pages/AllTests";
import ComingSoon from "./pages/ComingSoon";
import Canvas2 from "./components/questionelements/Canvas2";
import Annexes from "./pages/Annexes";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Route exact path="/" component={Dashboard} />{" "}
          <Route exact path="/login" component={Login} />{" "}
          <Route exact path="/signup" component={Signup1} />{" "}
          <Route exact path="/reset" component={ResetPassword} />{" "}
          <Route exact path="/home" component={LandingPage} />{" "}
          <Route exact path="/chapters" component={Chapters2} />{" "}
          <Route exact path="/questions" component={Question} />{" "}
          <PrivateRoute exact path="/contact" component={Contact} />{" "}
          <PrivateRoute exact path="/subscription" component={Subscription} />{" "}
          <PrivateRoute exact path="/exam" component={Exam} />{" "}
          <PrivateRoute exact path="/dashboard" component={Dashboard} />{" "}
          <Route exact path="/profile" component={Profile} />{" "}
          <Route exact path="/reset-flags" component={ResetFlags} />{" "}
          <Route exact path="/notes" component={Notes} />{" "}
          <Route exact path="/comments" component={Comments} />{" "}
          <Route exact path="/alltests" component={AllTests} />{" "}
          <Route exact path="/comingsoon" component={ComingSoon} />
          <Route exact path="/canvas" component={Canvas2} />{" "}
          <Route exact path='/annexes' component={Annexes}/>
        </div>{" "}
      </Router>{" "}
    </AuthProvider>
  );
};

export default App;
