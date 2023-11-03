import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { ExamType } from '../types/types';

const categories = ['TypeScript', 'React', 'Basic'];

const ExamForm = ({
  exam,
  setExam,
  onSubmit,
}: {
  exam: ExamType;
  setExam: (exam: ExamType) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) => {
  return (
    <Container fluid>
      <Form onSubmit={(e: React.FormEvent<HTMLFormElement>) => onSubmit(e)}>
        <Form.Group controlId="exam_name" as={Row} sm="8" className="mb-4">
          <Form.Label column sm="1">
            Name
          </Form.Label>
          <Col sm="6">
            <Form.Control
              type="text"
              name="name"
              value={exam.name}
              onChange={(e) => setExam({ ...exam, name: e.target.value })}
              className="user-form-input"
              placeholder="Type Exam Name"
              required
            />
          </Col>
        </Form.Group>
        <Form.Group controlId="exam_category" as={Row} sm="8" className="mb-4">
          <Form.Label column sm="1">
            Category
          </Form.Label>
          <Col sm="6">
            <Form.Select
              value={exam.category}
              onChange={(e) => setExam({ ...exam, category: e.target.value })}
              className="user-form-input"
              name="category"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>
        <Form.Group controlId="exam_duration" as={Row} sm="8" className="mb-4">
          <Form.Label column sm="1">
            Duration (Seconds)
          </Form.Label>
          <Col sm="6" className="mt-2">
            <Form.Control
              type="number"
              name="duration"
              value={exam.duration}
              onChange={(e) =>
                setExam({
                  ...exam,
                  duration: !isNaN(parseFloat(e.target.value))
                    ? parseFloat(e.target.value)
                    : 0,
                })
              }
              className="user-form-input"
              placeholder="Type Duration"
              required
            />
          </Col>
        </Form.Group>
        <Form.Group controlId="question_total" as={Row} sm="8" className="mb-4">
          <Form.Label column sm="1">
            Total Questions
          </Form.Label>
          <Col sm="6">
            <Form.Control
              type="number"
              name="total"
              value={exam.total}
              onChange={(e) =>
                setExam({
                  ...exam,
                  total: !isNaN(parseFloat(e.target.value))
                    ? parseFloat(e.target.value)
                    : 0,
                })
              }
              className="user-form-input"
              placeholder="Type Total Questions"
              required
            />
          </Col>
        </Form.Group>
        <Form.Group controlId="question_pass" as={Row} sm="8" className="mb-4">
          <Form.Label column sm="1">
            Pass Limit
          </Form.Label>
          <Col sm="6">
            <Form.Control
              type="number"
              name="pass"
              value={exam.correct}
              onChange={(e) =>
                setExam({
                  ...exam,
                  correct: !isNaN(parseFloat(e.target.value))
                    ? parseFloat(e.target.value)
                    : 0,
                })
              }
              className="user-form-input"
              placeholder="Type Duration"
              required
            />
          </Col>
        </Form.Group>
        <Button
          type="submit"
          variant="outline-primary"
          style={{ marginLeft: '20%' }}
        >
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default ExamForm;
