import { AxiosError } from "axios";

export const errorInterceptors = (error: AxiosError) => {
  if (error.message === "Network Error")
    return Promise.reject(new Error("Erro de conexão"));

  if (error.response?.status === 401){
		// do something;
	}

	return Promise.reject(error);
};