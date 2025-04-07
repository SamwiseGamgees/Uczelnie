import * as THREE from 'three';
import { SVGLoader, SVGResult } from 'three/examples/jsm/loaders/SVGLoader';
import { camera } from '../src/kula/sceneSetup';

// Typ dla obiektu punktu z metodą update i flagą isPoint
interface PointGroup extends THREE.Group {
  userData: {
    isPoint: boolean;
    update: () => void;
    [key: string]: any;
  };
}

/**
 * Dodaje punkt na sferze bazując na współrzędnych geograficznych.
 * @param lat Szerokość geograficzna (w stopniach)
 * @param lon Długość geograficzna (w stopniach)
 * @param radius Promień sfery (domyślnie 1)
 * @returns Obietnica zwracająca grupę 3D z punktem
 */
function addPointOnSphere(lat: number, lon: number, radius: number = 1): Promise<PointGroup> {
  return new Promise((resolve, reject) => {
    const latitude = THREE.MathUtils.degToRad(lat);
    const longitude = THREE.MathUtils.degToRad(lon);

    const x = radius * Math.cos(latitude) * Math.cos(longitude);
    const y = radius * Math.sin(latitude);
    const z = radius * Math.cos(latitude) * Math.sin(longitude) + 0.05;

    const loader = new SVGLoader();
    loader.load(
      'https://cdn.prod.website-files.com/674b90dd8dfb734293c8e163/674b914ce6116045f09cdf66_Touchpoint.svg',
      (data: SVGResult) => {
        const paths = data.paths;
        const group: PointGroup = new THREE.Group() as PointGroup;

        paths.forEach((path) => {
          const material = new THREE.MeshBasicMaterial({
            color: path.color || 0xffffff,
            side: THREE.DoubleSide,
            depthWrite: false,
          });

          const shapes = SVGLoader.createShapes(path);
          shapes.forEach((shape) => {
            const geometry = new THREE.ShapeGeometry(shape);
            const mesh = new THREE.Mesh(geometry, material);
            group.add(mesh);
          });
        });

        group.position.set(x, y, z);
        group.scale.set(0.0015, 0.0015, 0.0015);

        group.userData.isPoint = true;
        group.userData.update = () => {
          const vector = new THREE.Vector3();
          camera.getWorldPosition(vector);
          group.lookAt(vector);
        };

        resolve(group);
      },
      undefined, // onProgress
      (error) => reject(error)
    );
  });
}

export { addPointOnSphere };
