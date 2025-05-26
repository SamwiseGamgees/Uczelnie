import { useEffect, useRef } from 'react';
import './GlobeScene.css'

// importy funkcji z Twoich plików
import { scene, camera, renderer } from '../../kula/sceneSetup';
import { globe, initGlobe, loadCountries, pointsGroup } from '../../kula/globe';
// import { initTouchEvents } from '../../kula/touchEvents';
import { initInteractions } from '../../kula/interactions';
import { startAnimationLoop } from '../../kula/animation';
import { addPoints } from '../../kula/addingPoints';

interface GlobeSceneProps {
    className?: string;
  }

const GlobeScene: React.FC<GlobeSceneProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // inicjalizacja sceny
    // initTouchEvents();
    const init = async () => {
      if (!globe.userData.initialized) {
        initGlobe();
        await loadCountries();
        globe.userData.initialized = true;
      }

      const points = await addPoints();

      if (!scene.children.includes(globe)) {
        scene.add(globe);
        globe.position.set(0, 3, 0);
      }
      initInteractions(camera, globe);
      startAnimationLoop(scene, camera, renderer, globe, points);

    if (!containerRef.current!.contains(renderer.domElement)) {
      containerRef.current!.appendChild(renderer.domElement);
    }
  };
  init();

    return () => {
      if (renderer.domElement && containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} style={{ width: '50%', height: '50%' }} className={className}/>;
};

export default GlobeScene;
