import * as THREE from 'three';
import { addGlobePoint } from './globe';
import { PointWithUpdate } from '../types/points'; // jeśli masz gdzieś typ

interface PointData {
  latitude: number;
  longitude: number;
  institution: string;
}

export async function addPoints(): Promise<PointWithUpdate[]> {
  const points: PointWithUpdate[] = [];

  try {
    const response = await fetch('http://127.0.0.1:3000/points');
    const data: PointData[] = await response.json();

    for (const point of data) {
      const mesh = await addGlobePoint(
        point.latitude,
        -point.longitude,
        point.institution
      );

      // Dodaj update, jeśli potrzebny
      (mesh as PointWithUpdate).update = () => {
        // np. mesh.rotation.y += 0.01
      };

      points.push(mesh as PointWithUpdate);
    }

    return points;
  } catch (error) {
    console.error('Błąd podczas ładowania punktów:', error);
    return [];
  }
}
