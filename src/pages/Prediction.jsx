import { useNavigate } from "react-router-dom";
import { FaAnchor, FaChevronLeft, FaSkull } from "react-icons/fa";

export default function Prediction({ players, setPlayers, round }) {
  const navigate = useNavigate();

  function changePrediction(index, amount) {
    const newPlayers = [...players];

    let nextValue = newPlayers[index].prediction + amount;

    // 0 ~ round 범위에서 순환
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
    <div className="min-h-screen flex flex-col bg-texture px-5 py-8 text-[#e8d5a8]">
      {/* Header */}
      <div className="flex items-center px-5 pt-8">
        <button onClick={() => navigate(-1)} className="text-[#a89070] w-8">
          <FaChevronLeft />
        </button>

        <div className="flex-1 text-center">
          <h1 className="diphylleia-regular text-2xl font-bold pirate-title">
            🯀 ROUND {round} 🯀
          </h1>
        </div>

        <div className="w-8"></div>
      </div>

      {/* Title */}
      <div className="px-6 mt-4 text-center">
        <p className="mt-5 text-2xl shojumaru-regular pirate-title-pr">
          Prediction
        </p>

        <p className="font-cinzel text-xs text-[#c4ac8c]">
          이번 라운드 승수를 예측하세요
        </p>
      </div>

      {/* Players */}
      <div className="flex-1 px-5 mt-5 space-y-3 overflow-y-auto">
        {players.map((player, index) => (
          <div
            key={index}
            className="card-frame-pr rounded-xl px-5 py-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="player-avatar">
                <FaSkull />
              </div>

              <div className="player-divider"></div>

              <div>
                <p className="text-sm text-[#cbaf76]">{player.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              {/* 감소 */}
              <button
                onClick={() => changePrediction(index, -1)}
                className="number-btn-pr number-btn-sm"
              >
                ﹣
              </button>

              {/* 숫자 */}
              <span className="font-cinzel text-2xl w-8 text-center text-[#e23030]">
                {player.prediction}
              </span>

              {/* 증가 */}
              <button
                onClick={() => changePrediction(index, 1)}
                className="number-btn-pr number-btn-sm text-xl"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-5 pt-5 pb-8">
        <button
          onClick={() => navigate("/round-result")}
          className="btn-pirate-su w-full rounded-xl py-4 font-cinzel font-bold text-[#f4eed5] pirate-btn"
        >
          <FaAnchor className="inline mr-2" />
          예측 저장하기
          <FaAnchor className="inline ml-2" />
        </button>
      </div>
    </div>
  );
}
