import { useContext, Fragment } from "react";
import { Context } from "../../../utils/stateProvider";
import { Card, Container, Row, Col, ListGroup, Badge } from "react-bootstrap";
import { observer } from "mobx-react";
import { updateTime } from "../../../utils/dateConversion";

function Main() {
  const store = useContext(Context);
  const connected = store.socketStatus;

  return (
    <Container>
      <Row className="mt-3">
        <Col md={8}>
          <Card style={{ maxHeight: "550px", minHeight: "100px" }}>
            <Card.Body>
              <h2 className="text-center">Aktivitas User</h2>
              <ListGroup
                variant={store.log.length < 1 ? "flush" : "normal"}
                style={{ overflow: "auto", maxHeight: "450px" }}
              >
                {store.log.length < 1 && (
                  <ListGroup.Item>
                    Tidak ada aktivitas sejauh ini
                  </ListGroup.Item>
                )}
                {store.log.map((u, i) => {
                  const time = new Date(u.sended);
                  return (
                    <ListGroup.Item key={i} className="text-center">
                      <Badge variant="info">{u.role}</Badge> {u.username}{" "}
                      {(u.type === "new login" || u.type === "re login") && (
                        <Fragment>
                          berhasil{" "}
                          <Badge variant="success">
                            {u.type === "new login" ? "login" : "re-login"}
                          </Badge>
                        </Fragment>
                      )}
                      {(u.type === "logout" || u.type === "re logout") && (
                        <Fragment>
                          berhasil{" "}
                          <Badge variant="warning">
                            {u.type === "logout" ? "logout" : "re-logout"}
                          </Badge>
                        </Fragment>
                      )}{" "}
                      pada pukul {updateTime(time.getHours())}:
                      {updateTime(time.getMinutes())}:
                      {updateTime(time.getSeconds())}
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <h4>Status Koneksi</h4>
              <hr />
              <p>Anda login sebagai Admin</p>
              <p>Username : {store.username}</p>
              <p>
                Kondisi Socket :{" "}
                <Badge variant={connected ? "success" : "danger"}>
                  {connected ? "tersambung" : "terputus"}
                </Badge>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default observer(Main);
