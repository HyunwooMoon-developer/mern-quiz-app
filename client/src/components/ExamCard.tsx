import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardSubtitle,
  Col,
  Row,
} from 'react-bootstrap';
import { ExamType } from '../types/types';
import { useAppSelector } from '../redux/hooks';
import { useNavigate } from 'react-router-dom';

const ExamCard = ({ exam }: { exam: ExamType }) => {
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <Col key={exam._id} md={4} className="mb-3 text-center">
      <Card className="card-size">
        <CardHeader as="h5">{exam.name}</CardHeader>
        <CardBody>
          <CardSubtitle className="mb-2 text-muted">
            {exam.category}
          </CardSubtitle>
          <Row className="gap-3 mt-3">
            <Row>
              <Col>Total :</Col>
              <Col>{exam.total}</Col>
            </Row>
            <Row>
              <Col>Pass :</Col>
              <Col>{exam.correct}</Col>
            </Row>
            <Row>
              <Col>Duration :</Col>
              <Col>{exam.duration} seconds</Col>
            </Row>
            <Row className="mt-3">
              {user && user.isAdmin ? (
                <Button
                  variant="outline-success"
                  className="p-3 exam-button"
                  onClick={() => navigate(`/admin/exam/edit/${exam._id}`)}
                >
                  Edit Exam
                </Button>
              ) : (
                <Button
                  variant={
                    exam.total === exam.questions.length
                      ? 'outline-success'
                      : 'secondary'
                  }
                  className="p-3 exam-button"
                  onClick={() => navigate(`/user/exam/instruction/${exam._id}`)}
                  disabled={exam.total !== exam.questions.length}
                >
                  Start Exam
                </Button>
              )}
            </Row>
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ExamCard;
