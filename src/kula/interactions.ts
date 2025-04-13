import * as THREE from 'three';
import { gsap } from 'gsap';
import { pointsGroup } from './globe';
import { useHoverStore } from '../zustand/useHoverStore';

// Typowanie dla obiektu globusa z userData
interface GlobeWithUserData extends THREE.Object3D {
  userData: {
    autoRotate: boolean;
    small?: boolean;
    [key: string]: any; // dla dowolnych danych użytkownika
  };
} 
let isAnimating = false; //sprawdza czy jest animacja 

// do przesylu informacji o punkcie
function handlePointHover(name: string | null){
  const setHoveredName = useHoverStore.getState().setHoveredName;
  setHoveredName(name);
};

function initInteractions(camera: THREE.PerspectiveCamera, globe: GlobeWithUserData): void {
  const mouse = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();

  const convertMouse = (event: MouseEvent) => ({
    x: (event.clientX / window.innerWidth) * 2 - 1,
    y: -(event.clientY / window.innerHeight) * 2 + 1,
  });

  let isDragging = false;
  let lastEvent: MouseEvent | null = null;
  let isTouchingGlobe = false;

  window.addEventListener('mousedown', (event: MouseEvent) => {
    isDragging = true;
    lastEvent = event;
    const mousePos = convertMouse(event);
    mouse.set(mousePos.x, mousePos.y);
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObject(globe.children[0], true);
    if (intersects.length > 0) {
      isTouchingGlobe = true;
      document.body.style.cursor = 'grabbing';
    }
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
    isTouchingGlobe = false;
    document.body.style.cursor = 'grab';
    if (!isAnimating) {
      globe.userData.autoRotate = true;
    }
  });





  window.addEventListener('mousemove', (event: MouseEvent) => {
    if (isDragging && isTouchingGlobe && lastEvent && !globe.userData.small) {
      globe.userData.autoRotate = false;

      const currentMouse = convertMouse(event);
      const previousMouse = convertMouse(lastEvent);

      const xMove = currentMouse.x - previousMouse.x;
      const yMove = previousMouse.y - currentMouse.y;

      const xQuaternion = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(1, 0, 0),
        yMove
      );
      const yQuaternion = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(0, 1, 0),
        xMove
      );

      globe.quaternion.multiplyQuaternions(xQuaternion, globe.quaternion);
      globe.quaternion.multiplyQuaternions(yQuaternion, globe.quaternion);

      lastEvent = event;
    }

    if (globe.userData.autoRotate) {
      const mousePos = convertMouse(event);
      mouse.set(mousePos.x, mousePos.y);
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObject(globe.children[0], true);
      document.body.style.cursor = intersects.length > 0 ? (isDragging ? 'grabbing' : 'grab') : 'default';

      const touchingPoints = raycaster.intersectObjects(pointsGroup, true);
      if (touchingPoints.length > 0) {
        const point = touchingPoints[0].object.parent;
        if (point?.userData?.desc) {
          document.body.style.cursor = 'pointer';
          const name = point.userData.desc;
          handlePointHover(name);
        }
      }
      else {
        handlePointHover(null);
      }
    }
  });

  window.addEventListener('wheel', (event: WheelEvent) => {
    if (!globe.userData.small) {
      const newZ = globe.position.z + (event.deltaY < 0 ? 0.1 : -0.1);
      if (newZ >= 7.5 && newZ <= 8.5) {
        gsap.to(globe.position, {
          z: newZ,
          duration: 0.2,
          ease: 'power2.out',
        });
      }
    }
  });

  if (globe.userData.autoRotate) {
    window.addEventListener(
      'mousedown',
      (event: MouseEvent) => {
        const mousePos = convertMouse(event);
        mouse.set(mousePos.x, mousePos.y);
        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObject(globe.children[0], true);

        if (intersects.length > 0) {
          isAnimating = true;
          globe.userData.autoRotate = false;
          
          gsap.to(globe.position, {
            z: 8,
            y: 0,
            duration: 2,
            ease: 'power2.out',
          });

          gsap.to(globe.rotation, {
            duration: 2,
            y: Math.PI * 2,
            onComplete: () => {
              globe.userData.autoRotate = true;
              globe.userData.small = false;
              isAnimating = false;
            },
          });
        }
      },
      { once: true }
    );
  }
}

export { initInteractions };
