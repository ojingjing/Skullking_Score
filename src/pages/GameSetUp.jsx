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
    <div
      className="
        game-page
        min-h-[100dvh]
        flex
        flex-col
        bg-texture
        text-[#e8d5a8]
        px-4
      "
    >
      {/* =========================
          HEADER
      ========================= */}
      <div className="flex items-center justify-between px-5 pt-4 sm:pt-8 pb-2 sm:pb-3">
        <div className="w-8" />

        <p className="sekuya-200 text-xs text-[#d09f3d80] text-center"></p>

        <div className="w-8" />
      </div>

      {/* =========================
          PROGRESS
      ========================= */}
      <div className="game-progress flex justify-center gap-2 pb-3 sm:pb-5">
        <div className="progress-dot active"></div>
        <div className="progress-dot"></div>
        <div className="progress-dot"></div>
      </div>

      {/* =========================
          CONTENT
      ========================= */}
      <main className="flex-1 min-h-0">
        {/* Title */}
        <div className="game-title flex flex-col items-center px-4 sm:px-6 gap-1 sm:gap-2">
          <h2
            className="
              diphylleia-regular
              text-2xl
              sm:text-3xl
              font-bold
              pirate-title
              text-center
              whitespace-nowrap
            "
          >
            🔸 해적단 설정 🔸
          </h2>

          <p className="text-[11px] sm:text-xs text-[#c09244] text-center">
            해적의 수와 이름을 설정해주세요. (2~8명)
          </p>
        </div>

        {/* =========================
            PLAYER COUNT
        ========================= */}
        <div className="mt-5 sm:mt-8 flex flex-col items-center">
          <p className="text-xs text-[#a89070] mb-2 sm:mb-3">해적 수</p>

          <div className="flex items-center gap-4 sm:gap-6">
            <button
              className="number-btn"
              onClick={() => changePlayerCount(players.length - 1)}
            >
              <span className="text-2xl sm:text-3xl font-cinzel">−</span>
            </button>

            <div className="text-center">
              <p
                className="
                  sekuya-regular
                  text-3xl
                  sm:text-4xl
                  pirate-title
                "
              >
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

        {/* =========================
            PREVIEW
        ========================= */}
        <div
          className="
            preview-card
            mt-5
            sm:mt-6
            rounded-xl
            p-3
            sm:p-4
            w-full
          "
        >
          <p className="text-center text-xs text-[#a89070]">선택된 해적단</p>

          <div
            className="
              flex
              justify-center
              items-center
              gap-2
              flex-wrap
              mt-3
              sm:mt-4
            "
          >
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

          <p
            className="
              text-center
              mt-2
              sm:mt-3
              shojumaru-regular
              pirate-title
              text-lg
              sm:text-xl
            "
          >
            {players.length} Pirates
          </p>
        </div>

        {/* =========================
            PLAYER LIST
        ========================= */}
        <div className="mt-4 sm:mt-6 px-1 sm:px-1 space-y-2 sm:space-y-3">
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

          <p className="text-center text-[11px] sm:text-xs text-[#7a5c2a] pt-1 sm:pt-2">
            <FaLightbulb className="inline mr-1" />
            이름은 최대 7자까지 입력 가능합니다.
          </p>

          {error && (
            <p className="text-center text-red-400 text-xs sm:text-sm">
              {error}
            </p>
          )}
        </div>
      </main>

      {/* =========================
          FOOTER
      ========================= */}
      <div
        className="
          page-footer
          mt-auto
          px-1
          sm:px-1
          pt-4
          sm:pt-8
          pb-4
          sm:pb-8
        "
      >
        <div className="rope-divider mb-4 sm:mb-6"></div>

        <button
          onClick={handleStartGame}
          className="btn-pirate w-full rounded-xl py-4 font-cinzel font-bold text-[#4f2d07] pirate-btn"
        >
          <FaAnchor className="inline mr-2" />
          게임 시작
          <FaAnchor className="inline ml-2" />
        </button>
      </div>
    </div>
  );
}
