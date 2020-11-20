import { useEffect, useContext } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import { Context } from "../../../utils/stateProvider";
import { observer } from "mobx-react";
import axios from "axios";

function Siswa() {
  const store = useContext(Context);
  useEffect(() => {
    axios
      .get("/admin/user/siswa", {
        headers: {
          Authorization: "Bearer " + store.token,
        },
      })
      .then(console.log);
  });
  return (
    <Container>
      <Row className="mt-3">
        <Col>
          <h1>Data Siswa</h1>
        </Col>
      </Row>
      <Row className="mt-2">
        <Table bordered>
          <thead>
            <tr>
              <th>Absen</th>
              <th>Nama Lengkap</th>
              <th>Kelas</th>
              <th>Tanggal Ditambahkan</th>
            </tr>
          </thead>
        </Table>
      </Row>
    </Container>
  );
}

export default observer(Siswa);
