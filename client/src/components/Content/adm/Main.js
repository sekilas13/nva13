import { useContext } from "react";
import { Context } from "../../../utils/stateProvider";
import { Card, Container, Row, Col, ListGroup } from "react-bootstrap";
import { observer } from 'mobx-react' 

function Main() {
  const store = useContext(Context);

  return (
    <Container>
      <Row className="mt-3">
        <Col md={7}>
          <Card className="h-100">
            <Card.Body>
              <h2 className="text-center">Catatan User</h2>
              <ListGroup variant="flush">
                {store.log.map((u, i) => (
                  <ListGroup.Item key={i}>{u.id}</ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default observer(Main);
