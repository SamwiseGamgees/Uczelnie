import * as THREE from "three";
import { gsap } from "gsap";
import { pointsGroup } from "./globe";
import { useHoverStore } from "../zustand/useHoverStore";
import { manageButtonState } from "../zustand/manageButtonState";
import { camera, renderer } from "./sceneSetup";

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
function handlePointHover(
  name: string | null,
  x: number | null,
  y: number | null
) {
  const setHoveredName = useHoverStore.getState().setHoveredName;
  setHoveredName(name, x, y);
}
function handlePointClick(name: string | null) {
  const setClickedName = useHoverStore.getState().setClickedName;
  setClickedName(name);
}
let clickRequested = false;
window.addEventListener("click", () => {
  if(useHoverStore.getState().hoveredName){
    clickRequested = true;
  }
});

function initInteractions(
  camera: THREE.PerspectiveCamera,
  globe: GlobeWithUserData
): void {
  const mouse = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();

  const convertMouse = (event: MouseEvent) => ({
    x: (event.clientX / window.innerWidth) * 2 - 1,
    y: -(event.clientY / window.innerHeight) * 2 + 1,
  });

  let isDragging = false;
  let lastEvent: MouseEvent | null = null;
  let isTouchingGlobe = false;

  window.addEventListener("mousedown", (event: MouseEvent) => {
    isDragging = true;
    lastEvent = event;
    const mousePos = convertMouse(event);
    mouse.set(mousePos.x, mousePos.y);
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObject(globe.children[0], true);
    if (intersects.length > 0) {
      isTouchingGlobe = true;
      document.body.style.cursor = "grabbing";
    }
  });

  window.addEventListener("mouseup", () => {
    isDragging = false;
    isTouchingGlobe = false;
    document.body.style.cursor = "grab";
    if (!isAnimating) {
      globe.userData.autoRotate = true;
    }
  });

  let mousePos: { x: number; y: number } = { x: 0, y: 0 };
  window.addEventListener("mousemove", (event: MouseEvent) => {
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
    mousePos = convertMouse(event);
  });
  // koordynaty punktu
  function getScreenCoords(
    object3D: THREE.Object3D,
    camera: THREE.Camera,
    renderer: THREE.WebGLRenderer
  ) {
    const vector = new THREE.Vector3();
    vector.copy(object3D.getWorldPosition(new THREE.Vector3()));
    vector.project(camera); // przekształcenie do przestrzeni NDC (od -1 do 1)

    const widthHalf = renderer.domElement.clientWidth / 2;
    const heightHalf = renderer.domElement.clientHeight / 2;

    const x = vector.x * widthHalf + widthHalf;
    const y = -vector.y * heightHalf + heightHalf;

    return { x, y };
  }

  function pointInteraction() {
    requestAnimationFrame(pointInteraction);
    if (!globe.userData.small) {
      mouse.set(mousePos.x, mousePos.y);
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObject(globe.children[0], true);
      document.body.style.cursor =
        intersects.length > 0 ? (isDragging ? "grabbing" : "grab") : "default";

      const touchingPoints = raycaster.intersectObjects(pointsGroup, true);
      if (touchingPoints.length > 0) {
        const point = touchingPoints[0].object.parent;
        if (point?.userData?.desc) {
          document.body.style.cursor = "pointer";
          const name = point.userData.desc;
          const screenPos = getScreenCoords(point, camera, renderer);
          handlePointHover(name, screenPos.x, screenPos.y);
          globe.userData.autoRotate = false;
          if (clickRequested) {
            handlePointClick(name);
            clickRequested = false;
          }
        }
      } else {
        handlePointHover(null, null, null);
        globe.userData.autoRotate = !isDragging;
      }
    }
  }
  pointInteraction();
  window.addEventListener("wheel", (event: WheelEvent) => {
    if (!globe.userData.small) {
      const newZ = globe.position.z + (event.deltaY < 0 ? 0.1 : -0.1);
      if (newZ >= 7.5 && newZ <= 8.5) {
        gsap.to(globe.position, {
          z: newZ,
          duration: 0.2,
          ease: "power2.out",
        });
      }
    }
  });

  if (globe.userData.autoRotate) {
    window.addEventListener("mousedown", (event: MouseEvent) => {
      const mousePos = convertMouse(event);
      mouse.set(mousePos.x, mousePos.y);
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObject(globe.children[0], true);

      if (intersects.length > 0 && globe.userData.small) {
        manageButtonState.getState().setButtonClicked("globe");
      }
    });
  }
  manageButtonState.subscribe((state) => {
    if (state.buttonClicked === "globe" && globe.userData.autoRotate) {
      setTimeout(() => {
        isAnimating = true;
        globe.userData.autoRotate = false;

        gsap.to(globe.position, {
          z: 8,
          y: 0,
          duration: 2,
          ease: "power2.out",
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
      }, 1500);
    } else if (state.buttonClicked === "home" && !globe.userData.small) {
      isAnimating = true;
      globe.userData.autoRotate = false;

      gsap.to(globe.position, {
        z: 0,
        y: 3,
        duration: 2,
        ease: "power2.out",
      });
      gsap.to(globe.rotation, {
        x: 0,
        z: 0,
        duration: 2,
        ease: "power2.out",
      });
      gsap.to(globe.rotation, {
        duration: 2,
        y: Math.PI * 2,
        onComplete: () => {
          globe.userData.autoRotate = true;
          globe.userData.small = true;
          isAnimating = false;
        },
      });
    }
  });
}

export { initInteractions };
