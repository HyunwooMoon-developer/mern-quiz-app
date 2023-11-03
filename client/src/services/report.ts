import instance from './instance';

const basePath = '/api/report';

const getReports = async (payload: any) => {
  try {
    const res = await instance.get(`${basePath}`, payload);
    return res.data;
  } catch (err: any) {
    return err.response.data;
  }
};

const getReportsByUser = async () => {
  try {
    const res = await instance.post(`${basePath}`);

    return res.data;
  } catch (err: any) {
    return err.response.data;
  }
};

const addReport = async (payload: any) => {
  try {
    const res = await instance.post(`${basePath}`, payload);

    return res.data;
  } catch (err: any) {
    return err.response.data;
  }
};

export { getReports, getReportsByUser, addReport };
