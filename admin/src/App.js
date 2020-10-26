import { useContext } from "react";
import { Context } from "./utils/stateProvider";
import { observer } from "mobx-react";
import { Login, Dashboard } from "./components";

function App() {
  const store = useContext(Context);

  return store.isLogin ? <Dashboard /> : <Login />;
}

export default observer(App);
