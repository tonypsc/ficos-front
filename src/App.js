import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CostSheet from './CostSheet/CostSheet';
import CostElement from './CostElement/CostElement';
import Login from './User/Login';
import RecoverPwd from './User/RecoverPwd';
import LinkSent from './User/LinkSent';
import SetPwd from './User/SetPwd';
import PrivateRoute from './PrivateRoute';
import Enterprise from './Enterprise/Enterprise';

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
        }} /> 
      <PrivateRoute exact path={"/costsheet"} component={CostSheet} /> 
      <PrivateRoute exact path={"/costelement"} component={CostElement} /> 
      <PrivateRoute exact path={"/enterprise"} component={Enterprise} /> 
      <Route component={Login} />
    </Switch>
  </BrowserRouter>
) 

export default App;