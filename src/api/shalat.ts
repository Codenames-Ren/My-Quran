import { API_PATH } from "./api.config";
import { apiFetch } from "./client";

export type JadwalShalat = {
  tanggal: number;
  tanggal_lengkap: string;
  hari: string;
  imsak: string;
  subuh: string;
  terbit: string;
  dhuha: string;
  dzuhur: string;
  ashar: string;
  maghrib: string;
  isya: string;
};

export type ShalatResponse = {
  code: number;
  message: string;
  data: {
    provinsi: string;
    kabkota: string;
    bulan: number;
    tahun: number;
    bulan_nama: string;
    jadwal: JadwalShalat[];
  };
};

export type ProvinsiShalatResponse = {
  code: number;
  message: string;
  data: string[];
};

export type KabKotaShalatResponse = {
  code: number;
  message: string;
  data: string[];
};

// Get daftar provinsi
export const getProvinsiShalat = async () => {
  return apiFetch<ProvinsiShalatResponse>("/provinsi", {
    basePath: API_PATH.SHALAT,
  });
};

// Get daftar kabupaten/kota berdasarkan provinsi
export const getKabKotaShalat = async (provinsi: string) => {
  return apiFetch<KabKotaShalatResponse>("/kabkota", {
    basePath: API_PATH.SHALAT,
    method: "POST",
    body: {
      provinsi,
    },
  });
};

// Get jadwal shalat berdasarkan lokasi
export const getJadwalShalat = async (
  provinsi: string,
  kabkota: string,
  bulan?: number,
  tahun?: number,
) => {
  return apiFetch<ShalatResponse>("", {
    basePath: API_PATH.SHALAT,
    method: "POST",
    body: {
      provinsi,
      kabkota,
      ...(bulan !== undefined && { bulan }),
      ...(tahun !== undefined && { tahun }),
    },
  });
};