import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CostSheet from './CostSheet/CostSheet';
import CostElement from './CostElement/CostElement';
import Login from './User/Login';
import RecoverPwd from './User/RecoverPwd';
import LinkSent from './User/LinkSent';
import SetPwd from './User/SetPwd';
import PrivateRoute from './PrivateRoute';
import Enterprise from './Enterprise/Enterprise';
import AddEnterprise from './Enterprise/AddEnterprise';
import EditEnterprise from './Enterprise/EditEnterprise';
import User from './User/User';
import AddUser from './User/AddUser';
import EditUser from './User/EditUser';
import Profile from './User/Profile';


const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={"/login"} component={Login} /> 
      <Route exact path={"/recoverpwd"} component={RecoverPwd} /> 
      <Route exact path={"/linksent"} component={LinkSent} /> 
      <Route path={"/setpwd/:link"} component={SetPwd} /> 
      <Route exact path={"/logout"} render={(props) => {
          localStorage.removeItem('token');
          return(<Login />);
        }} 
      /> 
      <PrivateRoute exact path={"/costsheet"} component={CostSheet} /> 
      <PrivateRoute exact path={"/costelement"} component={CostElement} /> 
      <PrivateRoute exact path={"/enterprise"} component={Enterprise} /> 
      <PrivateRoute exact path={"/enterprise/add"} component={AddEnterprise} /> 
      <PrivateRoute exact path={"/enterprise/edit"} component={EditEnterprise} /> 
      <PrivateRoute exact path={"/user"} component={User} /> 
      <PrivateRoute exact path={"/user/add"} component={AddUser} /> 
      <PrivateRoute exact path={"/user/edit"} component={EditUser} /> 
      <PrivateRoute exact path={"/user/profile"} component={Profile} /> 
      <Route component={Login} />
    </Switch>
  </BrowserRouter>
) 

export default App;