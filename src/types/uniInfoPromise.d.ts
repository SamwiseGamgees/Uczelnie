// when isNew === false
export interface ExistingUniversityInfo {
  kind: "existing";            // ← discriminant
  description: Array | null;
  WorldRank: number;
  NationalRank: number;
  Score: number;
  Country: string;
}

// when isNew === true
export interface NewUniversityInfo {
  kind: "new";                 // ← discriminant
  description: Array | null;
  Country: string;
  created_at: string;          // or Date, depending on your DB type
  Author: string;
}

export type UniversityInfo = ExistingUniversityInfo | NewUniversityInfo;
