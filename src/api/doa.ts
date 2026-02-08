import { API_PATH } from "./api.config";
import { apiFetch } from "./client";

export type DoaListItem = {
  id: number;
  grup: string;
  nama: string;
};

export type DoaDetail = {
  id: number;
  grup: string;
  nama: string;
  ar: string;
  tr: string;
  idn: string;
  tentang: string;
  tag: string;
};

export type DoaListResponse = {
  status: string;
  data: DoaListItem[];
};

export type DoaDetailResponse = {
  status: string;
  data: DoaDetail;
};

export const getAllDoa = () =>
  apiFetch<DoaListResponse>("/doa", {
    basePath: API_PATH.DOA,
  });

export const getDoaById = (id: number) =>
  apiFetch<DoaDetailResponse>(`/doa/${id}`, {
    basePath: API_PATH.DOA,
  });
