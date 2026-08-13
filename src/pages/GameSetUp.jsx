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

export default function GameSetUp({ players, setPlayers }) {
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
    <div className="game-page min-h-[100dvh] flex flex-col bg-texture px-3 sm:px-4 text-[#e8d5a8]">
      {/* HEADER */}
      <div className="flex items-center px-3 sm:px-5">
        <div className="w-8 shrink-0" />

        <div className="flex-1 min-w-0 text-center">
          <p className="sekuya-200 text-xs text-[#d09f3d80]"></p>
        </div>

        <div className="w-8 shrink-0" />
      </div>

      {/* PROGRESS */}
      <div className="game-progress flex justify-center gap-2 pb-3 sm:pb-5">
        <div className="progress-dot active"></div>
        <div className="progress-dot"></div>
        <div className="progress-dot"></div>
      </div>

      {/* TITLE */}
      <div className="px-3 sm:px-6 text-center">
        <h2 className="diphylleia-regular text-2xl sm:text-3xl font-bold pirate-title whitespace-nowrap">
          🔸 해적단 설정 🔸
        </h2>

        <p className="text-[11px] sm:text-xs text-[#c09244] mt-1">
          해적의 수와 이름을 설정해주세요. (2~8명)
        </p>
      </div>

      {/* PLAYER COUNT */}
      <div className="mt-4 sm:mt-6 flex flex-col items-center">
        <p className="text-xs text-[#a89070] mb-2 sm:mb-3">해적 수</p>

        <div className="flex items-center gap-4 sm:gap-6">
          <button
            className="number-btn"
            onClick={() => changePlayerCount(players.length - 1)}
          >
            <span className="text-2xl sm:text-3xl font-cinzel">−</span>
          </button>

          <div className="text-center">
            <p className="sekuya-regular text-3xl sm:text-4xl pirate-title">
              {players.length}
            </p>
          </div>

          <button
            className="number-btn"
            onClick={() => changePlayerCount(players.length + 1)}
          >
            <span className="text-2xl sm:text-3xl font-cinzel">+</span>
          </button>
        </div>
      </div>

      {/* SELECTED PIRATES */}
      <div className="w-full px-2 sm:px-5 mt-4 sm:mt-5">
        <div className="preview-card w-full min-w-0 rounded-xl px-3 sm:px-5 py-3 sm:py-4">
          <p className="text-center text-xs text-[#a89070]">선택된 해적단</p>

          <div className="flex justify-center items-center gap-2 flex-wrap mt-2 sm:mt-3">
            {Array.from({ length: 8 }).map((_, index) => (
              <FaUserNinja
                key={index}
                className={`
                  text-lg
                  sm:text-xl
                  ${
                    index < players.length ? "text-[#dbaf10]" : "text-[#5a4b35]"
                  }
                `}
              />
            ))}
          </div>

          <p className="text-center mt-2 sm:mt-3 shojumaru-regular pirate-title text-lg sm:text-xl">
            {players.length} Pirates
          </p>
        </div>
      </div>

      {/* PLAYER LIST */}
      <div className="w-full px-2 sm:px-5 mt-3 sm:mt-5 space-y-2 sm:space-y-3">
        {players.map((player, index) => (
          <div
            key={index}
            className="
              player-row
              w-full
              min-w-0
              rounded-xl
              px-3 sm:px-5
              py-2.5 sm:py-4
              min-h-[58px]
              sm:min-h-[66px]
            "
          >
            <div className="player-avatar w-8 h-8 sm:w-[34px] sm:h-[34px] shrink-0">
              <FaSkull />
            </div>

            <div className="player-divider h-6 sm:h-7 shrink-0"></div>

            <span className="player-num shrink-0">{index + 1}</span>

            <input
              maxLength={7}
              value={player.name}
              placeholder="해적 이름"
              onChange={(e) => changePlayerName(index, e.target.value)}
              className="name-input min-w-0 w-full"
            />

            <div className="w-5 shrink-0 flex justify-center">
              {player.name.trim() && (
                <FaCheck className="text-[#c9942a] text-xs" />
              )}
            </div>
          </div>
        ))}

        <p className="text-center text-[11px] sm:text-xs text-[#7a5c2a] pt-1 sm:pt-2">
          <FaLightbulb className="inline mr-1" />
          이름은 최대 7자까지 입력 가능합니다.
        </p>

        {error && (
          <p className="text-center text-red-400 text-xs sm:text-sm">{error}</p>
        )}
      </div>

      {/* FOOTER */}
      <div className="page-footer w-full px-3 sm:px-5 pt-4 sm:pt-5 pb-4 sm:pb-8 shrink-0">
        <div className="rope-divider mb-4 sm:mb-6"></div>

        <button
          onClick={handleStartGame}
          className="
            btn-pirate
            w-full
            rounded-xl
            py-4
            font-cinzel
            font-bold
            text-[#4f2d07]
            pirate-btn
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
