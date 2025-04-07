// sceneSetup.ts
import * as THREE from 'three';

export const scene: THREE.Scene = new THREE.Scene();

export const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 10;

export const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Nie dodajemy renderer.domElement do DOM tutaj – zrobisz to w App.tsx

// Reagujemy na zmianę rozmiaru okna
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
