import * as THREE from 'three';
import { createGeoGrid } from '../../countries/geogrid';
import { drawThreeGeo } from '../../countries/threeGeoJSON';
import { addPointOnSphere } from '../../countries/geopoints';

// Typ rozszerzający THREE.Object3D o dodatkowe dane użytkownika
interface PointWithUserData extends THREE.Object3D {
  userData: {
    desc?: string;
    type?: string;
    [key: string]: any;
  };
}

type GlobeGroup = THREE.Group & {
  userData: {
    autoRotate: boolean;
    small: boolean;
    [key: string]: any;
  };
};

const globe = new THREE.Group() as GlobeGroup;

globe.userData.autoRotate = true;
globe.userData.small = false;


const pointsGroup: PointWithUserData[] = [];

function initGlobe(): void {
  // Podstawowa kula
  const sphereGeometry = new THREE.SphereGeometry();
  const globeMaterial = new THREE.MeshBasicMaterial({ color: 'black' });
  const sphere = new THREE.Mesh(sphereGeometry, globeMaterial);
  globe.add(sphere);

  // Siatka geograficzna
  const geogrid = createGeoGrid();
  geogrid.scale.set(1.001, 1.001, 1.001);
  globe.add(geogrid);
}

async function loadCountries(): Promise<void> {
  const response = await fetch('/countries/countries.json');
  const data = await response.json();
  const countries = drawThreeGeo({ json: data, radius: 1 });
  globe.add(countries);
}

async function addGlobePoint(lat: number, lon: number, desc: string): Promise<void> {
  const point: PointWithUserData = await addPointOnSphere(lat, lon);
  globe.add(point);
  point.userData.desc = desc;
  point.userData.type = 'point';
  pointsGroup.push(point);
}

// Inicjalne wartości userData
globe.userData.autoRotate = true;
globe.userData.small = true;

export { globe, initGlobe, loadCountries, addGlobePoint, pointsGroup };
