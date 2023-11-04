import { useCallback, useEffect, useState } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { getReports } from '../../../services/report';
import SearchReport from '../../../components/SearchReport';

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

const ReportList = () => {
  const [reports, setReports] = useState<any>([]);
  const [filter, setFilter] = useState<{ exam: string; user: string }>({
    exam: '',
    user: '',
  });

  const getReportsList = useCallback(async () => {
    try {
      const res = await getReports(filter);

      if (res.success) {
        setReports(res.data);
      } else {
        console.log(res.message);
      }
    } catch (err) {
      console.error(err);
    }
  }, [filter]);

  useEffect(() => {
    getReportsList();
  }, [getReportsList]);

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
          <Table striped>
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column}>{column}</th>
                ))}
              </tr>
            </thead>
          </Table>
        </Row>
        {reports.length < 1 ? (
          <p className="text-center h4 mt-5 text-muted">No Data</p>
        ) : null}
      </Row>
    </Container>
  );
};

export default ReportList;
