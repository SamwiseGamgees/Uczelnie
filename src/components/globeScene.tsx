import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// importy funkcji z Twoich plików
import { scene, camera, renderer } from '../kula/sceneSetup';
import { globe, initGlobe, loadCountries, pointsGroup } from '../kula/globe';
import { initTouchEvents } from '../kula/touchEvents';
import { initInteractions } from '../kula/interactions';
import { startAnimationLoop } from '../kula/animation';
import { addPoints } from '../kula/addingPoints';

const GlobeScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // inicjalizacja sceny
    initTouchEvents();
    initGlobe();
    loadCountries();

    // ładowanie punktów
    addPoints().then(points => {
      console.log('Załadowane punkty:', points);

      // dodaj globusa do sceny
      scene.add(globe);

      // interakcje i animacja
      initInteractions(camera, globe);
      startAnimationLoop(scene, camera, renderer, globe, points);

      // render
      containerRef.current!.appendChild(renderer.domElement);
    });

    return () => {
      if (renderer.domElement && containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
};

export default GlobeScene;
