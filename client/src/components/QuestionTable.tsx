import { useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { AiFillEdit } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';
import { ExamType } from '../types/types';
import { deleteQuestion } from '../services/question';
import QuestionModal from './QuestionModal';

const columns = ['#', 'Name', 'Options', 'Correct Options', 'Actions'];

const QuestionTable = ({
  exam,
  getExistExam,
}: {
  exam: ExamType;
  getExistExam: () => void;
}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const onDeleteQuestion = async (question: any) => {
    try {
      const res = await deleteQuestion(question);

      if (res.success) {
        getExistExam();
      } else {
        console.log(res.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Row>
        <Table striped>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          {exam.questions.length > 0 ? (
            <tbody>
              {exam.questions.map((question, index) => (
                <tr key={question._id ?? index}>
                  <td>{index + 1}</td>
                  <td>{question.name}</td>
                  <td>
                    {question.options.A}
                    <br />
                    {question.options.B}
                    <br />
                    {question.options.C}
                    <br />
                    {question.options.D}
                  </td>
                  <td>
                    {question.correctOption}{' '}
                    {question.correctOption
                      ? question.options[question.correctOption]
                      : null}
                  </td>
                  <td>
                    {question._id ? (
                      <Row>
                        <Col lg="2">
                          <Button
                            variant="outline-primary"
                            onClick={() => console.log('edit')}
                            size="sm"
                          >
                            <AiFillEdit />
                          </Button>
                        </Col>
                        <Col>
                          <Button
                            variant="outline-danger"
                            onClick={() => console.log('delete')}
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
      {exam.questions.length < exam.duration ? (
        <Button
          variant="outline-primary"
          size="sm"
          className="float-end"
          onClick={() => setOpenModal(true)}
        >
          <FaPlus /> Create
        </Button>
      ) : null}
      {exam.questions.length < 1 ? (
        <p className="text-center h4 mt-5 text-muted">No Data</p>
      ) : null}
      {openModal ? (
        <QuestionModal open={openModal} onClose={() => setOpenModal(false)} />
      ) : null}
    </Container>
  );
};

export default QuestionTable;
