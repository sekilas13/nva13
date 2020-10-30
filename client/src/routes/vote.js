import { useContext } from "react";
import { Context } from "../utils/stateProvider";
import { Login, Admin } from "../components";
import { observer } from "mobx-react";

function Vote() {
  const store = useContext(Context);
  return store.isLogin ? <Admin /> : <Login />;
}

export default observer(Vote);
