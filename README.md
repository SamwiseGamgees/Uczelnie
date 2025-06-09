## 1. Wprowadzenie

* **Cel projektu**: interaktywna wizualizacja globalnej mapy uczelni (100 predefiniowanych + user-added), z systemem logowania, dodawania nowych uczelni i “lajkowania”
* **Technologie**:

  * **Frontend**: React + TypeScript
  * **3D**: Three.js
  * **Stan aplikacji**: Zustand
  * **Backend & Baza**: Supabase
  * **Hosting**: Vercel + GitHub repo (współpraca z kolegą)

---

## 2. Drzewo projektu

__Ilość lini kodu w `./src/`__ - __3512__

```
📦 Uczelnie
├─ .gitignore
├─ README.md
├─ countries
│  ├─ geogrid.tsx
│  ├─ geopoints.tsx
│  └─ threeGeoJSON.tsx
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  ├─ countries
│  │  └─ countries.json
│  ├─ media
│  │  ├─ Uczelnie.svg
│  │  ├─ dot.png
│  │  ├─ envelope.png
│  │  ├─ favicon.ico
│  │  ├─ google.png
│  │  ├─ password-lock.png
│  │  ├─ plus.svg
│  │  ├─ user.png
│  │  └─ x.png
│  └─ vite.svg
├─ src
│  ├─ App.tsx
│  ├─ components
│  │  ├─ AddUni
│  │  │  ├─ AddUni.tsx
│  │  │  └─ AddUniForm
│  │  │     ├─ AddUniForm.css
│  │  │     └─ AddUniForm.tsx
│  │  ├─ CheckEmail
│  │  │  ├─ CheckEmail.css
│  │  │  └─ CheckEmail.tsx
│  │  ├─ FavouriteUnis
│  │  │  ├─ FauriteUnis.css
│  │  │  └─ FavouriteUnis.tsx
│  │  ├─ Frame
│  │  │  ├─ Frame.css
│  │  │  └─ Frame.tsx
│  │  ├─ GlobeScene
│  │  │  ├─ GlobeScene.css
│  │  │  └─ GlobeScene.tsx
│  │  ├─ Intro
│  │  │  ├─ Authors
│  │  │  │  ├─ Authors.css
│  │  │  │  └─ Authors.tsx
│  │  │  ├─ DrawTitle
│  │  │  │  ├─ DrawTitle.css
│  │  │  │  └─ DrawTitle.tsx
│  │  │  ├─ Intro.css
│  │  │  └─ Intro.tsx
│  │  ├─ LockIcon
│  │  │  ├─ LockIcon.css
│  │  │  └─ LockIcon.tsx
│  │  ├─ Login
│  │  │  ├─ Login.css
│  │  │  └─ Login.tsx
│  │  ├─ Menu
│  │  │  ├─ Menu.css
│  │  │  ├─ Menu.tsx
│  │  │  └─ MenuButton
│  │  │     ├─ MenuButton.css
│  │  │     └─ MenuButton.tsx
│  │  ├─ NotFound
│  │  │  ├─ NotFound.css
│  │  │  └─ NotFound.tsx
│  │  ├─ ResetPassword
│  │  │  ├─ ForgotPassword.css
│  │  │  ├─ ForgotPassword.tsx
│  │  │  └─ ResetPassword.tsx
│  │  ├─ StopButton
│  │  │  ├─ StopButton.css
│  │  │  └─ StopButton.tsx
│  │  ├─ UniDesc
│  │  │  ├─ UniDesc.css
│  │  │  ├─ UniDesc.tsx
│  │  │  ├─ trial.css
│  │  │  └─ trial.html
│  │  ├─ UniFrame
│  │  │  ├─ LikeButton
│  │  │  │  ├─ LikeButton.css
│  │  │  │  └─ LikeButton.tsx
│  │  │  ├─ UniFrame.css
│  │  │  ├─ UniFrame.tsx
│  │  │  ├─ UniFrameContent
│  │  │  │  ├─ UniFrameContent.css
│  │  │  │  ├─ UniFrameContent.tsx
│  │  │  │  └─ uniInfo.ts
│  │  │  └─ UniFrameImg.tsx
│  │  └─ UserProfileInfo
│  │     ├─ AddImage.tsx
│  │     ├─ LikeImage.tsx
│  │     ├─ UserProfileFrame.css
│  │     ├─ UserProfileFrame.tsx
│  │     └─ UserProfileInfoImg.tsx
│  ├─ config
│  │  ├─ isLoggedIn.tsx
│  │  ├─ loggedUser.tsx
│  │  └─ supabaseClient.ts
│  ├─ index.css
│  ├─ kula
│  │  ├─ addingPoints.ts
│  │  ├─ animation.ts
│  │  ├─ globe.ts
│  │  ├─ interactions.ts
│  │  ├─ main.ts
│  │  └─ sceneSetup.ts
│  ├─ main.tsx
│  ├─ types
│  │  ├─ points.d.ts
│  │  ├─ three-lines.d.ts
│  │  └─ uniInfoPromise.d.ts
│  ├─ vite-env.d.ts
│  └─ zustand
│     ├─ manageButtonState.ts
│     ├─ useAuthStore.ts
│     └─ useHoverStore.ts
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts
```

