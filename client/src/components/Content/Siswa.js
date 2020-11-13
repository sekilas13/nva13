import Swal from "sweetalert2";
import { useEffect, useContext, useCallback } from "react";
import io from "socket.io-client";
import { Context } from "../../utils/stateProvider";
import { Logout } from "../../Custom";

function Siswa() {
  document.querySelector("body").style.backgroundColor = "white";

  const store = useContext(Context);
  const socket = io({ query: { token: store.token } });

  const newConnection = useCallback(() => {
    socket.emit("new user", store.genSendData());
  }, [store, socket]);

  useEffect(() => {
    newConnection();

    const Toast = Swal.mixin(store.config.sweetal.Toaster);

    Toast.fire({
      icon: "success",
      title: store.isNewLogin ? "Login sukses" : "Selamat datang kembali",
    });
  });

  return (
    <>
      <p>Siswa</p>
      <Logout socket={socket} />
    </>
  );
}

export default Siswa;
