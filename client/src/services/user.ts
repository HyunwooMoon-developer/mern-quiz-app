import { LoginType, RegisterType } from '../types/types';
import instance from './instance';

const basePath = '/api/user';

const register = async (payload: RegisterType) => {
  try {
    const res = await instance.post(`${basePath}/register`, payload);

    return res.data;
  } catch (err: any) {
    return err.response.data;
  }
};

const login = async (payload: LoginType) => {
  try {
    const res = await instance.post(`${basePath}/login`, payload);
    return res.data;
  } catch (err: any) {
    return err.response.data;
  }
};

const getUser = async () => {
  try {
    const res = await instance.get(`${basePath}/user`);

    return res.data;
  } catch (err: any) {
    return err.response.data;
  }
};

export { register, login, getUser };
