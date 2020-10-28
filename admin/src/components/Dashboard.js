import { Fragment, useEffect, useContext } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Navi } from "../style/Dashboard";
import io from "socket.io-client";
import { Context } from "../utils/stateProvider";

function Dashboard() {
  const store = useContext(Context);
  const socket = io();

  const newConnection = () => {
    socket.emit("new user", { role: "admin", id: store.userId });
  };

  useEffect(() => {
    document.querySelector("body").style.backgroundColor = "white";
    newConnection();
  });

  socket.on("admin:new user", (d) => console.log(d));

  return (
    <Fragment>
      <Navi variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
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

export default Dashboard;
