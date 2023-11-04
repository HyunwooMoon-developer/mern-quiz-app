import { QuestionType } from '../types/types';
import instance from './instance';

const basePath = '/api/question';

const addQuestion = async (payload: QuestionType) => {
  try {
    const res = await instance.post(`${basePath}`, payload);

    return res.data;
  } catch (err: any) {
    return err.response.data;
  }
};

const updateQuestion = async (payload: QuestionType) => {
  try {
    const res = await instance.put(`${basePath}/${payload._id}`, payload);

    return res.data;
  } catch (err: any) {
    return err.response.data;
  }
};

const deleteQuestion = async (id: string, examID: string) => {
  try {
    const res = await instance.delete(`${basePath}/${id}`, {
      data: {
        examID,
      },
    });

    return res.data;
  } catch (err: any) {
    return err.response.data;
  }
};

export { addQuestion, updateQuestion, deleteQuestion };
