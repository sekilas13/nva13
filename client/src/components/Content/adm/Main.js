import { useContext, Fragment } from "react";
import { Context } from "../../../utils/stateProvider";
import { Card, Container, Row, Col, ListGroup, Badge } from "react-bootstrap";
import { observer } from "mobx-react";

function Main() {
  const store = useContext(Context);

  return (
    <Container>
      <Row className="mt-3">
        <Col md={8}>
          <Card>
            <Card.Body>
              <h2 className="text-center">Aktivitas User</h2>
              <ListGroup>
                {store.log.map((u, i) => (
                  <ListGroup.Item key={i}>
                    <Badge variant="info">{u.role}</Badge> {u.username}{" "}
                    {u.type === "new login" && (
                      <Fragment>
                        berhasil <Badge variant="success">login</Badge>
                      </Fragment>
                    )}
                  </ListGroup.Item>
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
