# Battleship Game

A modern browser-based implementation of the classic Battleship game built using JavaScript modules and Webpack. This project focuses on interactive gameplay, modular architecture, and deployment using GitHub Pages.

---

## Live Demo

👉 Live Site: https://Poison-Iveey.github.io/battleship-game/

---

## Features

- Classic Battleship gameplay (Player vs Computer)
- Interactive grid-based UI
- Sound effects for hits, misses, sinking ships, win/loss
- Responsive game state updates
- Modular JavaScript architecture
- Webpack bundling for optimized production builds
- GitHub Pages deployment

---

##  Technologies Used

- **JavaScript (ES6 Modules)**
- **HTML5 & CSS3**
- **Webpack** (module bundler)
- **npm** (package management)
- **gh-pages** (deployment tool)
- Audio APIs for sound effects

---

## 🎮 How to Play

1. Start the game in your browser using the live link.
2. Select difficulty level.
3. Click on the enemy grid to attack coordinates.
4. The computer responds with its own moves.
5. Hits, misses, and sunk ships are visually and audibly indicated.
6. First player to sink all enemy ships wins the game.

---

##  Project Architecture

This project follows a modular structure:

- `src/modules/` – Core game logic (ships, gameboard, player, AI logic)
- `src/index.js` – Entry point
- `src/template.html` – Base HTML template
- `dist/` – Production build output

Webpack handles bundling and asset optimization.

---

##  Key Technical Challenges Solved

### 1. GitHub Pages 404 Issue
- Fixed incorrect deployment path and missing `index.html` in `dist`
- Ensured correct `publicPath: '/battleship-game/'` in Webpack config
- Verified correct branch deployment using `gh-pages`

### 2. Asset & Build Issues
- Resolved sound mismatches (hit/sunk audio overlap)
- Fixed module bundling issues with Webpack
- Ensured clean build output using `clean: true`

### 3. Deployment Pipeline
- Configured `npm run deploy` using `gh-pages -d dist`
- Automated build before deployment

---

## 📱 Future Improvements

-  Deploy backend version on **Microsoft Azure**
-  Convert into a mobile app for **Google Play Store**
-  Using Capacitor or React Native wrapper
-  Improve mobile responsiveness (touch-friendly grid UI)
-  Smarter AI opponent (difficulty levels)
-  Enhanced UI/UX animations and transitions
-  Improved sound system with volume controls
-  Save game state (local storage or backend sync)

---

##  Screenshots

<img width="1366" height="768" alt="Screenshot from 2026-06-04 13-10-09" src="https://github.com/user-attachments/assets/928ed106-ff19-4845-a4c4-09458152bb7b" />



