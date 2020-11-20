import { Suspense, lazy } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import { observer } from "mobx-react";
const TableList = lazy(() => import("./splitting/TableList"));

function Siswa() {
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
              <th>Email</th>
              <th>Nama Lengkap</th>
              <th>Kelas</th>
              <th>Tanggal Ditambahkan</th>
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
      </Row>
    </Container>
  );
}

export default observer(Siswa);
