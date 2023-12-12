import { useCallback, useState, useEffect } from 'react';
import { getReportsByUser } from '../../../services/report';
import { useAppSelector } from '../../../redux/hooks';
import { Container, Row, Table } from 'react-bootstrap';
import { ReportType } from '../../../types/types';

const columns = [
  '#',
  'Exam',
  'Date',
  'Total',
  'Pass Answers',
  'Obtain',
  'Result',
];

const UserReport = () => {
  const [reports, setReports] = useState<ReportType[]>([]);

  const { user } = useAppSelector((state) => state.user);

  const getData = useCallback(async () => {
    try {
      const res = await getReportsByUser(user?._id as string);

      if (res.success) {
        setReports(res.data);
      } else {
        console.log(res.message);
      }
    } catch (err) {
      console.error(err);
    }
  }, [user?._id]);

  useEffect(() => {
    if (user?._id) getData();
  }, [getData, user?._id]);

  return (
    <Container className="mt-5">
      <Row className="gap-3">
        <Row>
          <p className="text-center h2">
            <b>Exam Reports</b>
          </p>
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
                    <td>{new Date(report.createdAt).toLocaleString()}</td>
                    <td>{report.exam.total}</td>
                    <td>{report.exam.correct}</td>
                    <td>{report.result.correct}</td>
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
                  <td colSpan={7} style={{ height: '100px' }}>
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

export default UserReport;
