import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
//import SignUp from "./h";
import Signup1 from "./pages/signup1";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import PrivateAdminRoute from "./adminRoutes";
import Infos from "./infos";
import Login from "./pages/login";
import ResetPassword from "./pages/password_reset";
import LandingPage from "./pages/LandingPage";
import Chapters from "./pages/Chapters2";
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
import Search from './pages/Search';
import Questionsfetch from './pages/Questionsfetch'; 
import CreateQuestion from "./pages/CreateQuestion";
import UpdateQuestion from "./pages/UpdateQuestion";
import About from './pages/About';

import CR3 from './components/questionelements/compass/CR3.jsx';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup1} />
          <Route exact path="/reset" component={ResetPassword} />
          <Route exact path="/home" component={LandingPage} />
          <PrivateRoute exact path="/chapters" component={Chapters} />
          <PrivateRoute exact path="/questions" component={Question} />
          <PrivateRoute exact path="/contact" component={Contact} />
          <PrivateRoute exact path="/subscription" component={Subscription} />
          <PrivateRoute exact path="/exam" component={Exam} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/reset-flags" component={ResetFlags} />
          <PrivateRoute exact path="/notes" component={Notes} />
          <PrivateRoute exact path="/comments" component={Comments} />
          <PrivateRoute exact path="/alltests" component={AllTests} />
          <PrivateRoute exact path="/comingsoon" component={ComingSoon} />
          <PrivateRoute exact path="/canvas" component={Canvas2} />
          <PrivateRoute exact path='/annexes' component={Annexes} />
          <Route exact path='/about' component={About} />
          <PrivateRoute exact path='/search' component={Search} />
          <PrivateAdminRoute exact path='/admin' component={Questionsfetch} />
          <PrivateAdminRoute exact path='/create' component={CreateQuestion} />
          <PrivateAdminRoute exact path='/update/:id' component={UpdateQuestion} />
          <PrivateAdminRoute exact path='/cr3' component={CR3} />

        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;