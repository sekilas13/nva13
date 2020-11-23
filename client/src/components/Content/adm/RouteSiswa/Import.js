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
// import Swal from "sweetalert2";
import { Context } from "../../../../utils/stateProvider";
import { Error } from "../../../../style/Login";
import Papa from "papaparse";
import { useForm } from "react-hook-form";
// import axios from "axios";

function Import() {
  const store = useContext(Context);
  const [label, setLabel] = useState("Import file .csv");
  const [alert, UNSAFE_setAlert] = useState({ message: "", error: false });
  const setAlert = (data) => UNSAFE_setAlert({ ...alert, ...data });
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    const csv = data.csv[0];
    Papa.parse(csv, {
      header: true,
      complete: (data) => console.log(data),
    });
    // setLoading(true);
    // axios
    //   .post("/admin/user/siswa", data, {
    //     headers: {
    //       Authorization: "Bearer " + store.token,
    //     },
    //   })
    //   .then((data) => data.data)
    //   .then((r) => {
    //     setLoading(false);
    //     if (!r.error) {
    //       reset();
    //       const Toast = Swal.mixin(store.config.sweetal.Toaster);
    //       Toast.fire({
    //         icon: "success",
    //         title: "Siswa berhasil ditambahkan",
    //       });
    //       history.push("/vote/siswa");
    //     } else {
    //       reset();
    //       setAlert({ error: true, message: r.message });
    //     }
    //   });
  };

  return (
    <Container>
      <Row className="justify-content-center mt-3">
        <Col md={8}>
          <Card>
            <Card.Body>
              <Row className="justify-content-center">
                <Col md={6}>
                  <h4 className="text-center">Impor Data Siswa</h4>
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
                      <Form.Label>Masukan File CSV</Form.Label>
                      <Form.File
                        name="csv"
                        id="file-custom"
                        ref={register({ required: true })}
                        label={label}
                        onChange={(e) => setLabel(e.target.files[0].name)}
                        accept=".csv"
                        custom
                      />
                      {errors.csv && <Error msg="Bidang ini perlu diisi !" />}
                    </Form.Group>
                    <Button
                      variant="warning"
                      disabled={loading}
                      className="btn-block"
                      type="submit"
                    >
                      Impor Siswa
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

export default Import;
