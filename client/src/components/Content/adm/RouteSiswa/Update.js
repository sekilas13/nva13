import { useContext, useState, Fragment } from "react";
import { useHistory, useParams, Redirect } from "react-router-dom";
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

function Update() {
  const { index } = useParams();
  const history = useHistory();
  const store = useContext(Context);
  const [alert, UNSAFE_setAlert] = useState({ message: "", error: false });
  const setAlert = (data) => UNSAFE_setAlert({ ...alert, ...data });
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, errors, setValue } = useForm();

  const data = store.dataSiswa[index];

  const reset = () => {
    setValue("absen", "");
    setValue("email", "");
    setValue("kelas", "");
    setValue("password", "");
    setValue("username", "");
  };

  const onSubmit = (d) => {
    setLoading(true);
    axios
      .put(
        "/admin/user/siswa",
        { ...d, _id: data._id },
        {
          headers: {
            Authorization: "Bearer " + store.token,
          },
        }
      )
      .then((data) => data.data)
      .then((r) => {
        setLoading(false);
        if (!r.error) {
          reset();
          const Toast = Swal.mixin(store.config.sweetal.Toaster);
          Toast.fire({
            icon: "success",
            title: "Siswa berhasil diubah",
          });
          history.push("/vote/siswa");
        } else {
          reset();
          setAlert({ error: true, message: r.message });
        }
      });
  };

  return (
    <Fragment>
      {!data ? (
        <Redirect to="/vote/siswa" />
      ) : (
        <Container>
          <Row className="justify-content-center mt-3">
            <Col md={8}>
              <Card>
                <Card.Body>
                  <Row className="justify-content-center">
                    <Col md={6}>
                      <h4 className="text-center">Update Data Siswa</h4>
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
                            defaultValue={data.username}
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
                            defaultValue={data.email}
                            disabled={loading}
                            readOnly
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
                            disabled={loading}
                            defaultValue={data.absen}
                            ref={register({ required: true })}
                            placeholder="Masukan nomor absen siswa"
                          />
                          {errors.absen && (
                            <Error msg="Bidang ini perlu diisi !" />
                          )}
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Pilih Kelas</Form.Label>
                          <Form.Control
                            as="select"
                            disabled={loading}
                            defaultValue={data.kelas}
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
                          variant="info"
                          disabled={loading}
                          className="btn-block"
                          type="submit"
                        >
                          Update Data Siswa
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
      )}
    </Fragment>
  );
}

export default Update;
