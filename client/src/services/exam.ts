import { ExamType } from '../types/types';
import instance from './instance';

const basePath = '/api/exam';

const getExams = async () => {
  try {
    const res = await instance.get(`${basePath}/`);

    return res.data;
  } catch (err: any) {
    return err.response.data;
  }
};

const getExam = async (id: string) => {
  try {
    const res = await instance.get(`${basePath}/${id}`);

    return res.data;
  } catch (err: any) {
    return err.response.data;
  }
};

const addExam = async (payload: ExamType) => {
  console.log(payload);
  try {
    const res = await instance.post(`${basePath}/`, payload);

    return res.data;
  } catch (err: any) {
    return err.response.data;
  }
};

const updateExam = async (payload: ExamType) => {
  try {
    const res = await instance.put(`${basePath}/${payload._id}`, payload);

    return res.data;
  } catch (err: any) {
    return err.response.data;
  }
};

const deleteExam = async (id: string) => {
  try {
    const res = await instance.delete(`${basePath}/${id}`);

    return res.data;
  } catch (err: any) {
    return err.response.data;
  }
};

export { getExams, getExam, addExam, updateExam, deleteExam };
