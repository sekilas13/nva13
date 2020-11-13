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
import { Logout } from "../../Custom";

function Admin() {
  const [toastPop, STP] = useState(false);
  document.querySelector("body").style.backgroundColor = "white";

  const store = useContext(Context);
  const socket = io({ query: { token: store.token } });

  const setToastPop = useCallback(() => STP(!toastPop), [toastPop, STP]);
  const setSockStatus = useCallback(
    (connected) => store.setSockStatus(connected),
    [store]
  );

  useEffect(() => {
    const Toast = Swal.mixin(store.config.sweetal.Toaster);

    if (!toastPop) {
      Toast.fire({
        icon: "success",
        title: store.isNewLogin ? "Login sukses" : "Selamat datang kembali",
      });
      setToastPop();
    }
  });

  useEffect(() => setSockStatus(socket.connected), [
    socket.connected,
    setSockStatus,
  ]);

  socket.on("admin:new user", (d) => {
    if (!store.log.find((x) => x.id === d.id && x.type === "new login")) {
      store.addLog(d);
    } else {
      if (!store.log.find((x) => x.id === d.id && x.sended === d.sended)) {
        let data = d;
        data.type = "re login";
        store.addLog(data);
      }
    }
  });

  socket.on("admin:logout user", (d) => {
    if (!store.log.find((x) => x.id === d.id && x.type === "logout")) {
      store.addLog(d);
    } else {
      if (!store.log.find((x) => x.id === d.id && x.sended === d.sended)) {
        let data = d;
        data.type = "re logout";
        store.addLog(data);
      }
    }
  });

  const { path, url } = useRouteMatch();

  return (
    <Router>
      <Navi variant="dark">
        <Container>
          <Navbar.Brand as={Link} to={url}>
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
            <Logout socket={socket} />
          </Nav>
        </Container>
      </Navi>
      <Switch>
        <Route exact path={path} component={Main} />
      </Switch>
    </Router>
  );
}

export default Admin;
