import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Card, Control, Label, Hr } from "../style/Login";

function Login() {
  document.querySelector("body").style.backgroundColor = "#0062cc";

  return (
    <Container>
      <Row className="justify-content-center mt-4">
        <Col md={5}>
          <Card>
            <Card.Body>
              <Form>
                <Form.Group>
                  <Label>Email</Label>
                  <Control type="email" placeholder="Masukan email" />
                </Form.Group>
                <Form.Group>
                  <Label>Kata Sandi</Label>
                  <Control type="password" placeholder="Masukan kata sandi" />
                </Form.Group>
                <Hr />
                <Button variant="primary" className="btn-block" type="submit">
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
