import Swal from "sweetalert2";
import { useEffect, useContext, useState, useCallback } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Navi } from "../../style/Admin";
import io from "socket.io-client";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import { Context } from "../../utils/stateProvider";
import { Main } from "./adm";

function Admin() {
  const [toastPop, STP] = useState(false);
  document.querySelector("body").style.backgroundColor = "white";

  const store = useContext(Context);
  const socket = io({ query: { token: store.token } });

  const newConnection = useCallback(
    () => socket.emit("new user", { role: store.role, id: store.userId }),
    [store, socket]
  );

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

  socket.on("admin:new user", (d) => console.log(d));

  const { path, url } = useRouteMatch();

  return (
    <Router>
      <Navi variant="dark">
        <Container>
          <Navbar.Brand as={Link} to={`${url}/`}>
            Admin Panel
          </Navbar.Brand>
          <Nav className="my-auto">
            <Nav.Link as={Link} to={`${url}/paslon`}>
              Paslon
            </Nav.Link>
            <Nav.Link as={Link} to={`${url}/siswa`}>
              Siswa
            </Nav.Link>
            <Nav.Link as={Link} to={`${url}/guru`}>
              Guru
            </Nav.Link>
          </Nav>
        </Container>
      </Navi>
      <Switch>
        <Container>
          <Route exact path={path} component={Main} />
        </Container>
      </Switch>
    </Router>
  );
}

export default Admin;
