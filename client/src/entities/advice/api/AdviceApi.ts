import type { AxiosResponse } from "axios";
import { axiosInstance } from "../../../shared/lib/axiosInstance";
import type { IApiResponse } from "../../../shared/types";
import type { IAdvice, IRawAdvice } from "../model";

export class AdviceApi {
  static async getAll(): Promise<IApiResponse<IAdvice[]>> {
    try {
      // деструктуризация из объекта response axios
      const { data } = await axiosInstance.get<IApiResponse<IAdvice[]>>(
        "/advice"
      );
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async create(advice: IRawAdvice): Promise<IApiResponse<IAdvice>> {
    try {
      const { data } = await axiosInstance.post<IApiResponse<IAdvice>>(
        "/advice",
        advice
      );
      return data; // новый совет из БД
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async delete(id: number): Promise<IApiResponse<void>> {
    try {
      const { data } = await axiosInstance.delete<IApiResponse<void>>(
        `/advice/${id}`
      );
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async getOne(id: number): Promise<IApiResponse<IAdvice>> {
    try {
      const { data } = await axiosInstance.get<IApiResponse<IAdvice>>(
        `/advice/${id}`
      );
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
