import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { addExam, getExam, updateExam } from '../../../services/exam';
import ExamForm from '../../../components/ExamForm';
import { ExamType } from '../../../types/types';
import QuestionTable from '../../../components/QuestionTable';

const SetExam = () => {
  const [exam, setExam] = useState<ExamType>({
    name: '',
    category: 'TypeScript',
    duration: 0,
    total: 0,
    correct: 0,
    questions: [],
  });

  const params = useParams();
  const navigate = useNavigate();

  const getExistExam = useCallback(async () => {
    try {
      const res = await getExam(params.id as string);

      if (res.success) {
        setExam(res.data);
      } else {
        console.log(res.message);
      }
    } catch (err) {
      console.error(err);
    }
  }, [params.id]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      let res;

      if (params.id) {
        res = await updateExam(exam);
      } else {
        console.log('submit', exam);
        res = await addExam(exam);
      }

      if (res.success) {
        navigate('/admin/exam');
      } else {
        console.log(res.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (params.id) {
      getExistExam();
    }
  }, [getExistExam, params.id]);

  return (
    <Container>
      <Row className="mt-3">
        <Col sm={11} xs={10}>
          <p className="text-start h2">
            <b>
              <u>{params.id ? 'Edit Exam' : 'Add Exam'}</u>
            </b>
          </p>
        </Col>
        <Col sm={1} xs={2}>
          <Button
            variant="outline-primary"
            onClick={() => navigate('/admin/exam')}
            size="sm"
          >
            <AiOutlineUnorderedList />
            List
          </Button>
        </Col>
      </Row>
      <Row>
        <Tabs defaultActiveKey="exam" className="mb-3" variant="tabs">
          <Tab title="Exam" eventKey="exam">
            <ExamForm exam={exam} setExam={setExam} onSubmit={onSubmit} />
          </Tab>
          {params.id ? (
            <Tab title="Questions" eventKey="question">
              <QuestionTable exam={exam} getExistExam={getExistExam} />
            </Tab>
          ) : null}
        </Tabs>
      </Row>
    </Container>
  );
};

export default SetExam;