---

## 3. Baza danych (Supabase)

1. **Tabela `uczelnie`** – domyślne 100 rekordów, relacja _1 to 1_ z `opisy` (primary key to foreign key)

   * WorldRank (PK), University, Country, NationalRank, Score, Latitude, Longitude
     
2. **Tabela `nowe_uczelnie`** – dodane przez użytkowników

   * id (PK), created\_at  (timestamp), University, Country, Latitude, Longitude, Description, Author
  
3. **Tabela `ulubione`** – relacja user_id ↔ autoryzowani użytkownicy

   * id, created\_at, user\_id, uni\_name, is\_new (czy user-added)
     
4. **Tabela `opisy`** – opisy uczelni "wbudowanych"

   * world\_rank (FK), description
  
![image](https://github.com/user-attachments/assets/1f1857fb-1dff-4805-bb02-5ed18ad0e9a1)


**Auth**:

* Supabase Auth (email + hasło, Google OAuth)
* Funkcje do resetowania hasła i weryfikacji e-mail

_przykład tabeli users:_
![image](https://github.com/user-attachments/assets/1a4b1cdc-94c8-471e-b72b-f7eb0801dd92)


---

## 4. Kluczowe funkcjonalności

### 4.1 Home

* Animowany tytuł i autorzy
* Glob nad napisem:

  * Po kliknięciu globu / wybraniu zakładki “Globe” – animowane przybliżenie i znikanie tekstu

### 4.2 Globe View

* **Rendering 3D**: Three.js + React → osobne moduły w `src/kula/`
* **Punkty uczelni**:

  * Importowane z bazy danych,
  * Pulsacja punktów,
  * Tooltip przy najechaniu na punkt (płynna animacja scale), użycie __Raycasting__ oraz __Zustand__

* __Info o uczelni:__
  * Ramka z informacjami o uczelni,
  * Opcja _like_,
  * Różne pola dla domyślnych (tabela uczelnie) vs. user-added (tabela nowe_uczelnie),
  * Import informacji z bazy danych - __SupaBase connection__

* **Siatka kartograficzna**:

  * Generowana matematycznie (sinus, cosinus) w `geogrid.tsx`
 
* **Interakcje**:

  * Raycasting → zmiana kursora (grab → grabbing),
  * Scroll = zoom,
  * Drag = obracanie (quaterniony, by uniknąć pułapki _gimbal lock_)

### 4.3 Profil & Auth

* Rejestracja / login / reset hasła (Supabase Auth)
* **Po zalogowaniu**:

  * Dodawanie uczelni (formularz w `AddUni`),
  * Przeglądanie ulubionych

---

## 5. Design i UX

* **Minimalistyczny, monokolor**: czarne elementy na białym tle, cienkie ramki

  * Podkreślenie naukowego, “bezpretensjonalnego” charakteru projektu
 
* Inspiracje:

  * https://synchronized.studio/
  * https://www.theastralfrontier.com/

---

## 6. Narzędzia i workflow: opis

* **TypeScript** – pełne typowanie komponentów i danych (JavaScript na sterydach)

  * Czytelność kodu,
  * Wykrywanie błędów na poziomie pisania

* **Zustand** – lekki store:

  * Auth (informacje o zalogowanym użytkowniku), 
  * Hover (koordynaty ekranowe tooltipa), 
  * Select (przekazuje informacje jaka uczelnia jest kliknięta, co ma być pobrane z bazy),
  * Użycie przycisków (home, globe, profile)

* **Three.js** – rendering:

  * Model 3D kuli,
  * Matematyczna siatka kartograficzna,
  * Rysowanie linii państw,
  * Pulsujące punkty + przechowywanie informacji o nich w `userData`,
  * Mechanika interakcji: uniknięcie pułapki _gimbal lock_ dzięki quaternionom, interakcja z modelem 3D na ekranie 2D dzięki metodzie _raycasting_,
  * Renderowanie sceny: oświetlenie, modele 3D, kamera

* **Supabase** – baza, auth:

  * Przechowywanie danych o uczelniach, użytkownikach,
  * Bezpieczne, szyfrowane logowanie,
  * Tworzenie kont bądź logowanie przez google

* **Vercel + GitHub** – hosting frontendu, CI/CD, współpraca zespołowa: 

  * Równoczesna praca na różnych urządzeniach,
  * Automatyzacja procesu deployowania strony

* **VSCode + ESLint + Prettier** – linter, formatowanie
* **NPM scripts** - potrzebne do zastosowania większości powyższych technologii
* **Environment variables** - dla zwiększenia bezpieczeństwa

---

## 7. Trudności i nauka

* Nauka nowych technologii (wszystkie wymienione w punkcie 6, nie mieliśmy z nimi wcześniej do czynienia, nie licząc VSCode)
* Matematyka do siatki kartograficznej
* Pełen full-stack: React ↔ Supabase
* Współpraca na GitHub + deploy na Vercel

---

## 8. Podsumowanie czasu pracy

* **\~160 h** wspólnej pracy w 3D, TS, Supabase, design
* Rezultat: wydajna, interaktywna aplikacja z zaawansowanymi funkcjami
