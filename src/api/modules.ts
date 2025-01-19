import api from ".";

export const listAll = (page: number = 1) => api.get(`modules?page=${page}`);

export const registerData = (data: any) => api.postForm("/modules/store", data);
export const deleteData = (uuid: string) =>
  api.delete(`modules/${uuid}/destroy`);
export const updateData = (uuid: string, data: any) =>
  api.put(`modules/${uuid}/update`, data);

export const getShowData = (uuid: string) => api.get(`modules/${uuid}/show`);

export const searchData = (params: { name: string }) =>
  api.get(`modules?name=${params.name}`);

export const setStatusData = (uuid: string) =>
  api.put(`modules/${uuid}/toggle-status`);

export const getSelectData = () => api.get(`modules/select`);
