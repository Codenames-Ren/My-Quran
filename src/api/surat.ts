import { apiFetch } from "./client";

export type SurahDetailResponse = {
  data: {
    nomor: number;
    nama: string;
    namaLatin: string;
    jumlahAyat: number;
    tempatTurun: string;
    ayat: any[];
  };
};

export const getAllSurah = () => apiFetch<{ data: any[] }>("/surat");

export const getSurahDetail = (id: number) =>
  apiFetch<SurahDetailResponse>(`/surat/${id}`);
