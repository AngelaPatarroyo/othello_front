# 🎯 Othello Strategy Game

Play the classic board game Othello online! This web-based version supports dynamic board sizes, player token logic, and full game rules using a React frontend and .NET Core backend API.

---

## ✨ Features

- 🔐 **User Authentication**: Users can register, log in, and are authenticated via JWT tokens.
- 🎮 **Game Play**: Create a new game and play turn-by-turn with dynamic rules based on board size.
- 🧠 **Smart Rules Engine**: Validates legal moves, flips opponent tokens, and tracks player turns.
- 📊 **Leaderboard**: Track the most successful players based on wins.
- 🛠️ **Admin Tools**: Admin can view all users and all games played.

---

## 🍍 Tech Stack

- **Frontend**: React, React Router, Tailwind CSS
- **Backend**: [.NET Core API (Othello_API)](https://github.com/AngelaPatarroyo/Othello_API)
- **Frontend Repo**: [othello_front](https://github.com/AngelaPatarroyo/othello_front)
- **Deployment**: Netlify (Frontend), Render (Backend)
- **State Management**: React Context API
- **Routing**: React Router DOM

---

## 🖥️ Live URLs

- 🔗 **Frontend Live**: _Coming Soon or your Netlify URL here_
- 🔗 **Backend Live**: _Coming Soon or your Render URL here_

---

## ⚙️ Installation

To run the project locally:

### 1. Clone the repository
```bash
git clone https://github.com/AngelaPatarroyo/othello_front.git
cd othello_front

npm install

🎲 Game Rules
Black always starts.

8×8 board → each player starts with 32 tokens.
10×10 board → each player starts with 50 tokens.

You can only place a token on an empty tile adjacent to an opponent’s token.

A move is valid only if it creates a straight line (in any direction) with one of your tokens on the other side, flipping all opponent tokens in between.

The goal is to finish the game with more of your color tokens than your opponent.

The game ends when:

A player has no valid moves, or

A player runs out of tokens

src/
├── components/     # Reusable UI components
├── context/        # Auth & API context providers
├── pages/          # Route-level views (Home, Login, Game, etc.)
├── utils/          # Helper functions
├── App.jsx         # Main app layout and routing
└── index.js        # ReactDOM render entry point
