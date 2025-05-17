import * as THREE from "three";
import { useHoverStore } from "../src/zustand/useHoverStore";

// Typ dla grupy punktu z metodą update i flagą isPoint
type PointGroup = THREE.Group & {
  userData: {
    isPoint: boolean;
    desc?: string;
    update: () => void;
  };
};

function addPointOnSphere(
  lat: number,
  lon: number,
  radius: number = 1
): PointGroup {
  const latitude  = THREE.MathUtils.degToRad(lat);
  const longitude = THREE.MathUtils.degToRad(lon);

  const x = radius * Math.cos(latitude) * Math.cos(longitude);
  const y = radius * Math.sin(latitude);
  const z = radius * Math.cos(latitude) * Math.sin(longitude) + 0.001;

  const size = 1.1;
  const group = new THREE.Group() as PointGroup;
  group.position.set(x, y, z);
  group.userData.isPoint = true;

  // --- główna kropka ---
  const texture   = new THREE.TextureLoader().load("../src/media/dot.png");
  const planeMat  = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
    color: 0xffffff,
    opacity: 0.8,
  });
  const planeGeo = new THREE.PlaneGeometry(0.02 * size, 0.02 * size);
  const plane    = new THREE.Mesh(planeGeo, planeMat);
  plane.lookAt(group.position.clone().multiplyScalar(2));
  group.add(plane);

  // --- opcjonalny glow za punktem ---
  const glowMat = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
    color: 0xffffff,
    opacity: 0.2,
  });
  const glow = new THREE.Mesh(
    new THREE.PlaneGeometry(0.04 * size, 0.04 * size),
    glowMat
  );
  glow.lookAt(group.position.clone().multiplyScalar(2));
  group.add(glow);

  // --- ustawienia pierścienia (ukryty domyślnie, zero skali i przezroczysty) ---
  const innerR    = 0.005 * size;
  const thickness = 0.0013;
  const segments  = 64;
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0x000000,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0, // start transparent
    depthWrite: false,
  });
  const ringGeo = new THREE.RingGeometry(innerR, innerR + thickness, segments);
  const ring    = new THREE.Mesh(ringGeo, ringMat);
  ring.lookAt(group.position.clone().multiplyScalar(2));
  ring.scale.set(0, 0, 1); // start scaled down
  group.add(ring);

  // --- funkcja update wywoływana w pętli animacji ---
  let currentScale = 1;
  let currentOpacity = 0.8;
  const animation_speed = 0.08;
  group.userData.update = () => {
    const hovered    = useHoverStore.getState().hoveredName;
    const isHovered  = hovered === group.userData.desc;

    // animacja pojawiania/ukrywania pierścienia
    const targetRingOpacity = isHovered ? 1 : 0;
    ring.material.opacity += (targetRingOpacity - ring.material.opacity) * animation_speed;

    const targetRingScale = isHovered ? 1 : 0;
    ring.scale.x += (targetRingScale - ring.scale.x) * animation_speed;
    ring.scale.y += (targetRingScale - ring.scale.y) * animation_speed;

    const t = performance.now() * 0.002;

    const targetScale = isHovered ? 1.4 : 1 + 0.1 * Math.sin(t);
    currentScale += (targetScale - currentScale) * animation_speed;
    plane.scale.set(currentScale, currentScale, 1);
    glow.scale.set(currentScale, currentScale, 1);
    
    const targetOpacity = isHovered ? 1 : 0.8 + 0.2 * Math.sin(t);
    currentOpacity += (targetOpacity - currentOpacity) * animation_speed;
    plane.material.opacity = currentOpacity;

    
  };

  return group;
}

export { addPointOnSphere };
