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
  if (globe.userData.initialized) return; // 👈 zapobiega wielokrotnej inicjalizacji

  // Podstawowa kula
  const sphereGeometry = new THREE.SphereGeometry();
  const globeMaterial = new THREE.MeshBasicMaterial({ color: 'black' });
  const sphere = new THREE.Mesh(sphereGeometry, globeMaterial);
  globe.add(sphere);

  // Siatka geograficzna
  const geogrid = createGeoGrid();
  geogrid.scale.set(1.001, 1.001, 1.001);
  globe.add(geogrid);

  globe.userData.initialized = true; // 👈 ustawiamy flagę
}


async function loadCountries(): Promise<void> {
  if (globe.userData.countriesLoaded) return;

  const response = await fetch('/countries/countries.json');
  const data = await response.json();
  const countries = drawThreeGeo({ json: data, radius: 1 });
  globe.add(countries);

  globe.userData.countriesLoaded = true; // 👈 zapobiega wielokrotnemu ładowaniu
}


async function addGlobePoint(lat: number, lon: number, desc: string, isNew: boolean): Promise<void> {
  const point: PointWithUserData = addPointOnSphere(lat, lon, 1, isNew);
  globe.add(point);
  point.userData.desc = desc;
  point.userData.type = 'point';
  pointsGroup.push(point);
}

// Inicjalne wartości userData
globe.userData.autoRotate = true;
globe.userData.small = true;
globe.userData.initialized = false;

export { globe, initGlobe, loadCountries, addGlobePoint, pointsGroup };
