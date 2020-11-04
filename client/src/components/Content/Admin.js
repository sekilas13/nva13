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

  const setToastPop = useCallback(() => STP(!toastPop), [toastPop, STP]);

  useEffect(() => {
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

  socket.on("admin:new user", (d) => {
    if (store.log.find((x) => x.id === d.id)) {
      if (store.log.find((x) => x.id === d.id && x.sended !== d.sended)) {
        console.log(`re-login`);
        console.log(d);
        store.addLog({ ...d, type: "re-login" });
      }
    } else {
      store.addLog({ ...d, type: "new login" });
      console.log(`new login`);
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
