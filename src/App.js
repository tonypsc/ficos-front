import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CostSheet from './CostSheet/CostSheet';
import Login from './User/Login';
import RecoverPwd from './User/RecoverPwd';
import LinkSent from './User/LinkSent';
import SetPwd from './User/SetPwd';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={"/recoverpwd"} component={RecoverPwd} /> 
      <Route exact path={"/linksent"} component={LinkSent} /> 
      <Route exact path={"/setpwd"} component={SetPwd} /> 
      <Route exact path={"/costsheet"} component={CostSheet} /> 
      <Route component={Login} />
    </Switch>
  </BrowserRouter>
) 

export default App;