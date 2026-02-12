import { API_BASE, API_PATH } from "./api.config";

export type JadwalImsakiyah = {
  tanggal: number;
  imsak: string;
  subuh: string;
  terbit: string;
  dhuha: string;
  dzuhur: string;
  ashar: string;
  maghrib: string;
  isya: string;
};

export type ImsakiyahResponse = {
  code: number;
  message: string;
  data: {
    provinsi: string;
    kabkota: string;
    hijriah: string;
    masehi: string;
    imsakiyah: JadwalImsakiyah[];
  };
};

// Get list provinsi (string[])
export const getProvinsi = async () => {
  const url = `${API_BASE}/${API_PATH.IMSAKIYAH}/provinsi`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch: ${url}`);

  return res.json() as Promise<{
    code: number;
    message: string;
    data: string[];
  }>;
};

// Get kab/kota (string[])
export const getKabKota = async (provinsi: string) => {
  const url = `${API_BASE}/${API_PATH.IMSAKIYAH}/kabkota`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ provinsi }),
  });

  if (!res.ok) throw new Error(`Failed to fetch: ${url}`);

  return res.json() as Promise<{
    code: number;
    message: string;
    data: string[];
  }>;
};

// Get jadwal imsakiyah
export const getJadwalImsakiyah = async (provinsi: string, kabkota: string) => {
  const url = `${API_BASE}/${API_PATH.IMSAKIYAH}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ provinsi, kabkota }),
  });

  if (!res.ok) throw new Error(`Failed to fetch: ${url}`);

  return res.json() as Promise<ImsakiyahResponse>;
};
