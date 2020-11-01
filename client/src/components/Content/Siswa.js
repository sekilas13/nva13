import Swal from "sweetalert2";
import { useEffect, useContext, useState, useCallback } from "react";
import io from "socket.io-client";
import { Context } from "../../utils/stateProvider";

function Siswa() {
  const [toastPop, STP] = useState(false);
  document.querySelector("body").style.backgroundColor = "white";

  const store = useContext(Context);
  const socket = io({ query: { token: store.token } });

  const newConnection = useCallback(() => {
    socket.emit("new user", {
      role: store.role,
      id: store.userId,
      sended: Date.now(),
    });
  }, [store, socket]);

  const setToastPop = useCallback(() => STP(!toastPop), [toastPop, STP]);

  useEffect(() => {
    newConnection();

    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    if (!toastPop) {
      Toast.fire({
        icon: "success",
        title: store.isNewLogin ? "Login sukses" : "Selamat datang kembali",
      });
      setToastPop();
    }
  });

  return <p>Siswa</p>;
}

export default Siswa;
