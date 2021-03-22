import React, {useEffect, useContext} from 'react';
import './App.css';
import Dashboard from './components/dashboard';
import Login from './authComponents/login';
import ForgotPassword from './authComponents/forgotPassword';
import ResetPassword from './authComponents/resetPassword';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MyProvider from './store/index';
import AddNew from './reusableComponents/addNewUser';
import { MyContext } from './store/index';
import Navigation from './components/navigation';
import ViewUser from './reusableComponents/viewUser';
import AddNewUser from './reusableComponents/addNewUser';
import Users from './components/users';
import SimpleSlide from './components/slidingComponent';


function App() {
  
  return (
    <MyProvider>
      <Router>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/forgotPassword" exact>
          <ForgotPassword />
        </Route>
        <Route path="/resetPassword/:resetLink" children={<ResetPassword />} exact />
        <Navigation>  
          <Switch>
            
            <Route path="/" exact>
              <Dashboard />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
          </Switch>
        </Navigation> 
      </Router>
    </MyProvider>
    
  );
}

export default App;
