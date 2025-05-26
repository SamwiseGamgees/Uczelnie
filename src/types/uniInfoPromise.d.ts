// when isNew === false
export interface ExistingUniversityInfo {
  kind: "existing";            // ← discriminant
  description: string | null;
  WorldRank: number;
  NationalRank: number;
  Score: number;
  Country: string;
}

// when isNew === true
export interface NewUniversityInfo {
  kind: "new";                 // ← discriminant
  description: string | null;
  Country: string;
  created_at: string;          // or Date, depending on your DB type
}

export type UniversityInfo = ExistingUniversityInfo | NewUniversityInfo;
