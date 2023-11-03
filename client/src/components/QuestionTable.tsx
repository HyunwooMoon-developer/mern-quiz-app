import { Container, Row, Table } from 'react-bootstrap';

const columns = ['#', 'Name', 'Options', 'Correct Options', 'Actions'];

const QuestionTable = () => {
  return (
    <Container>
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
    </Container>
  );
};

export default QuestionTable;
