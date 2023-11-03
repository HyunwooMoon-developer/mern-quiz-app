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

const ExamCard = ({ exam }: { exam: ExamType }) => {
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
              <Button variant="outline-success" className="p-3 exam-button">
                Start Exam
              </Button>
            </Row>
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ExamCard;
