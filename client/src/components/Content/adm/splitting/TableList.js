import { useEffect, useContext } from "react";
import { Context } from "../../../../utils/stateProvider";
import { observer } from "mobx-react";
import axios from "axios";

function TableList() {
  const store = useContext(Context);

  useEffect(() => {
    axios
      .get("/admin/user/siswa", {
        headers: {
          Authorization: "Bearer " + store.token,
        },
      })
      .then((res) => res.data)
      .then(({ error, data }) => {
        if (!error) store.addDataSiswa(data);
      });
    // eslint-disable-next-line
  }, []);

  return <>{JSON.stringify(store.dataSiswa[0])}</>;
}

export default observer(TableList);
