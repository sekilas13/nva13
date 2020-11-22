import { Switch, Route, useRouteMatch } from "react-router-dom";
import { Main, Add } from "./RouteSiswa";
import { observer } from "mobx-react";

function Siswa() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path} component={Main} />
      <Route path={`${path}/add`} component={Add} />
    </Switch>
  );
}

export default observer(Siswa);
