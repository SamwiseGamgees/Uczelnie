import * as THREE from "three";
import { addGlobePoint } from "./globe";
import { PointWithUpdate } from "../types/points";
import supabase from "config/supabaseClient";

interface PointData {
  latitude: number;
  longitude: number;
  University: string;
}
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
export async function addPoints(): Promise<PointWithUpdate[]> {
  const points: PointWithUpdate[] = [];

  // points.push(addGlobePoint(42.2228, 71.0701, "Harvard"));
  // points.push(addGlobePoint(32.2228, 51.0701, "SomeUniversity")); 
  await delay(4500);
  try {
    const { data, error } = await supabase.from("uczelnie").select("*");

    if (error) {
      throw error;
    }
    if (!data) {
      console.warn("No universities returned");
      return points;
    }
    if (data) {
      const meshPromises = data.map((uni) =>
        addGlobePoint(uni.Latitude, -uni.Longitude, uni.University, false).then(
          (mesh) => mesh as PointWithUpdate
        )
      );
      const meshes = await Promise.all(meshPromises);
      points.push(...meshes);
    }
  } catch (err: unknown) {
    console.error(
      "Błąd podczas ładowania punktów:",
      err instanceof Error ? err.message : err
    );
  }
  try {
    const { data: uczelnie, error: err2} = await supabase
      .from("nowe_uczelnie")
      .select("*")

    if(err2) {
      throw err2;
    }
    if (!uczelnie) {
      console.warn("No universities returned");
      return points;
    }
    const meshPromises = uczelnie.map((uni) => 
      addGlobePoint(uni.Latitude, -uni.Longitude, uni.University, true).then(
          (mesh) => mesh as PointWithUpdate
        )
    );
    const meshes = await Promise.all(meshPromises);
    points.push(...meshes);
  } catch (err2){
    console.error(
      "Błąd podczas ładowania punktów:",
      err2 instanceof Error ? err2.message : err2
    );
  }

  return points;
}
