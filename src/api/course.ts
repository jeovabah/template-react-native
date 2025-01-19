import api from ".";

export const listAll = (page: number = 1) => api.get(`courses?page=${page}`);

export const registerData = (data: any) => api.postForm("/courses/store", data);
export const deleteData = (uuid: string) =>
  api.delete(`courses/${uuid}/destroy`);
export const updateData = (uuid: string, data: any) =>
  api.put(`courses/${uuid}/update`, data);

export const getShowData = (uuid: string) => api.get(`courses/${uuid}/show`);

export const searchData = (params: { name: string }) =>
  api.get(`courses?name=${params.name}`);

export const setStatusData = (uuid: string) =>
  api.put(`courses/${uuid}/toggle-status`);

export const getSelectData = () => api.get(`public/courses/select`);
