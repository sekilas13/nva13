import { Switch, Route, useRouteMatch } from "react-router-dom";
import { Main, Add, Import, Update } from "./RouteSiswa";
import { observer } from "mobx-react";

function Siswa() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path} component={Main} />
      <Route path={`${path}/add`} component={Add} />
      <Route path={`${path}/import`} component={Import} />
      <Route exact path={`${path}/update/:index`} component={Update} />
    </Switch>
  );
}

export default observer(Siswa);
