export const QORI_LIST = {
  "01": "Abdullah Al-Juhany",
  "02": "Abdul Muhsin Al-Qasim",
  "03": "Abdurrahman As-Sudais",
  "04": "Ibrahin Al-Dossari",
  "05": "Misyari Rasyid Al-Afasi",
  "06": "Yasser Al-Dosari",
} as const;

export type QoriKey = keyof typeof QORI_LIST;

export function getNextQori(current: QoriKey): QoriKey {
  const keys = Object.keys(QORI_LIST) as QoriKey[];
  const index = keys.indexOf(current);
  return keys[(index + 1) % keys.length];
}
