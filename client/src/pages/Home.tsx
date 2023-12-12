import { useCallback, useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useAppSelector } from '../redux/hooks';
import { getExams } from '../services/exam';
import ExamCard from '../components/ExamCard';

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
