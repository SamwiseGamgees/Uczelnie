import { scene, camera, renderer } from './sceneSetup';
import { globe, initGlobe, loadCountries, pointsGroup } from './globe';
import { initTouchEvents } from './touchEvents';
import { initInteractions } from './interactions';
import { startAnimationLoop } from './animation';
import { addPoints } from './addingPoints';

// Inicjalizacja dotyku
initTouchEvents();

// Tworzenie globusa
initGlobe();

// Wczytywanie krajów (asynchronicznie)
loadCountries();

// Dodanie punktu na globusie (przykładowe współrzędne)
const points = addPoints();

// Dodaj globusa do sceny
scene.add(globe);

// Inicjalizacja interakcji (przekazujemy kamerę i globus)
initInteractions(camera, globe);
// Uruchomienie głównej pętli animacji
startAnimationLoop(scene, camera, renderer, globe, points);

// Debug/log
console.log(pointsGroup);
