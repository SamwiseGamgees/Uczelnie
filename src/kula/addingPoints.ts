import * as THREE from 'three';
import { addGlobePoint } from './globe';
import { PointWithUpdate } from '../types/points'; // jeśli masz gdzieś typ

interface PointData {
  latitude: number;
  longitude: number;
  University: string;
}

export async function addPoints(): Promise<PointWithUpdate[]> {
  const points: PointWithUpdate[] = [];
  const Harvard = addGlobePoint(42.2228, 71.0701, 'Harvard');
  const Nigga = addGlobePoint(32.2228, 51.0701, 'Nigga');
  points.push(Harvard);
  try {
    const response = await fetch('http://127.0.0.1:3000/points');
    const data: PointData[] = await response.json();

    for (const point of data) {
      const mesh = await addGlobePoint(
        point.latitude,
        -point.longitude,
        point.University
      );

      points.push(mesh as PointWithUpdate);
    }

    return points;
  } catch (error) {
    console.error('Błąd podczas ładowania punktów:', error);
  }
}
