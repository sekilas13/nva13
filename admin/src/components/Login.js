import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import withReactContent from "sweetalert2-react-content";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Card, Control, Label, Hr, Error, Spinner } from "../style/Login";
import { useForm } from "react-hook-form";

const MySwal = withReactContent(Swal);

function Login() {
  const [state, UNSAFE_setState] = useState({
    message: "",
    variant: "",
    error: false,
  });
  const setState = (data) => UNSAFE_setState({ ...data, ...state });

  document.querySelector("body").style.backgroundColor = "#0062cc";

  const { register, handleSubmit, errors, setValue } = useForm();

  const onSubmit = (data) => {
    const Loading = MySwal.fire({
      title: (
        <div>
          <h2>Loading</h2>
        </div>
      ),
      html: (
        <div>
          <Spinner animation="border" variant="primary" />
        </div>
      ),
      allowEscapeKey: false,
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEnterKey: false,
      width: "15rem",
    });

    axios
      .post("/admin/login", data)
      .then((u) => console.log(u))
      .catch((err) => {
        const {
          errors: { message, type },
        } = err.response.data;

        switch (type) {
          case "PASS_ERR":
            setValue("password", "");
            break;
          case "ACC_404":
            setValue("email", "");
            setValue("password", "");
            break;
          default:
            return null;
        }
      });
  };

  return (
    <Container>
      <Row className="justify-content-center mt-4">
        <Col md={5}>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                  <Label>Email</Label>
                  <Control
                    name="email"
                    ref={register({
                      required: true,
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Format email tidak valid !",
                      },
                    })}
                    type="email"
                    placeholder="Masukan email"
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
                  <Label>Kata Sandi</Label>
                  <Control
                    name="password"
                    ref={register({ required: true })}
                    type="password"
                    placeholder="Masukan kata sandi"
                  />
                  {errors.password && <Error msg="Bidang ini perlu diisi !" />}
                </Form.Group>
                <Hr />
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
