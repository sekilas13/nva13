import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import Swal from "sweetalert2";
import { Context } from "../../../../utils/stateProvider";
import { Error } from "../../../../style/Login";
import { useForm } from "react-hook-form";
import axios from "axios";

function Add() {
  const store = useContext(Context);
  const [alert, UNSAFE_setAlert] = useState({ message: "", error: false });
  const setAlert = (data) => UNSAFE_setAlert({ ...alert, ...data });
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { register, handleSubmit, errors, setValue } = useForm();

  const reset = () => {
    setValue("absen", "");
    setValue("email", "");
    setValue("kelas", "");
    setValue("password", "");
    setValue("username", "");
  };

  const onSubmit = (data) => {
    setLoading(true);
    axios
      .post("/admin/user/siswa", data, {
        headers: {
          Authorization: "Bearer " + store.token,
        },
      })
      .then((data) => data.data)
      .then((r) => {
        setLoading(false);
        if (!r.error) {
          reset();
          const Toast = Swal.mixin(store.config.sweetal.Toaster);
          Toast.fire({
            icon: "success",
            title: "Siswa berhasil ditambahkan",
          });
          history.push("/vote/siswa");
        } else {
          reset();
          setAlert({ error: true, message: r.message });
        }
      });
  };

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
                  {alert.error && (
                    <Alert
                      variant="danger"
                      onClose={() => setAlert({ error: false })}
                      dismissible
                    >
                      {alert.message}
                    </Alert>
                  )}
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group>
                      <Form.Label>Nama Lengkap</Form.Label>
                      <Form.Control
                        name="username"
                        type="input"
                        disabled={loading}
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
                        disabled={loading}
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
                      <Form.Label>Kata Sandi</Form.Label>
                      <Form.Control
                        name="password"
                        type="password"
                        disabled={loading}
                        ref={register({
                          required: true,
                        })}
                        placeholder="Masukan kata sandi siswa"
                      />
                      {errors.password && (
                        <Error msg={"Bidang ini perlu diisi !"} />
                      )}
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Absen</Form.Label>
                      <Form.Control
                        name="absen"
                        type="number"
                        disabled={loading}
                        ref={register({ required: true })}
                        placeholder="Masukan nomor absen siswa"
                      />
                      {errors.absen && <Error msg="Bidang ini perlu diisi !" />}
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Pilih Kelas</Form.Label>
                      <Form.Control
                        as="select"
                        disabled={loading}
                        name="kelas"
                        ref={register({ required: true })}
                      >
                        <option value="">Pilih kelas</option>
                        {store.config.kelas.map((e) => (
                          <option key={e} value={e}>
                            {e}
                          </option>
                        ))}
                      </Form.Control>
                      {errors.kelas && (
                        <Error msg="Pilih kelas siswa terlebih dahulu !" />
                      )}
                    </Form.Group>
                    <Button
                      variant="primary"
                      disabled={loading}
                      className="btn-block"
                      type="submit"
                    >
                      Tambah Siswa
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
