import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

function Login() {
  return (
    <Container>
      <Row className="justify-content-center mt-4">
        <Col md={5}>
          <Card>
            <Card.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Masukan email" />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Kata Sandi</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Masukan kata sandi"
                  />
                </Form.Group>
                <hr />
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
