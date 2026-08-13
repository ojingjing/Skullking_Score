import { useNavigate } from "react-router-dom";
import { FaAnchor, FaChevronLeft, FaSkull } from "react-icons/fa";

import { calculateRoundScore } from "../utils/score";

const initialBonusData = {
  coloredCard: 0,
  black14: false,
  pirateCatchMermaid: 0,
  skullKingCatchPirate: 0,
  mermaidCatchSkullKing: false,
};

export default function RoundResult({ players, setPlayers, round }) {
  const navigate = useNavigate();

  function changeSuccess(index, amount) {
    const newPlayers = [...players];

    let nextValue = newPlayers[index].success + amount;

    if (nextValue < 0) {
      nextValue = round;
    }

    if (nextValue > round) {
      nextValue = 0;
    }

    newPlayers[index] = {
      ...newPlayers[index],
      success: nextValue,
    };

    setPlayers(newPlayers);
  }

  function checkResult() {
    const newPlayers = players.map((player) => {
      const roundScore = calculateRoundScore(
        round,
        player.prediction,
        player.success,
      );

      return {
        ...player,
        currentRoundScore: roundScore,
        currentBonusScore: 0,
        bonusData: { ...initialBonusData },
      };
    });

    setPlayers(newPlayers);
    navigate("/result");
  }

  return (
    <div className="h-full flex flex-col bg-texture px-4 overflow-hidden text-[#e8d5a8]">
      {/* Header */}
      <div className="flex items-center px-5 pt-8">
        <button onClick={() => navigate(-1)} className="text-[#a89070] w-8">
          <FaChevronLeft />
        </button>

        <div className="flex-1 text-center">
          <h1 className="diphylleia-regular text-2xl font-bold pirate-title">
            ⚔️ ROUND {round} ⚔️
          </h1>
        </div>

        <div className="w-8"></div>
      </div>

      {/* Title */}
      <div className="px-6 mt-4 text-center">
        <p className="mt-5 text-2xl shojumaru-regular pirate-title-su">
          Success
        </p>

        <p className="font-cinzel text-xs text-[#c4ac8c]">
          이번 라운드 성공 횟수를 입력하세요
        </p>
      </div>

      {/* Players */}
      <div className="flex-1 px-5 mt-5 space-y-3 overflow-y-auto">
        {players.map((player, index) => (
          <div
            key={index}
            className="card-frame-su rounded-xl px-5 py-4 flex items-center justify-between"
          >
            {/* Player */}
            <div className="flex items-center gap-3">
              <div className="player-avatar">
                <FaSkull />
              </div>

              <div className="player-divider"></div>

              <div>
                <p className="text-sm text-[#cbaf76]">{player.name}</p>
              </div>
            </div>

            {/* Success Count */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => changeSuccess(index, -1)}
                className="number-btn-su number-btn-sm pirate-title-su"
              >
                ➖
              </button>

              <span className="font-cinzel text-2xl w-8 text-center text-[rgb(73,167,255)]">
                {player.success}
              </span>

              <button
                onClick={() => changeSuccess(index, 1)}
                className="number-btn-su number-btn-sm pirate-title-su"
              >
                ➕
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-5 pt-5 pb-8">
        <button
          onClick={checkResult}
          className="btn-pirate-su w-full rounded-xl py-4 font-cinzel font-bold text-[#f4eed5] pirate-btn"
        >
          <FaAnchor className="inline mr-2" />
          결과 확인
          <FaAnchor className="inline ml-2" />
        </button>
      </div>
    </div>
  );
}
