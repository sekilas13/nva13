import { useHistory } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

function Add() {
  const history = useHistory();

  return (
    <Container>
      <Row className="justify-content-center mt-3">
        <Col md={8}>
          <Card>
            <Card.Body>
              <Row className="justify-content-center">
                <Col md={6}>
                  <h4 className="text-center">Tambahkan Data Siswa</h4>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col md={10}>
                  <Form>
                    <Form.Group>
                      <Form.Label>Nama Lengkap</Form.Label>
                      <Form.Control
                        name="username"
                        type="input"
                        placeholder="Masukan nama lengkap siswa"
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        name="email"
                        type="email"
                        placeholder="Masukan email siswa"
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Absen</Form.Label>
                      <Form.Control
                        name="absen"
                        type="number"
                        placeholder="Masukan nomor absen siswa"
                      />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                      <Form.Label>Pilih Kelas</Form.Label>
                      <Form.Control as="select">
                        <option value="">Pilih kelas</option>
                      </Form.Control>
                    </Form.Group>
                    <Button
                      variant="primary"
                      className="btn-block"
                      type="submit"
                    >
                      Login
                    </Button>
                  </Form>
                </Col>
              </Row>
              <Row className="justify-content-center mt-2">
                <Button
                  variant="outline-success"
                  onClick={() => history.push("/vote/siswa")}
                >
                  Kembali
                </Button>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Add;
