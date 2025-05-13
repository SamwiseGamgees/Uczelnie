import * as THREE from 'three';

/**
 * Tworzy siatkę geograficzną (równoleżniki i południki) na sferze.
 * @param radius Promień sfery
 * @param stepDeg Odstęp między liniami w stopniach
 * @returns Obiekt 3D z siatką
 */
export function createGeoGrid(radius: number = 1, stepDeg: number = 10): THREE.Object3D {
  const container = new THREE.Object3D();
  const geogrid = new THREE.Group();

  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0xcccccc,
  });

  // Równoleżniki
  for (let i = -90 + stepDeg; i < 90; i += stepDeg) {
    const angle = THREE.MathUtils.degToRad(i);
    const points: THREE.Vector3[] = [];
    const r = radius * Math.cos(angle);
    const h = radius * Math.sin(angle);

    for (let pStep = 0; pStep <= 360; pStep += 5) {
      const topAngle = THREE.MathUtils.degToRad(pStep);
      const z = r * Math.cos(topAngle);
      const x = r * Math.sin(topAngle);
      const point = new THREE.Vector3(x, h, z);
      points.push(point);
    }

    const ringGeometry = new THREE.BufferGeometry().setFromPoints(points);
    const ring = new THREE.Line(ringGeometry, lineMaterial);
    geogrid.add(ring);
  }

  // Południki
  for (let i = 0 + stepDeg; i <= 360; i += stepDeg) {
    const angle = THREE.MathUtils.degToRad(i);
    const points: THREE.Vector3[] = [];

    for (let pStep = 0; pStep <= 180; pStep += 5) {
      const topAngle = THREE.MathUtils.degToRad(pStep);
      const r = Math.sin(topAngle) * radius;
      const y = Math.cos(topAngle) * radius;
      const x = r * Math.sin(angle);
      const z = r * Math.cos(angle);
      const point = new THREE.Vector3(x, y, z);
      points.push(point);
    }

    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    const meridian = new THREE.Line(lineGeometry, lineMaterial);
    geogrid.add(meridian);
  }

  container.add(geogrid);
  return container;
}
