import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { ExamType, QuestionType } from '../../../types/types';
import { getExam } from '../../../services/exam';
import { useAppSelector } from '../../../redux/hooks';
import { addReport } from '../../../services/report';

const ExamQuestions = () => {
  const [exam, setExam] = useState<ExamType | null>(null);
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [selectOptions, setSelectOptions] = useState<any>({});
  const [time, setTime] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  const { user } = useAppSelector((state) => state.user);

  const params = useParams();
  const navigate = useNavigate();
  const buttonRef = useRef<any>(null);

  const increaseCount = () => setCount((prev) => prev + 1);

  const prevQuestion = () => setQuestionIndex((prev) => prev - 1);
  const nextQuestion = () => setQuestionIndex((prev) => prev + 1);

  const getExamById = useCallback(async () => {
    try {
      if (params.id) {
        const res = await getExam(params.id);

        if (res.success) {
          setExam(res.data as ExamType);
          setQuestions(res.data.questions);
          setTime(res.data.duration);
        } else {
          console.log(res.message);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }, [params.id]);

  const handleSubmit = useCallback(async () => {
    try {
      const answers = Object.values(selectOptions);
      const limit = exam?.correct as number;
      let correct = 0;
      let pass: boolean = false;

      questions.forEach((question, index) => {
        if (question.correctOption === answers[index]) {
          correct++;
        }
      });

      if (correct >= limit) {
        pass = true;
      }

      const testResult = {
        user: user?._id,
        exam: exam?._id,
        result: {
          answers,
          correct,
          pass,
        },
      };

      const res = await addReport(testResult);

      if (res.success) {
        navigate(`/user/report`);
      }
    } catch (err) {
      console.log(err);
    }
  }, [exam?._id, exam?.correct, navigate, questions, selectOptions, user?._id]);

  useEffect(() => {
    if (params.id) {
      getExamById();
    }
  }, [getExamById, params.id]);

  useEffect(() => {
    buttonRef.current.addEventListener('click', increaseCount);

    const interval = setInterval(() => {
      buttonRef.current.click();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (count !== 0 && time === count) {
      buttonRef.current.removeEventListener('click', increaseCount);
      handleSubmit();
    }
  }, [time, count, handleSubmit]);

  return (
    <>
      <div>
        <button style={{ display: 'none' }} ref={buttonRef}>
          timer
        </button>
      </div>
      {exam ? (
        <Container>
          <Row className="gap-3">
            <Row className="mt-5">
              <Col md={10}>
                <h1>
                  {questionIndex + 1}. {questions[questionIndex].name}
                </h1>
              </Col>
              <Col md={2}>
                <h4 style={{ color: count > 50 ? 'red' : undefined }}>
                  {count}
                </h4>
              </Col>
            </Row>
            <Row>
              {Object.keys(questions[questionIndex].options).map((option) => (
                <Col key={option} md={6} className="d-grid gap-2 mt-5">
                  <Button
                    style={{ cursor: 'pointer' }}
                    size="lg"
                    className="w-100 p-5"
                    value={option}
                    onClick={() =>
                      setSelectOptions({
                        ...selectOptions,
                        [questionIndex]: option,
                      })
                    }
                    variant={
                      selectOptions[questionIndex] === option
                        ? 'primary'
                        : 'secondary'
                    }
                  >
                    {`${option} : ${questions[questionIndex].options[option]}`}
                  </Button>
                </Col>
              ))}
            </Row>
            <Row className="mt-5 d-flex justify-content-between">
              <Col md={1} xs={3}>
                <Button
                  style={{ cursor: 'pointer' }}
                  size="lg"
                  onClick={prevQuestion}
                  disabled={questionIndex === 0}
                >
                  Prev
                </Button>
              </Col>
              <Col md={1} xs={3}>
                <Button
                  style={{ cursor: 'pointer' }}
                  size="lg"
                  onClick={nextQuestion}
                  disabled={questionIndex === questions.length - 1}
                >
                  Next
                </Button>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col md="auto" sm="auto" xs="auto">
                <Button
                  size="lg"
                  variant="outline-danger"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </Row>
        </Container>
      ) : null}
    </>
  );
};

export default ExamQuestions;
