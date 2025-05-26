// uniInfo.ts
import supabase from "@/config/supabaseClient";
import { UniversityInfo } from "@/uniInfoPromise";

export async function getUniversityInfo(
  uniName: string,
  isNew: boolean
): Promise<UniversityInfo | null> {
  if (isNew) {
    const { data, error } = await supabase
      .from("nowe_uczelnie")
      .select("created_at, Country, Description")
      .eq("University", uniName)
      .single();

    if (error) {
      console.error("Nie znaleziono nowej uczelni:", error);
      return null;
    }

    return {
      kind: "new",
      description: data.Description,
      Country: data.Country,
      created_at: data.created_at,
    };
  } else {
    // fetch description and stats in parallel
    const [
      { data: descData, error: descError },
      { data: statData, error: statError },
    ] = await Promise.all([
      supabase
        .from("uczelnie")
        .select("opisy(description)")
        .eq("University", uniName)
        .single(),
      supabase
        .from("uczelnie")
        .select("WorldRank, NationalRank, Score, Country")
        .eq("University", uniName)
        .single(),
    ]);

    if (descError || statError) {
      console.error("Błąd w zapytaniu uczelni:", descError ?? statError);
      return null;
    }

    return {
      kind: "existing",
      description: (descData.opisy as { description: string }).description,
      WorldRank: statData.WorldRank,
      NationalRank: statData.NationalRank,
      Score: statData.Score,
      Country: statData.Country,
    };
  }
}
