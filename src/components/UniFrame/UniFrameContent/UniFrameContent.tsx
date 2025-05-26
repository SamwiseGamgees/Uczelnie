import "./UniFrameContent.css";
import { useHoverStore } from "@/zustand/useHoverStore";
import supabase from "@/config/supabaseClient";
import { useEffect, useState } from "react";

interface UniversityInfo {
  description: string | null;
  WorldRank: number;
  NationalRank: number;
  Score: number;
  Country: string;
}
interface Opis {
  description: string;
}

async function getUniversityInfo(
  uniName: string
): Promise<UniversityInfo | null> {
  const { data: opis, error: err1 } = await supabase
    .from("uczelnie")
    .select("opisy(description)")
    .eq("University", uniName)
    .single();

  if (err1) {
    console.log("Błąd w zapytaniu: ", err1);
    return null;
  }
  const { data: uczelnia, error: err2 } = await supabase
    .from("uczelnie")
    .select("WorldRank, NationalRank, Score, Country")
    .eq("University", uniName)
    .single();

  if (err2) {
    console.log("Nie znaleziono uczelni: ", err2);
    return null;
  }
  return {
    description: (opis?.opisy as unknown as Opis).description ?? null,
    WorldRank: uczelnia.WorldRank,
    NationalRank: uczelnia.NationalRank,
    Score: uczelnia.Score,
    Country: uczelnia.Country,
  };
}

export default function UniFrameContent() {
  const clickedUni = useHoverStore((s) => s.clickedName);
  const [uniInfo, setUniInfo] = useState<UniversityInfo | null>(null);
  useEffect(() => {
    if (clickedUni) {
      (async () => {
        const desc = await getUniversityInfo(clickedUni);
        setUniInfo(desc);
      })();
    } else {
      setUniInfo(null);
    }
  }, [clickedUni]);
  return (
    <div className="uniFrameContent">
      {uniInfo ? (
        <>
          <div className="uniNameBox">
            <h1>{clickedUni}</h1>
          </div>
          <div className="mainInfoBox">
            <div>
              <h3>Ranking Światowy:</h3>
              <h1>#{uniInfo?.WorldRank}</h1>
            </div>
            <div>
              <h3>Ranking Krajowy:</h3>
              <h1>#{uniInfo?.NationalRank}</h1>
            </div>
            <div>
              <h3>Państwo:</h3>
              <h1>{uniInfo?.Country}</h1>
            </div>
            <div>
              <h3>Wyink:</h3>
              <h1>{uniInfo?.Score}</h1>
            </div>
          </div>
          <div className="descriptionBox">
            <p>{uniInfo?.description}</p>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
