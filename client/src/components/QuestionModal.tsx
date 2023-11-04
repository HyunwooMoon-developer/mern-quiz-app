import { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Form,
  FormCheck,
  FormControl,
  Modal,
  Row,
} from 'react-bootstrap';
import { ExamType, QuestionType } from '../types/types';
import { addQuestion, updateQuestion } from '../services/question';

const options: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];

const QuestionModal = ({
  open,
  onClose,
  exam,
  questionID,
  getExistExam,
}: {
  open: boolean;
  onClose: () => void;
  exam: ExamType;
  questionID?: string;
  getExistExam: () => void;
}) => {
  const [question, setQuestion] = useState<QuestionType>({
    name: '',
    options: {
      A: '',
      B: '',
      C: '',
      D: '',
    },
    correctOption: null,
    exam: exam._id,
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let res;

      if (questionID) {
        res = await updateQuestion({ ...question, _id: questionID });
      } else {
        res = await addQuestion(question);
      }

      if (res.success) {
        getExistExam();
        onClose();
      } else {
        console.log(res.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const editData = exam.questions.find(
      (question) => question._id === questionID
    );

    if (editData) {
      setQuestion(editData);
    }
  }, [exam.questions, questionID]);

  return (
    <Modal
      show={open}
      onHide={onClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Craete Question
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="question-name">
            <Form.Label>Question</Form.Label>
            <FormControl
              value={question.name}
              type="text"
              name="name"
              onChange={(e) =>
                setQuestion({ ...question, name: e.target.value })
              }
              placeholder="Type Question"
              required
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            as={Row}
            controlId="question-correct-option"
          >
            <Form.Label>Correct Answer</Form.Label>
            {options.map((option) => (
              <Col md="2" key={option}>
                <FormCheck
                  key={option}
                  type="radio"
                  label={option}
                  checked={option === question.correctOption}
                  name="options"
                  required
                  inline
                  onChange={() =>
                    setQuestion({ ...question, correctOption: option })
                  }
                />
              </Col>
            ))}
          </Form.Group>
          <Row className="mb-3">
            <p>Options</p>
            <Col md="6">
              <Form.Group as={Row} controlId="option-A">
                <Form.Label column sm="2">
                  A
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="Type option"
                    value={question.options.A}
                    onChange={(e) =>
                      setQuestion({
                        ...question,
                        options: { ...question.options, A: e.target.value },
                      })
                    }
                  />
                </Col>
              </Form.Group>
            </Col>
            <Col md="6">
              <Form.Group as={Row} controlId="option-A">
                <Form.Label column sm="2">
                  B
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="Type option"
                    value={question.options.B}
                    onChange={(e) =>
                      setQuestion({
                        ...question,
                        options: { ...question.options, B: e.target.value },
                      })
                    }
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md="6">
              <Form.Group as={Row} controlId="option-A">
                <Form.Label column sm="2">
                  C
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="Type option"
                    value={question.options.C}
                    onChange={(e) =>
                      setQuestion({
                        ...question,
                        options: { ...question.options, C: e.target.value },
                      })
                    }
                  />
                </Col>
              </Form.Group>
            </Col>
            <Col md="6">
              <Form.Group as={Row} controlId="option-A">
                <Form.Label column sm="2">
                  D
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="Type option"
                    value={question.options.D}
                    onChange={(e) =>
                      setQuestion({
                        ...question,
                        options: { ...question.options, D: e.target.value },
                      })
                    }
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Row>
            <Col>
              <Button type="submit" variant="outline-success">
                Submit
              </Button>
            </Col>
            <Col>
              <Button type="button" variant="outline-danger" onClick={onClose}>
                Close
              </Button>
            </Col>
          </Row>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default QuestionModal;
