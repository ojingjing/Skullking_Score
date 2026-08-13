import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Start from "./pages/Start";
import Result from "./pages/Result";
import GameSetup from "./pages/GameSetUp";
import Prediction from "./pages/Prediction";
import RoundResult from "./pages/RoundResult";
import Bonus from "./pages/Bonus";
import FinalResult from "./pages/FinalResult";

import { createPlayer } from "./utils/score";

function App() {
  const [round, setRound] = useState(1);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const savedPlayers = localStorage.getItem("players");

  const [players, setPlayers] = useState(() => {
    if (savedPlayers) {
      return JSON.parse(savedPlayers);
    }

    return Array.from({ length: 2 }, createPlayer);
  });

  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);

  return (
    <BrowserRouter>
      <div className="min-h-[100dvh] w-full bg-texture text-white">
        <div className="mx-auto w-full max-w-md">
          <Routes>
            <Route path="/" element={<Navigate to="/start" replace />} />

            <Route path="/start" element={<Start />} />

            <Route
              path="/setup"
              element={<GameSetup players={players} setPlayers={setPlayers} />}
            />

            <Route
              path="/prediction"
              element={
                <Prediction
                  players={players}
                  setPlayers={setPlayers}
                  round={round}
                />
              }
            />

            <Route
              path="/round-result"
              element={
                <RoundResult
                  players={players}
                  setPlayers={setPlayers}
                  round={round}
                />
              }
            />

            <Route
              path="/result"
              element={
                <Result
                  players={players}
                  setPlayers={setPlayers}
                  round={round}
                  setRound={setRound}
                  setSelectedPlayer={setSelectedPlayer}
                />
              }
            />

            <Route
              path="/bonus"
              element={
                <Bonus
                  players={players}
                  setPlayers={setPlayers}
                  selectedPlayer={selectedPlayer}
                />
              }
            />

            <Route
              path="/final"
              element={
                <FinalResult
                  players={players}
                  setPlayers={setPlayers}
                  setRound={setRound}
                  round={round}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
