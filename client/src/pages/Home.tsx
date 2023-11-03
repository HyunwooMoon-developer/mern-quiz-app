import { useCallback, useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useAppSelector } from '../redux/hooks';
import { getExams } from '../services/exam';
import ExamCard from '../components/ExamCard';
/* 
const sampleExams = [
  {
    _id: 1,
    name: 'React Test',
    category: 'React',
    total: 5,
    correct: 2,
    duration: 60,
  },
  {
    _id: 2,
    name: 'TypeScript Test',
    category: 'TypeScript',
    total: 5,
    correct: 3,
    duration: 60,
  },
  {
    _id: 3,
    name: 'Node Test',
    category: 'Node',
    total: 5,
    correct: 4,
    duration: 60,
  },
  {
    _id: 4,
    name: 'MongoDB Test',
    categoy: 'MongoDB',
    total: 5,
    correct: 1,
    duration: 60,
  },
  {
    _id: 5,
    name: 'ABC Test',
    category: 'ABC',
    total: 5,
    correct: 1,
    duration: 60,
  },
  {
    _id: 6,
    name: 'Test 123',
    category: '123',
    total: 5,
    correct: 5,
    duration: 60,
  },
]; */

const Home = () => {
  const [exams, setExams] = useState<any>([]);

  const { user } = useAppSelector((state) => state.user);

  const getExamList = useCallback(async () => {
    try {
      const res = await getExams();

      if (res.success) {
        setExams(res.data);
      } else {
        console.error(res.message);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getExamList();
  }, [getExamList]);

  return user ? (
    <Container>
      <Row className="border-bottom p-3">
        <p className="text-center h2">
          <b>
            Hello, {user.fname} {user.lname}
          </b>
        </p>
      </Row>
      <Row className="mt-4">
        {exams.map((exam: any) => (
          <ExamCard key={exam._id} exam={exam} />
        ))}
      </Row>
    </Container>
  ) : null;
};

export default Home;
