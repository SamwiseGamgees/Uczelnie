import { addGlobePoint } from './globe';

interface PointData {
  latitude: number;
  longitude: number;
  institution: string;
}

export async function addPoints(): Promise<PointData[]> {
  try {
    const response = await fetch('http://127.0.0.1:3000/points');
    const points: PointData[] = await response.json();

    for (const point of points) {
      await addGlobePoint(point.latitude, -point.longitude, point.institution);
    }

    return points;
  } catch (error) {
    console.error('Błąd podczas ładowania punktów:', error);
    return [];
  }
}
