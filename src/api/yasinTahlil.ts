import { getSurahDetail } from "./surat";

export type SurahAyat = {
  nomor: number;
  arab: string;
  translation: string;
};

type AyatApi = {
  nomorAyat?: number;
  nomor?: number;
  ar?: string;
  teksArab?: string;
  idn?: string;
  teksIndonesia?: string;
};

function normalizeAyat(a: AyatApi, index: number): SurahAyat {
  const nomor = a.nomorAyat ?? a.nomor ?? index + 1;

  const arab = a.ar ?? a.teksArab ?? "";

  const translation = a.idn ?? a.teksIndonesia ?? "";

  return {
    nomor,
    arab,
    translation,
  };
}

export async function getSurahForRead(surahId: number): Promise<SurahAyat[]> {
  const res = await getSurahDetail(surahId);

  if (!res?.data?.ayat || !Array.isArray(res.data.ayat)) {
    return [];
  }

  return res.data.ayat.map((a: unknown, i) => normalizeAyat(a as AyatApi, i));
}

export async function getYasin(): Promise<SurahAyat[]> {
  return getSurahForRead(36);
}
