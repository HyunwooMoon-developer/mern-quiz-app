import { useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { AiFillEdit } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';
import { ExamType } from '../types/types';
import { deleteQuestion } from '../services/question';
import QuestionModal from './QuestionModal';
import QuestionDeleteModal from './QuestionDelteModal';

const columns = ['#', 'Name', 'Options', 'Correct Options', 'Actions'];

const QuestionTable = ({
  exam,
  getExistExam,
}: {
  exam: ExamType;
  getExistExam: () => void;
}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [questionID, setQuestionID] = useState<string>('');
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const onDeleteQuestion = async () => {
    try {
      if (!questionID) return null;

      const res = await deleteQuestion(questionID, exam._id as string);

      if (res.success) {
        getExistExam();
        setOpenDeleteModal(false);
      } else {
        console.log(res.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const editQuestion = (id: string) => {
    setQuestionID(id);
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setQuestionID('');
    setOpenModal(false);
  };

  const openDelete = (questionID: string) => {
    setQuestionID(questionID);

    setOpenDeleteModal(true);
  };

  const closeDelete = () => {
    setQuestionID('');
    setOpenDeleteModal(false);
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
                    A : {question.options.A}
                    <br />B : {question.options.B}
                    <br />C : {question.options.C}
                    <br />D : {question.options.D}
                  </td>
                  <td>
                    {question.correctOption} :{' '}
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
                            onClick={() => editQuestion(question._id as string)}
                            size="sm"
                          >
                            <AiFillEdit />
                          </Button>
                        </Col>
                        <Col>
                          <Button
                            variant="outline-danger"
                            onClick={() => openDelete(question._id as string)}
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
      {exam.questions.length < exam.total ? (
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
      {openModal && exam._id ? (
        <QuestionModal
          open={openModal}
          onClose={onCloseModal}
          exam={exam}
          questionID={questionID}
          getExistExam={getExistExam}
        />
      ) : null}
      {openDeleteModal ? (
        <QuestionDeleteModal
          open={openDeleteModal}
          onClose={closeDelete}
          onDelete={onDeleteQuestion}
        />
      ) : null}
    </Container>
  );
};

export default QuestionTable;
