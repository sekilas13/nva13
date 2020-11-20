import { Suspense, lazy } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import { observer } from "mobx-react";
const TableList = lazy(() => import("./splitting/TableList"));

function Siswa() {
  return (
    <Container fluid>
      <Row className="mt-3 justify-content-center">
        <Col md={11}>
          <h1>Daftar Siswa</h1>
        </Col>
      </Row>
      <Row className="justify-content-center mt-2">
        <Col md={11}>
          <Button className="mb-2">Tambah</Button>
          <Table bordered responsive>
            <thead>
              <tr>
                <th>Absen</th>
                <th>Email</th>
                <th>Nama Lengkap</th>
                <th>Kelas</th>
                <th>Tanggal Ditambahkan</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <Suspense
                fallback={
                  <tr>
                    <td className="text-center" colSpan={2}>
                      Mohon Tungu
                    </td>
                    <td className="text-center" colSpan={2}>
                      Sedang mengambil data
                    </td>
                  </tr>
                }
              >
                <TableList />
              </Suspense>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default observer(Siswa);
