import { useContext } from "react";
import { Button } from "react-bootstrap";
import { Context } from "../utils/stateProvider";
import Swal from "sweetalert2";
import axios from "axios";

const Logout = ({ socket }) => {
  const store = useContext(Context);

  return (
    <Button
      variant="danger"
      onClick={() => {
        Swal.fire(store.config.sweetal.Logout).then((result) => {
          if (result.isConfirmed) {
            axios.delete("/auth/logout").then(({ data }) => {
              if (store.role !== "admin") {
                socket.emit("logout user", {
                  role: store.role,
                  id: store.userId,
                  username: store.username,
                  sended: Date.now(),
                });
              }
              socket.disconnect();
              store.Logout();
              Swal.mixin(store.config.sweetal.Toaster).fire({
                icon: "success",
                title: data.message,
              });
            });
          }
        });
      }}
    >
      Logout
    </Button>
  );
};

export default Logout;
