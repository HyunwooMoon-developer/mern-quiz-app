import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { ExamType } from '../../../types/types';
import { getExam } from '../../../services/exam';

const ExamInstruction = () => {
  const [exam, setExam] = useState<ExamType | null>(null);

  const params = useParams();
  const navigate = useNavigate();

  const getExamById = useCallback(async () => {
    try {
      if (params.id) {
        const res = await getExam(params.id);

        if (res.success) {
          setExam(res.data);
        } else {
          console.log(res.message);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }, [params.id]);

  useEffect(() => {
    if (params.id) {
      getExamById();
    }
  }, [getExamById, params.id]);

  return exam ? (
    <Container fluid className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={10}>
          <Card>
            <Card.Body>
              <Card.Title as="h1" className="text-center">
                <b>Instruction</b>
              </Card.Title>
              <Card.Subtitle as="h4" className="text-center text-muted mt-4">
                <b>{exam.name}</b>
              </Card.Subtitle>
              <Row className="justify-content-md-center mt-5 gap-3">
                <Col md={6}>
                  Exam must be completed in{' '}
                  <b className="text-primary">{exam.duration}</b> seconds.
                  <br />
                  Exam will be submitted after{' '}
                  <b className="text-primary">{exam.duration}</b> seconds.
                  <br />
                  Once submitted, you can't change your answer.
                  <br />
                  You can use the <b className="text-primary">
                    Previous
                  </b> and <b className="text-primary">Next</b> buttons to
                  navigate between questions
                  <br />
                  Total questions of the Exam is{' '}
                  <b className="text-primary">{exam.total}</b>
                  <br />
                  Passing answers of the Exam is{' '}
                  <b className="text-primary">{exam.correct}</b>
                  <br />
                  <br />
                  <b className="text-danger h4">
                    Don not refresh the exam page
                  </b>
                </Col>
              </Row>
              <Row className="justify-content-md-center mt-4 mb-3">
                <Col md="2">
                  <Button
                    variant="outline-primary"
                    onClick={() => navigate(`/user/exam/questions/${exam._id}`)}
                  >
                    Start Exam
                  </Button>
                </Col>
                <Col md="2">
                  <Button
                    variant="outline-danger"
                    onClick={() => navigate('/')}
                  >
                    Cancel
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  ) : null;
};

export default ExamInstruction;
