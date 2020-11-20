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
        if (!error) {
          if (store.dataSiswa.length < 1) {
            store.addDataSiswa(data);
          } else {
            if (JSON.stringify(store.dataSiswa) !== JSON.stringify(data)) {
              store.updateDataSiswa(data);
            }
          }
        }
      });
    // eslint-disable-next-line
  }, []);

  return <>{JSON.stringify(store.dataSiswa)}</>;
}

export default observer(TableList);
