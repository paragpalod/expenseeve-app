import './style/App.css';
import React from 'react';
import { BrowserRouter as Router , Route, Switch} from 'react-router-dom';
import Home from './routes/Home';
import Settings from './routes/Settings';
import Profile from './routes/Profile';
import NotFound from './routes/NotFound';
import Login from './routes/Login';
import Signup from './routes/Signup';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/home" component={Home} />
          <Route path="/settings" component={Settings} />
          <Route path="/profile" component={Profile} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
