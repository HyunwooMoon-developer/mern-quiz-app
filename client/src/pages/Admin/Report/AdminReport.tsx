import { useCallback, useEffect, useState } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { getReports } from '../../../services/report';
import SearchReport from '../../../components/SearchReport';
import { ReportType } from '../../../types/types';

const columns = [
  '#',
  'Exam',
  'User',
  'Date',
  'Total',
  'Pass Answers',
  'Obtain',
  'Result',
];
const filterTarget: ['user', 'exam'] = ['user', 'exam'];

const AdminReport = () => {
  const [reports, setReports] = useState<ReportType[]>([]);
  const [filter, setFilter] = useState<{ exam: string; user: string }>({
    exam: '',
    user: '',
  });

  const getReportsList = useCallback(
    async (tempFilter: { [key: string]: string }) => {
      try {
        const res = await getReports(tempFilter);

        if (res.success) {
          setReports(res.data);
        } else {
          console.log(res.message);
        }
      } catch (err) {
        console.error(err);
      }
    },
    []
  );

  useEffect(() => {
    getReportsList(filter);
  }, [getReportsList, filter]);

  return (
    <Container className="mt-5">
      <Row className="gap-3">
        <Row>
          <p className="text-center h2">
            <b>Exam Reports</b>
          </p>
        </Row>
        <Row>
          {filterTarget.map((target) => (
            <Col key={target} md={2}>
              <SearchReport
                target={target}
                filter={filter}
                setFilter={setFilter}
              />
            </Col>
          ))}
        </Row>
        <Row>
          <Table striped className="text-center">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {reports.length > 0 ? (
                reports.map((report, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{report.exam.name}</td>
                    <td>{`${report.user.fname} ${report.user.lname}`}</td>
                    <td> {new Date(report.createdAt).toLocaleString()}</td>
                    <td>{report.exam.total} </td>
                    <td>{report.exam.correct}</td>
                    <td> {report.result.correct}</td>
                    <td>
                      <span
                        style={{ color: report.result.pass ? 'green' : 'red' }}
                      >
                        <b>{report.result.pass ? 'Pass' : 'Failed'}</b>
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} style={{ height: '100px' }}>
                    <p className="mt-3">No Data</p>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Row>
      </Row>
    </Container>
  );
};

export default AdminReport;
