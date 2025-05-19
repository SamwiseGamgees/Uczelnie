import { scene, camera, renderer } from './sceneSetup';
import { globe, initGlobe, loadCountries, pointsGroup } from './globe';
// import { initTouchEvents } from './touchEvents';
import { initInteractions } from './interactions';
import { startAnimationLoop } from './animation';
import { addPoints } from './addingPoints';

async function init() {
    // initTouchEvents();
    initGlobe();
    loadCountries();
  
    const points = await addPoints(); // ⏳ poczekaj na dane
  
    scene.add(globe);
    initInteractions(camera, globe);
    startAnimationLoop(scene, camera, renderer, globe, points);
  
  }
  
  init(); // <- uruchom funkcję
  
