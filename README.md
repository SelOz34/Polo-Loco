# 🐔 El Pollo Loco

A 2D jump-and-run browser game built with **vanilla JavaScript**, **HTML5 Canvas** and **object-oriented programming**, with no frameworks or external libraries.

Help Pepe fight his way through the Mexican desert. Collect coins and salsa bottles, jump on crazy chickens and defeat the giant hen at the end of every level. Between levels, spend your coins in the shop to increase your damage.

---

## 📑 Table of Contents

- [Features](#-features)
- [Controls](#-controls)
- [Gameplay](#-gameplay)
- [Installation & Start](#-installation--start)
- [Project Structure](#-project-structure)
- [Technical Implementation](#-technical-implementation)
- [Configuration](#-configuration)
- [Credits & Acknowledgements](#-credits--acknowledgements)
- [About the Development](#-about-the-development)
- [License](#-license)

---

## ✨ Features

- **5 levels** with increasing difficulty, each defined in its own JavaScript file
- **Shop** after every won level: trade 10 coins for +50 % damage
- **3 enemy types**: chickens, hopping chicks and an endboss with its own behaviour (alert, chase, attack)
- **Fully animated character**: idle, walk, jump, hurt, death, plus a sleep animation after 10 seconds of inactivity
- **Collectables**: coins and bottles that respawn 15 seconds after being collected
- **Throwable bottles** with rotation and splash animation
- **Status bars** for health, coins, bottles and the endboss
- **Background music and 15 sound effects**, with a mute button whose state is saved in local storage
- **Responsive design**: playable on desktop, tablet and smartphone (landscape) with dedicated touch controls
- **Restart without page reload**

---

## 🎮 Controls

| Action | Keyboard | Mobile |
|---|---|---|
| Walk | `←` `→` | Arrow buttons on the left |
| Jump | `Space` or `↑` | Up arrow button |
| Throw bottle | `D` | Bottle button |

Touch controls appear automatically on smartphones and tablets. In portrait mode, a notice asks the player to rotate the device.

---

## 🕹️ Gameplay

### Levels

| Level | Chickens / Chicks | Stomps per enemy | Bottles in level | Bottle hits for the endboss |
|---|---|---|---|---|
| 1 | 6 / 5 | 1 | 12 | 10 |
| 2 | 7 / 6 | 2 | 24 | 20 |
| 3 | 8 / 7 | 3 | 36 | 30 |
| 4 | 9 / 8 | 4 | 48 | 40 |
| 5 | 10 / 9 | 5 | 60 | 50 |

- **Chickens and chicks** are defeated by **jumping on them from above**. A hurt enemy flashes briefly. A **bottle** defeats them instantly.
- **Enemies only start moving** once Pepe gets close, so the player is never overrun at the start.
- The **endboss** wakes up when Pepe approaches, sounds the alarm, then chases and attacks him. It can only be defeated with bottles and gets faster as it loses health.
- **Coins and bottles** reappear at the same spot 15 seconds after being collected.

### Shop

After defeating the endboss in levels 1 to 4, the shop opens:

- **+50 % damage for 10 coins**, can be bought multiple times (100 % → 150 % → 200 % …)
- The damage applies to stomps on chickens and chicks and to bottle hits on the endboss
- Coins and damage are kept for the rest of the game
- **Continue** starts the next level, **Quit game** returns to the start screen

### End of the game

- **Victory**: after defeating the endboss in level 5
- **Game over**: when Pepe's health runs out. The game then starts again at level 1, with no coins and normal damage.

---

## 🚀 Installation & Start

No installation or dependencies are required.

```bash
git clone https://github.com/SelOz34/Polo-Loco.git
cd Polo-Loco
```

Then open `index.html` through a local web server, for example with the VS Code extension **Live Server** (right-click `index.html` → *Open with Live Server*).

> **Note:** Opening the file directly via double-click (`file://`) may cause some browsers to block sounds or images. A local server avoids this.

---

## 📁 Project Structure

```
Polo-Loco/
├── index.html                      # Start page, game container, dialog, shop, end screen
├── impressum.html                  # Legal notice with asset credits
├── script.js                       # Game flow: start, levels, end screen, input
├── style.css                       # Layout, overlays, shop, responsive design
├── README.md
├── .gitignore
├── .gitattributes                  # Consistent line endings (LF)
├── style/
│   ├── standard.css                # CSS reset
│   ├── assets.css                  # Font and colour variables
│   └── impressum.css               # Styles for the legal notice page
├── scripts/
│   ├── shop.js                     # Shop logic (buying damage upgrades)
│   ├── classes/                    # All classes (*.class.js)
│   │   ├── drawable-object.class.js
│   │   ├── movable-object.class.js
│   │   ├── background-object.class.js
│   │   ├── cloud.class.js
│   │   ├── character.class.js
│   │   ├── enemy.class.js
│   │   ├── chicken.class.js
│   │   ├── small-chicken.class.js
│   │   ├── endboss.class.js
│   │   ├── collectable-object.class.js
│   │   ├── coin.class.js
│   │   ├── bottle.class.js
│   │   ├── throwable-object.class.js
│   │   ├── status-bar.class.js
│   │   ├── keyboard.class.js
│   │   ├── sound-manager.class.js
│   │   ├── level.class.js
│   │   └── world.class.js
│   ├── levels/
│   │   ├── level-builder.js        # Shared setup for all levels
│   │   ├── level1.js
│   │   ├── level2.js
│   │   ├── level3.js
│   │   ├── level4.js
│   │   └── level5.js
│   └── templates/
│       └── templates.js            # HTML templates for dynamic content
└── assets/
    ├── img/                        # Graphics, icons and favicon
    ├── audio/                      # Music and sound effects (+ QUELLEN.txt with sources)
    └── fonts/                      # Boogaloo font (+ licence)
```

---

## 🛠️ Technical Implementation

### Class hierarchy

```
DrawableObject
├── BackgroundObject
├── StatusBar
└── MovableObject
    ├── Character
    ├── Cloud
    ├── ThrowableObject
    ├── CollectableObject
    │   ├── Coin
    │   └── Bottle
    └── Enemy
        ├── Chicken
        ├── SmallChicken
        └── Endboss
```

Supporting classes: `World`, `Level`, `Keyboard`, `SoundManager`.

### Key concepts

- **Game loop**: rendering runs via `requestAnimationFrame`; the game logic runs in its own interval at 60 ticks per second.
- **Camera**: the world is shifted with `ctx.translate()`, while status bars stay fixed on screen.
- **Collision detection**: rectangle collision with individual offsets per object, so only the visible part of a sprite counts.
- **Stomp detection**: an enemy only takes damage if Pepe is falling and his feet are in the upper part of the enemy.
- **Stoppable intervals**: all intervals are stored centrally and can be stopped together. This is what makes restarting without a page reload possible.
- **Level factories**: each level file only describes its enemy and bottle positions plus its strength. `level-builder.js` creates the shared parts (background, clouds, coins). A fresh level is built on every start, so no old state is kept.
- **Player progress**: coins and damage are carried from level to level in a `playerProgress` object and reset when a new game starts.
- **Respawning collectables**: collected items are not deleted; they store the time of collection and become visible again after the respawn delay.
- **SoundManager**: central handling of all sounds, including the mute state in local storage.

### Code quality

- Each function has exactly one task and is at most 14 lines long
- At most 400 lines per file
- All functions are documented according to the **JSDoc** standard (verified with the official JSDoc tool and `eslint-plugin-jsdoc`)
- Consistent **camelCase** naming
- No console errors and no `console.log` output
- Static HTML lives in `index.html`; only dynamic content is generated via templates

---

## ⚙️ Configuration

The most important values can be changed in one place:

| Setting | File | Value |
|---|---|---|
| Shop price / damage bonus | `scripts/shop.js` | `shopPrice = 10`, `damageBonus = 0.5` |
| Respawn delay for coins and bottles | `scripts/classes/collectable-object.class.js` | `respawnDelay = 15000` (ms) |
| Time until Pepe falls asleep | `scripts/classes/character.class.js` | `sleepDelay = 10000` (ms) |
| Pause between two throws | `scripts/classes/world.class.js` | `throwCooldown = 600` (ms) |
| Sound volumes | `scripts/classes/sound-manager.class.js` | `SoundManager.volumes` |
| Enemy and bottle positions per level | `scripts/levels/level1.js` … `level5.js` | `chickens`, `chicks`, `bottles` |

---

## 🙏 Credits & Acknowledgements

### Graphics & course

A big thank you to the **developer team and the course** for providing the graphics (character, enemies, backgrounds, status bars, start and end screens) and the project requirements for this game. Without this foundation and the guidance throughout the course, this project would not exist in its current form.

### Music & sound effects

Many thanks to all creators who share their sounds freely under **CC0**:

| Sound | Creator | Source |
|---|---|---|
| Background music "Del Rio Bravo" | Kevin MacLeod | FreePD ([archive](https://web.archive.org/web/2024/https://freepd.com/)), obtained via [CC0-1.0-Music](https://github.com/SoundSafari/CC0-1.0-Music) |
| Jump, bottle pickup | Kenney | [Digital Audio](https://kenney.nl/assets/digital-audio) |
| "You win", "Game over" | Kenney | [Voiceover Pack](https://kenney.nl/assets/voiceover-pack) |
| Coin, shop purchase | rubberduck | [50 CC0 retro / synth SFX](https://opengameart.org/content/50-cc0-retro-synth-sfx) |
| Breaking glass | rubberduck | [75 CC0 breaking / falling / hit sfx](https://opengameart.org/content/75-cc0-breaking-falling-hit-sfx) |
| Snoring | rubberduck | [80 CC0 creature SFX](https://opengameart.org/content/80-cc0-creature-sfx) |
| Pepe hurt | rubberduck | [80 CC0 creature SFX 2](https://opengameart.org/content/80-cc0-creture-sfx-2) |
| Throw | rubberduck | [80 CC0 RPG SFX](https://opengameart.org/content/80-cc0-rpg-sfx) |
| Chickens & endboss | evsecrets | [Freesound](https://freesound.org/people/evsecrets/sounds/346961/) |
| Chicks | AGFX | [Freesound](https://freesound.org/people/AGFX/sounds/43380/) |

A complete list of all sound files and their sources can be found in [`assets/audio/QUELLEN.txt`](assets/audio/QUELLEN.txt).

### Font

[Boogaloo](https://fonts.google.com/specimen/Boogaloo), licensed under the SIL Open Font License (see `assets/fonts/OFL.txt`).

---

## 🤖 About the Development

This project was created with the help and support of **Claude Pro** (Anthropic).

---

## 📄 License

This is a non-commercial learning project. The graphics, sounds and font used are subject to the licences of their respective creators (see [Credits & Acknowledgements](#-credits--acknowledgements)).
