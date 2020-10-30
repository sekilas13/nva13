import { useContext, Fragment } from "react";
import { Context } from "../../utils/stateProvider";

// Component
import Admin from "./Admin";

function Content() {
  const store = useContext(Context);

  return (
    <Fragment>
      {store.role === "admin" && <Admin />}
      {store.role === "guru" && <p>Guru</p>}
      {store.role === "siswa" && <p>Siswa</p>}
    </Fragment>
  );
}

export default Content;
