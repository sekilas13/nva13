import { useEffect, useContext } from "react";
import { Context } from "../../../utils/stateProvider";
import { observer } from "mobx-react";
import axios from "axios";

function Siswa() {
  const store = useContext(Context);
  useEffect(() => {
    axios
      .get("/admin/user/siswa", {
        headers: {
          Authorization: "Bearer " + store.token,
        },
      })
      .then(console.log);
  });
  return <></>;
}

export default observer(Siswa);
