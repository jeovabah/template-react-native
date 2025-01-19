import React, { useState } from "react";
import { useStorageState } from "@/hooks/useStorageState";
import api from "@/api";
import * as SecureStore from "expo-secure-store";
import { loginApi } from "@/api/auth";
import { showToast } from "@/utils/toast";
import { authService } from "@/api/services/authService";
import { RegisterProps } from "@/stores/RegisterStore";

type User = {
  email: string;
  password?: string;
  user: {
    id: number;
    uuid: string;
    name: string;
    email: string;
    tenant_id: number;
    user_type_id: number;
    user_type: {
      id: number;
      name: string;
    };
    student: {
      id: number;
      uuid: string;
      user_id: number;
      tenant_id: number;
      document: string;
      birth_date: string;
      address: string;
      phone: string;
      is_active: number;
      created_at: string;
      updated_at: string;
      deleted_at: null;
      courses: Course[];
    };
    created_at: string;
    updated_at: string;
  };
};

type Course = {
  id: number;
  uuid: string;
  title: string;
  description?: string;
  price: number;
  subscription_type: string;
  logo: string;
  pivot?: {
    id: number;
    course_id: number;
    student_id: number;
  };
};

type AuthContextType = {
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  register: (props: RegisterProps) => Promise<void>;
  session?: string | null;
  user?: User | null;
  isLoading: boolean;
};

const AuthContext = React.createContext<AuthContextType>({
  signIn: async () => {},
  signOut: () => null,
  session: null,
  user: null,
  isLoading: false,
  register: async () => {},
});

export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const [[userLoading, user], setUser] = useStorageState("user");
  const [loading, setLoading] = useState(false);

  const initResponseLogout = () => {
    api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          signOut();
        }
        return Promise.reject(error);
      }
    );
  };
  const loadStorageData = React.useCallback(async () => {
    setLoading(true);
    const sessionData = await SecureStore.getItemAsync("session");
    if (sessionData) {
      console.log("sessionData", sessionData);
      setSession(sessionData);
      api.defaults.headers.common["Authorization"] = `Bearer ${sessionData}`;
      initResponseLogout();
    }
    setLoading(false);
  }, [setSession]);

  const signIn = async (email: string, password: string) => {
    try {
      const response = await loginApi(email, password);
      if (response?.data?.response?.token) {
        const { token, ...userData } = response.data.response;
        userData.password = password;
        userData.email = email;
        setSession(token);
        setUser(JSON.stringify(userData));
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } else {
        throw new Error("Não foi possível realizar o login");
      }
    } catch (error: any) {
      showToast(
        "error",
        error?.response?.data?.message || "Não foi possível realizar o login"
      );
      throw error;
    }
  };

  const signOut = React.useCallback(() => {
    setSession(null);
    setUser(null);
    api.defaults.headers.common["Authorization"] = null;
  }, [setSession, setUser]);

  const register = async (props: RegisterProps) => {
    try {
      const data = await authService.register(props);
      if (data?.response?.token) {
        const { token, ...userData } = data?.response;
        userData.password = props.password;
        userData.email = props.email;
        // setSession(token);
        setUser(JSON.stringify(userData));
        // api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
    } catch (error: any) {
      showToast(
        "error",
        error?.response?.data?.message || "Não foi possível realizar o cadastro"
      );
      throw error;
    }
  };

  React.useEffect(() => {
    loadStorageData();
  }, [loadStorageData]);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        session,
        user: user ? JSON.parse(user) : null,
        isLoading: isLoading || userLoading || loading,
        register,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
