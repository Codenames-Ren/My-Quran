import { apiFetch } from "./client";

export const getAllSurah = () => apiFetch("/surat");

export const getSurahDetail = (id: number) => apiFetch(`/surat/${id}`);
