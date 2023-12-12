import instance from './instance';

const basePath = '/api/report';

const getReports = async (filter: any) => {
  try {
    const res = await instance.get(`${basePath}`, { params: filter });
    return res.data;
  } catch (err: any) {
    return err.response.data;
  }
};

const getReportsByUser = async (id: string) => {
  try {
    const res = await instance.get(`${basePath}/${id}`);

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
