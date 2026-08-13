import { useNavigate } from "react-router-dom";
import { FaAnchor, FaChevronLeft, FaSkull } from "react-icons/fa";

export default function Prediction({ players, setPlayers, round }) {
  const navigate = useNavigate();

  function changePrediction(index, amount) {
    const newPlayers = [...players];

    let nextValue = newPlayers[index].prediction + amount;

    if (nextValue < 0) {
      nextValue = round;
    }

    if (nextValue > round) {
      nextValue = 0;
    }

    newPlayers[index] = {
      ...newPlayers[index],
      prediction: nextValue,
    };

    setPlayers(newPlayers);
  }

  return (
    <div className="game-page min-h-[100dvh] flex flex-col bg-texture px-3 sm:px-4 text-[#e8d5a8]">
      {/* Header */}
      <div className="flex items-center px-3 sm:px-5 pt-4 sm:pt-8">
        <button
          onClick={() => navigate(-1)}
          className="text-[#a89070] w-8 shrink-0"
        >
          <FaChevronLeft />
        </button>

        <div className="flex-1 min-w-0 text-center">
          <h1 className="diphylleia-regular text-xl sm:text-2xl font-bold pirate-title">
            ⚔️ ROUND {round} ⚔️
          </h1>
        </div>

        <div className="w-8 shrink-0"></div>
      </div>

      {/* Title */}
      <div className="px-3 sm:px-6 mt-3 sm:mt-4 text-center">
        <p className="mt-3 sm:mt-5 text-xl sm:text-2xl shojumaru-regular pirate-title-pr">
          Prediction
        </p>

        <p className="font-cinzel text-[11px] sm:text-xs text-[#c4ac8c] mt-1">
          이번 라운드 승수를 예측하세요
        </p>
      </div>

      {/* Players */}
      <div className="flex-1 min-h-0 w-full px-2 sm:px-5 mt-4 sm:mt-5 space-y-2 sm:space-y-3 overflow-y-auto">
        {players.map((player, index) => (
          <div
            key={index}
            className="
              card-frame-pr
              w-full
              min-w-0
              rounded-xl
              px-3 sm:px-5
              py-2.5 sm:py-4
              min-h-[58px]
              sm:min-h-[76px]
              flex
              items-center
              justify-between
              gap-2
            "
          >
            {/* Player */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <div className="player-avatar w-8 h-8 sm:w-[34px] sm:h-[34px] shrink-0">
                <FaSkull />
              </div>

              <div className="player-divider h-6 sm:h-7 shrink-0"></div>

              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-[#cbaf76] truncate">
                  {player.name}
                </p>
              </div>
            </div>

            {/* Prediction */}
            <div className="flex items-center gap-2 sm:gap-6 shrink-0">
              <button
                onClick={() => changePrediction(index, -1)}
                className="
                  number-btn-pr
                  number-btn-sm
                  pirate-title-pr
                  w-9 h-9
                  sm:w-[42px] sm:h-[42px]
                  shrink-0
                "
              >
                ➖
              </button>

              <span className="font-cinzel text-xl sm:text-2xl w-6 sm:w-8 text-center text-[#e23030]">
                {player.prediction}
              </span>

              <button
                onClick={() => changePrediction(index, 1)}
                className="
                  number-btn-pr
                  number-btn-sm
                  pirate-title-pr
                  w-9 h-9
                  sm:w-[42px] sm:h-[42px]
                  shrink-0
                "
              >
                ➕
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div
        className="
          page-footer
          w-full
          px-3 sm:px-5
          pt-4 sm:pt-5
          pb-4 sm:pb-8
          shrink-0
        "
      >
        <button
          onClick={() => navigate("/round-result")}
          className="
            btn-pirate-su
            w-full
            rounded-xl
            py-4
            font-cinzel
            font-bold
            text-[#f4eed5]
            pirate-btn
          "
        >
          <FaAnchor className="inline mr-2" />
          예측 저장하기
          <FaAnchor className="inline ml-2" />
        </button>
      </div>
    </div>
  );
}
