import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { Context } from "../../../../utils/stateProvider";
import { Error } from "../../../../style/Login";
import { useForm } from "react-hook-form";

function Add() {
  const store = useContext(Context);
  const history = useHistory();
  const { register, handleSubmit, errors, setValue } = useForm();

  const onSubmit = (data) => {};

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
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group>
                      <Form.Label>Nama Lengkap</Form.Label>
                      <Form.Control
                        name="username"
                        type="input"
                        placeholder="Masukan nama lengkap siswa"
                        ref={register({
                          required: true,
                          pattern: {
                            value: /^[a-zA-Z ]+$/,
                            message:
                              "Nama hanya boleh huruf kecil dan kapital !",
                          },
                        })}
                      />
                      {errors.username && (
                        <Error
                          msg={
                            errors.username.message
                              ? errors.username.message
                              : "Bidang ini perlu diisi !"
                          }
                        />
                      )}
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        name="email"
                        type="email"
                        ref={register({
                          required: true,
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Format email tidak valid !",
                          },
                        })}
                        placeholder="Masukan email siswa"
                      />
                      {errors.email && (
                        <Error
                          msg={
                            errors.email.message
                              ? errors.email.message
                              : "Bidang ini perlu diisi !"
                          }
                        />
                      )}
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Absen</Form.Label>
                      <Form.Control
                        name="absen"
                        type="number"
                        ref={register({ required: true })}
                        placeholder="Masukan nomor absen siswa"
                      />
                      {errors.absen && <Error msg="Bidang ini perlu diisi !" />}
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                      <Form.Label>Pilih Kelas</Form.Label>
                      <Form.Control
                        as="select"
                        name="kelas"
                        ref={register({ required: true })}
                      >
                        <option value="">Pilih kelas</option>
                        {store.config.kelas.map((e) => (
                          <option key={e} value={e}>
                            {e.toLocaleString()}
                          </option>
                        ))}
                      </Form.Control>
                      {errors.kelas && (
                        <Error msg="Pilih kelas siswa terlebih dahulu !" />
                      )}
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
