import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSkull,
  FaCheck,
  FaAnchor,
  FaUserNinja,
  FaLightbulb,
} from "react-icons/fa";

import { createPlayer } from "../utils/score";

export default function GameSetup({ players, setPlayers }) {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  function handleStartGame() {
    const hasEmptyName = players.some((player) => player.name.trim() === "");

    if (hasEmptyName) {
      setError("모든 플레이어 이름을 입력해주세요.");
      return;
    }

    const names = players.map((player) => player.name.trim());
    const hasDuplicate = new Set(names).size !== names.length;

    if (hasDuplicate) {
      setError("같은 이름의 해적이 있습니다.");
      return;
    }

    setError("");
    navigate("/prediction");
  }

  function changePlayerCount(newCount) {
    if (newCount < 2 || newCount > 8) return;

    const newPlayers = [...players];

    while (newPlayers.length < newCount) {
      newPlayers.push(createPlayer());
    }

    while (newPlayers.length > newCount) {
      newPlayers.pop();
    }

    setPlayers(newPlayers);
  }

  function changePlayerName(index, value) {
    const newPlayers = [...players];

    newPlayers[index] = {
      ...newPlayers[index],
      name: value,
    };

    setPlayers(newPlayers);
    setError("");
  }

  return (
    <div className="h-full flex flex-col bg-texture px-4 overflow-hidden text-[#e8d5a8]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-8 pb-3">
        <div className="w-8"></div>

        <p className="sekuya-200 text-xs text-[#d09f3d80] text-center"></p>

        <div className="w-8"></div>
      </div>

      {/* Progress */}
      <div className="flex justify-center gap-2 pb-5">
        <div className="progress-dot active"></div>
        <div className="progress-dot"></div>
        <div className="progress-dot"></div>
      </div>

      {/* Title */}
      <div className="flex flex-col items-center px-6 gap-2">
        <h2 className="diphylleia-regular text-3xl font-bold pirate-title">
          🯀 해적단 설정 🯀
        </h2>

        <p className="text-xs text-[#c09244] pt-3">
          해적의 수와 이름을 설정해주세요. (2~8명)
        </p>
      </div>

      {/* Player Count */}
      <div className="mt-8 flex flex-col items-center">
        <p className="text-xs text-[#a89070] mb-3">해적 수</p>

        <div className="flex items-center gap-6">
          <button
            className="number-btn"
            onClick={() => changePlayerCount(players.length - 1)}
          >
            <span className="text-3xl font-cinzel">−</span>
          </button>

          <div className="text-center">
            <p className="sekuya-regular text-4xl pirate-title">
              {players.length}
            </p>
          </div>

          <button
            className="number-btn"
            onClick={() => changePlayerCount(players.length + 1)}
          >
            <span className="text-3xl font-cinzel">+</span>
          </button>
        </div>
      </div>

      {/* Preview */}
      <div className="preview-card mt-8 mx-5 rounded-xl p-4">
        <p className="text-center text-xs text-[#a89070]">선택된 해적단</p>

        <div className="flex justify-center gap-2 flex-wrap mt-4 title-glow">
          {Array.from({ length: 8 }).map((_, index) => (
            <FaUserNinja
              key={index}
              className={`text-xl title-glow ${
                index < players.length ? "text-[#dbaf10]" : "text-[#5a4b35]"
              }`}
            />
          ))}
        </div>

        <p className="text-center mt-3 shojumaru-regular pirate-title">
          {players.length} Pirates
        </p>
      </div>

      {/* Player List */}
      <div className="flex-1 mt-6 px-5 overflow-y-auto space-y-3">
        {players.map((player, index) => (
          <div key={index} className="player-row">
            <div className="player-avatar">
              <FaSkull />
            </div>

            <div className="player-divider"></div>

            <span className="player-num">{index + 1}</span>

            <input
              maxLength={7}
              value={player.name}
              placeholder="해적 이름"
              onChange={(e) => changePlayerName(index, e.target.value)}
              className="name-input"
            />

            <div className="w-5 flex justify-center">
              {player.name.trim() && (
                <FaCheck className="text-[#c9942a] text-xs" />
              )}
            </div>
          </div>
        ))}

        <p className="text-center text-xs text-[#7a5c2a] pt-2">
          <FaLightbulb className="inline mr-1" />
          이름은 최대 7자까지 입력 가능합니다.
        </p>

        {error && <p className="text-center text-red-400 text-sm">{error}</p>}
      </div>

      {/* Footer */}
      <div className="px-5 pt-8 pb-8">
        <div className="rope-divider mb-6"></div>

        <button
          onClick={handleStartGame}
          className="
            pirate-btn
            rounded-xl
            py-4
            w-full
            font-cinzel
            font-bold
            tracking-widest
            text-base
            text-[#4f2d07]
            btn-pirate
          "
        >
          <FaAnchor className="inline mr-2" />
          게임 시작
          <FaAnchor className="inline ml-2" />
        </button>
      </div>
    </div>
  );
}
