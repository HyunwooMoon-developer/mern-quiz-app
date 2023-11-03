import { useState } from 'react';
import {
  Button,
  Col,
  Form,
  FormCheck,
  FormControl,
  Modal,
  Row,
} from 'react-bootstrap';
import { QuestionType } from '../types/types';

const options: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];

const QuestionModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
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
  });

  console.log(question);
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
      <Modal.Body>
        <Form>
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
              <Col md="2">
                <FormCheck
                  key={option}
                  type="radio"
                  label={option}
                  name="options"
                  required
                  inline
                  onClick={() =>
                    setQuestion({ ...question, correctOption: option })
                  }
                />
              </Col>
            ))}
          </Form.Group>
          <Row className="mb-3">
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
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Row>
          <Col>
            <Button variant="outline-success">Submit</Button>
          </Col>
          <Col>
            <Button variant="outline-danger" onClick={onClose}>
              Close
            </Button>
          </Col>
        </Row>
      </Modal.Footer>
    </Modal>
  );
};

export default QuestionModal;
