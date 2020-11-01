import { useContext, Fragment } from "react";
import { Context } from "../../utils/stateProvider";

// Component
import Admin from "./Admin";
import Siswa from "./Siswa";

function Content() {
  const store = useContext(Context);

  return (
    <Fragment>
      {store.role === "admin" && <Admin />}
      {store.role === "guru" && <p>Guru</p>}
      {store.role === "siswa" && <Siswa />}
    </Fragment>
  );
}

export default Content;
