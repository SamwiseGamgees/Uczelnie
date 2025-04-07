// App.tsx
import { useEffect } from 'react';
import { scene, camera, renderer } from './sceneSetup';
import { globe, initGlobe, loadCountries, pointsGroup } from './globe';
import { initTouchEvents } from './touchEvents';
import { initInteractions } from './interactions';
import { startAnimationLoop } from './animation';
import { addPoints } from './addingPoints';

const App = () => {
  useEffect(() => {
    // Inicjalizacja dotyku
    initTouchEvents();

    // Tworzenie globusa
    initGlobe();

    // Wczytywanie krajów
    loadCountries();

    // Dodanie punktów
    const points = addPoints();

    // Dodaj globusa do sceny
    scene.add(globe);

    // Inicjalizacja interakcji
    initInteractions(camera, globe);

    // Uruchom animację
    startAnimationLoop(scene, camera, renderer, globe, points);

    console.log(pointsGroup);
  }, []);

  return <div ref={(el) => el?.appendChild(renderer.domElement)} />;
};

export default App;
