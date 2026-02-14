export type TahlilItem =
  | {
      type: "text";
      arab: string;
      latin: string;
      arti: string;
      ayatNumber?: number;
    }
  | {
      type: "surah";
      surahId: number;
      title?: string;
    };
