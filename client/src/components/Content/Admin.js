import Swal from "sweetalert2";
import { Fragment, useEffect, useContext } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Navi } from "../../style/Admin";
import io from "socket.io-client";
import { Context } from "../../utils/stateProvider";

function Admin() {
  document.querySelector("body").style.backgroundColor = "white";

  const store = useContext(Context);
  const socket = io();

  const newConnection = () =>
    socket.emit("new user", { role: store.role, id: store.userId });

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

    Toast.fire({
      icon: "success",
      title: store.isNewLogin ? "Login sukses" : "Selamat datang kembali",
    });
  });

  socket.on("admin:new user", (d) => console.log(d));

  return (
    <Fragment>
      <Navi variant="dark">
        <Container>
          <Navbar.Brand href="#home">Admin Panel</Navbar.Brand>
          <Nav className="my-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navi>
      <Container></Container>
    </Fragment>
  );
}

export default Admin;
