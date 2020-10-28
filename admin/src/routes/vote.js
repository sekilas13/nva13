import { useContext } from "react";
import { Context } from "../utils/stateProvider";
import { Login, Dashboard } from "../components";
import { observer } from "mobx-react";

function Vote() {
  const store = useContext(Context);
  return store.isLogin ? <Dashboard /> : <Login />;
}

export default observer(Vote);
