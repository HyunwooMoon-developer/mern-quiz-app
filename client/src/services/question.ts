import instance from './instance';

const basePath = '/api/question';

const addQuestion = async (payload: any) => {
  try {
    const res = await instance.post(`${basePath}`, payload);

    return res.data;
  } catch (err: any) {
    return err.response.data;
  }
};

const updateQuestion = async (payload: any) => {
  try {
    const res = await instance.put(`${basePath}/${payload.id}`, payload);

    return res.data;
  } catch (err: any) {
    return err.response.data;
  }
};

const deleteQuestion = async (payload: any) => {
  try {
    const res = await instance.delete(`${basePath}/${payload.id}`, payload);

    return res.data;
  } catch (err: any) {
    return err.response.data;
  }
};

export { addQuestion, updateQuestion, deleteQuestion };
