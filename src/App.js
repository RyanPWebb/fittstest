import logo from './logo.svg';
import './App.css';
import FittsTest from './Fitts';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Summary from './Summary';
import Home from './Home';
import Conclusion from './Conclusion';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/test/:difficulty">
            <FittsTest/>
          </Route>
          <Route path="/summary/:avg/:difficulty">
            <Summary/>
          </Route>
          <Route path='/conclusion'>
            <Conclusion/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
