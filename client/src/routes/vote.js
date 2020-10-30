import { useContext } from "react";
import { Context } from "../utils/stateProvider";
import { Login, Content } from "../components";
import { observer } from "mobx-react";

function Vote() {
  const store = useContext(Context);
  return store.isLogin ? <Content /> : <Login />;
}

export default observer(Vote);
