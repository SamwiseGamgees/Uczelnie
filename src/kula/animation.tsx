import * as THREE from 'three';

// Typowanie dla obiektów z userData
interface GlobeWithUserData extends THREE.Object3D {
  userData: {
    autoRotate: boolean;
    small: boolean;
    [key: string]: any;
  };
}

interface PointWithUpdate extends THREE.Object3D {
  userData: {
    isPoint?: boolean;
    update?: () => void;
    [key: string]: any;
  };
}

const globalYAxis = new THREE.Vector3(0, 1, 0);

function startAnimationLoop(
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer,
  globe: GlobeWithUserData,
  point: PointWithUpdate[] // jeśli używasz tablicy punktów (jak `addPoints()`), zmień nazwę na `points`
): void {
  function animate(): void {
    requestAnimationFrame(animate);

    // Automatyczny obrót globusa
    if (globe.userData.autoRotate && globe.userData.small) {
      globe.rotation.y += 0.01;
    }

    if (globe.userData.autoRotate && !globe.userData.small) {
      globe.rotateOnAxis(globalYAxis, 0.001);
    }

    // Aktualizacja pozycji punktów (np. zwróconych przez addPoints)
    globe.children.forEach((child) => {
      const childWithUserData = child as PointWithUpdate;
      if (childWithUserData.userData.isPoint && childWithUserData.userData.update) {
        childWithUserData.userData.update();
      }
    });

    renderer.render(scene, camera);
  }

  animate();
}

export { startAnimationLoop };
