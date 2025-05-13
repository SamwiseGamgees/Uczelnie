import * as THREE from "three";
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';
import { Line2 } from 'three/examples/jsm/lines/Line2';



// Typy GeoJSON (uproszczone dla Twojego zastosowania)
type Coordinates = [number, number];
type Geometry =
  | { type: 'Point'; coordinates: Coordinates }
  | { type: 'MultiPoint'; coordinates: Coordinates[] }
  | { type: 'LineString'; coordinates: Coordinates[] }
  | { type: 'Polygon'; coordinates: Coordinates[][] }
  | { type: 'MultiLineString'; coordinates: Coordinates[][] }
  | { type: 'MultiPolygon'; coordinates: Coordinates[][][] };

interface Feature {
  type: 'Feature';
  geometry: Geometry;
}

interface FeatureCollection {
  type: 'FeatureCollection';
  features: Feature[];
}

interface GeometryCollection {
  type: 'GeometryCollection';
  geometries: Geometry[];
}

type GeoJSON = Feature | FeatureCollection | GeometryCollection;

interface DrawOptions {
  json: GeoJSON;
  radius: number;
  materalOptions?: THREE.PointsMaterialParameters;
}

export function drawThreeGeo({ json, radius, materalOptions }: DrawOptions): THREE.Object3D {
  const container = new THREE.Object3D();
  container.userData.update = (t: number) => {
    container.children.forEach(child => {
      child.userData?.update?.(t);
    });
  };

  container.rotation.x = -Math.PI * 0.5;

  const x_values: number[] = [];
  const y_values: number[] = [];
  const z_values: number[] = [];

  const json_geom = createGeometryArray(json);
  let coordinate_array: Coordinates[] = [];

  for (const geom of json_geom) {
    switch (geom.type) {
      case 'Point':
        convertToSphereCoords(geom.coordinates, radius);
        drawParticle(x_values[0], y_values[0], z_values[0], materalOptions);
        break;
      case 'MultiPoint':
        geom.coordinates.forEach(coord => {
          convertToSphereCoords(coord, radius);
          drawParticle(x_values[0], y_values[0], z_values[0], materalOptions);
        });
        break;
      case 'LineString':
        coordinate_array = createCoordinateArray(geom.coordinates);
        coordinate_array.forEach(coord => convertToSphereCoords(coord, radius));
        drawLine(x_values, y_values, z_values, materalOptions);
        break;
      case 'Polygon':
        geom.coordinates.forEach(segment => {
          coordinate_array = createCoordinateArray(segment);
          coordinate_array.forEach(coord => convertToSphereCoords(coord, radius));
          drawLine(x_values, y_values, z_values, materalOptions);
        });
        break;
      case 'MultiLineString':
        geom.coordinates.forEach(segment => {
          coordinate_array = createCoordinateArray(segment);
          coordinate_array.forEach(coord => convertToSphereCoords(coord, radius));
          drawLine(x_values, y_values, z_values, materalOptions);
        });
        break;
      case 'MultiPolygon':
        geom.coordinates.forEach(polygon =>
          polygon.forEach(segment => {
            coordinate_array = createCoordinateArray(segment);
            coordinate_array.forEach(coord => convertToSphereCoords(coord, radius));
            drawLine(x_values, y_values, z_values, materalOptions);
          })
        );
        break;
      default:
        throw new Error('Invalid GeoJSON geometry.');
    }
  }

  function createGeometryArray(json: GeoJSON): Geometry[] {
    if (json.type === 'Feature') return [json.geometry];
    if (json.type === 'FeatureCollection') return json.features.map(f => f.geometry);
    if (json.type === 'GeometryCollection') return json.geometries;
    throw new Error('Invalid GeoJSON root type.');
  }

  function createCoordinateArray(coords: Coordinates[]): Coordinates[] {
    const temp_array: Coordinates[] = [];

    for (let i = 0; i < coords.length; i++) {
      const p1 = coords[i];
      const p2 = coords[i - 1];

      if (i > 0 && needsInterpolation(p2, p1)) {
        const interp = interpolatePoints([p2, p1]);
        temp_array.push(...interp);
      } else {
        temp_array.push(p1);
      }
    }

    return temp_array;
  }

  function needsInterpolation(p1: Coordinates, p2: Coordinates): boolean {
    const lonDiff = Math.abs(p1[0] - p2[0]);
    const latDiff = Math.abs(p1[1] - p2[1]);
    return lonDiff > 5 || latDiff > 5;
  }

  function interpolatePoints(points: Coordinates[]): Coordinates[] {
    let temp: Coordinates[] = [];
    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      if (needsInterpolation(p1, p2)) {
        temp.push(p1, getMidpoint(p1, p2));
      } else {
        temp.push(p1);
      }
    }
    temp.push(points[points.length - 1]);

    return temp.length > points.length ? interpolatePoints(temp) : temp;
  }

  function getMidpoint(p1: Coordinates, p2: Coordinates): Coordinates {
    return [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2];
  }

  function convertToSphereCoords(coords: Coordinates, r: number): void {
    const [lon, lat] = coords;
    const radLat = THREE.MathUtils.degToRad(lat);
    const radLon = THREE.MathUtils.degToRad(lon);

    x_values.push(Math.cos(radLat) * Math.cos(radLon) * r);
    y_values.push(Math.cos(radLat) * Math.sin(radLon) * r);
    z_values.push(Math.sin(radLat) * r);
  }

  function drawParticle(x: number, y: number, z: number, options?: THREE.PointsMaterialParameters): void {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute([x, y, z], 3));
    const mat = new THREE.PointsMaterial(options);
    const point = new THREE.Points(geo, mat);
    container.add(point);
    clearArrays();
  }

  function drawLine(x: number[], y: number[], z: number[], options?: THREE.MaterialParameters): void {
    const verts: number[] = [];
    for (let i = 0; i < x.length; i++) {
      verts.push(x[i], y[i], z[i]);
    }

    const geo = new LineGeometry();
    geo.setPositions(verts);

    const color = new THREE.Color(0xcccccc);
    const mat = new LineMaterial({
      color,
      linewidth: 2,
      fog: true,
      ...options
    });

    const line = new Line2(geo, mat);
    line.computeLineDistances();
    const speed = Math.random() * 0.0002;

    line.userData.update = (t: number) => {
      mat.dashOffset = t * speed;
    };

    container.add(line);
    clearArrays();
  }

  function clearArrays(): void {
    x_values.length = 0;
    y_values.length = 0;
    z_values.length = 0;
  }

  return container;
}
