import api from ".";

export const loginApi = async (email: string, password: string) =>
  api.post("/login", { email, password });

export const registerApi = async (
  data:
    | {
        name: string;
        email: string;
        password: string;
      }
    | any
) => api.post("/register", data);
