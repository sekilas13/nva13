import { Fragment, useEffect, useContext } from "react";
import { Context } from "../../../../utils/stateProvider";
import { convMonth, updateTime } from "../../../../utils/dateConversion";
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

  return (
    <Fragment>
      {store.dataSiswa.length > 0 &&
        store.dataSiswa.map((data, i) => {
          const date = new Date(data.date);

          return (
            <tr key={i}>
              <td></td>
              <td>{data.email}</td>
              <td>{data.username}</td>
              <td></td>
              <td>
                {date.getDate()} {convMonth(date.getMonth())}{" "}
                {date.getFullYear()} {updateTime(date.getHours())}:
                {updateTime(date.getMinutes())}:{updateTime(date.getSeconds())}
              </td>
            </tr>
          );
        })}
    </Fragment>
  );
}

export default observer(TableList);
