import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { AiFillEdit } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';
import { deleteExam, getExams } from '../../../services/exam';
import { ExamType } from '../../../types/types';

const columns = [
  '#',
  'Name',
  'Category',
  'Total Marks',
  'Pass Answers',
  'Duration',
  'Actions',
];

/* const sampleExams = [
  {
    _id: '1',
    name: 'React Test',
    category: 'React',
    total: 5,
    correct: 2,
    duration: 60,
  },
  {
    _id: '2',
    name: 'TypeScript Test',
    category: 'TypeScript',
    total: 5,
    correct: 3,
    duration: 60,
  },
  {
    _id: '3',
    name: 'Node Test',
    category: 'Node',
    total: 5,
    correct: 4,
    duration: 60,
  },
  {
    _id: '4',
    name: 'MongoDB Test',
    categoy: 'MongoDB',
    total: 5,
    correct: 1,
    duration: 60,
  },
  {
    _id: '5',
    name: 'ABC Test',
    category: 'ABC',
    total: 5,
    correct: 1,
    duration: 60,
  },
  {
    _id: '6',
    name: 'Test 123',
    category: '123',
    total: 5,
    correct: 5,
    duration: 60,
  },
]; */

const ExamList = () => {
  const [exams, setExams] = useState<ExamType[]>([]);

  const navigate = useNavigate();

  const getExamList = useCallback(async () => {
    try {
      const res = await getExams();

      if (res.success) {
        setExams(res.data);
      } else {
        console.log(res.message);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleDelete = async (examID: string) => {
    try {
      const res = await deleteExam(examID);

      if (res.success) {
        console.log(res.message);
        getExamList();
      } else {
        console.log(res.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getExamList();
  }, [getExamList]);

  return (
    <Container className="mt-5">
      <Row className="gap-3">
        <Row>
          <Col sm={10}>
            <p className="text-center h2">
              <b>Exam List</b>
            </p>
          </Col>
          <Col className="text-end mt-3">
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => navigate('add')}
            >
              <FaPlus /> Create
            </Button>
          </Col>
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
            {exams.length > 0 ? (
              <tbody>
                {exams.map((exam, index) => (
                  <tr key={exam._id}>
                    <td>{index + 1}</td>
                    <td>{exam.name}</td>
                    <td>{exam.category}</td>
                    <td>{exam.total}</td>
                    <td>{exam.correct}</td>
                    <td>{exam.duration}</td>
                    <td>
                      {exam._id ? (
                        <Row>
                          <Col lg="2">
                            <Button
                              variant="outline-primary"
                              onClick={() => navigate(`edit/${exam._id}`)}
                              size="sm"
                            >
                              <AiFillEdit />
                            </Button>
                          </Col>
                          <Col>
                            <Button
                              variant="outline-danger"
                              onClick={() => handleDelete(exam._id as string)}
                              size="sm"
                            >
                              <BsFillTrashFill />
                            </Button>
                          </Col>
                        </Row>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : null}
          </Table>
        </Row>
        {exams.length < 1 ? (
          <p className="text-center h4 mt-5 text-muted">No Data</p>
        ) : null}
      </Row>
    </Container>
  );
};

export default ExamList;
