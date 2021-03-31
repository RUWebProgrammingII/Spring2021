import { Switch, Route } from 'react-router-dom';
import WelcomeView from './views/WelcomeView';
import DashboardView from './views/DashboardView';
import "./styles/index.scss";

const App = () => (
  <Switch>
    <Route exact path="/" component={WelcomeView} />
    <Route exact path="/dashboard" component={DashboardView} />
  </Switch>
);

export default App;