import axios from "axios";

export const getCep = async (cep: string) =>
  axios.get(`https://viacep.com.br/ws/${cep}/json/`);
