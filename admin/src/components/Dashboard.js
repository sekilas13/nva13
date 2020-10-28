import { Fragment } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { useEffect } from "react";

function Dashboard() {
  useEffect(() => {
    document.querySelector("body").style.backgroundColor = "white";
  });

  return (
    <Fragment>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="my-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container></Container>
    </Fragment>
  );
}

export default Dashboard;
