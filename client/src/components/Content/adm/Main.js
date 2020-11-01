import { Card, Container, Row, Col } from "react-bootstrap";

function Main() {
  return (
    <Container>
      <Row className="mt-3">
        <Col md={4}>
          <Card className="h-100">
            <Card.Body>
              <h2 className="text-center">Catatan User</h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Main;
