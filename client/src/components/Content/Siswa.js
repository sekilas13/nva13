import Swal from "sweetalert2";
import { useEffect, useContext, useCallback } from "react";
import io from "socket.io-client";
import { Context } from "../../utils/stateProvider";

function Siswa() {
  document.querySelector("body").style.backgroundColor = "white";

  const store = useContext(Context);
  const socket = io({ query: { token: store.token } });

  const newConnection = useCallback(() => {
    socket.emit("new user", {
      role: store.role,
      id: store.userId,
      username: store.username,
      sended: Date.now(),
    });
  }, [store, socket]);

  useEffect(() => {
    newConnection();

    const Toast = Swal.mixin(store.config.sweetal.Toaster);

    Toast.fire({
      icon: "success",
      title: store.isNewLogin ? "Login sukses" : "Selamat datang kembali",
    });
  });

  return <p>Siswa</p>;
}

export default Siswa;
