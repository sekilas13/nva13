import { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Provider } from "./utils/stateProvider";
import { Vote } from "./routes";

function App() {
  return (
    <Fragment>
      <Router>
        <Switch>
          <Route exact path="/">
            <Link to="/vote">Go to vote</Link>
          </Route>
          <Route path="/vote">
            <Provider>
              <Vote />
            </Provider>
          </Route>
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
