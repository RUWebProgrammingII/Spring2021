import { Switch, Route } from 'react-router-dom';
import WelcomeView from './views/WelcomeView';
import DashboardView from './views/DashboardView';
import withAuthorization from './components/HOCs/withAuthorization';
import withAllowAnonymous from './components/HOCs/withAllowAnonymous';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={withAllowAnonymous(WelcomeView)} />
      <Route exact path="/dashboard" component={withAuthorization(DashboardView)} />
    </Switch>
  );
}

export default App;
