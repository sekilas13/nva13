import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import { Main } from "./RouteSiswa";
import { observer } from "mobx-react";

function Siswa() {
  const { path } = useRouteMatch();

  return (
    <Router>
      <Switch>
        <Route exact path={path} component={Main} />
      </Switch>
    </Router>
  );
}

export default observer(Siswa);
