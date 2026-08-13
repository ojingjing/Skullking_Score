import { useNavigate } from "react-router-dom";
import { FaAnchor, FaGift, FaSkull } from "react-icons/fa";

export default function Result({
  players,
  setPlayers,
  round,
  setRound,
  setSelectedPlayer,
}) {
  const navigate = useNavigate();

  function openBonus(index) {
    setSelectedPlayer(index);
    navigate("/bonus");
  }

  function saveRoundScore() {
    const newPlayers = players.map((player) => {
      const roundTotal =
        (player.currentRoundScore || 0) + (player.currentBonusScore || 0);

      const roundScores = player.roundScores || [];

      if (roundScores.length >= round) {
        return player;
      }

      return {
        ...player,
        roundScores: [...roundScores, roundTotal],
        totalScore: (player.totalScore || 0) + roundTotal,
        currentRoundScore: 0,
        currentBonusScore: 0,
        prediction: 0,
        success: 0,
      };
    });

    setPlayers(newPlayers);

    return newPlayers;
  }

  function nextRound() {
    saveRoundScore();

    if (round >= 10) {
      navigate("/final");
      return;
    }

    setRound((prevRound) => prevRound + 1);
    navigate("/prediction");
  }

  function finishGame() {
    saveRoundScore();
    navigate("/final");
  }

  return (
    <div className="game-page min-h-[100dvh] flex flex-col bg-texture px-3 sm:px-4 text-[#e8d5a8]">
      {/* Header */}
      <div className="shrink-0 px-3 sm:px-5 pt-4 sm:pt-8 pb-3 sm:pb-4 text-center">
        <div className="rope-divider w-full max-w-[360px] mx-auto mb-3"></div>

        <h1 className="diphylleia-regular text-xl sm:text-3xl font-bold pirate-title">
          ⚔️ ROUND {round} ⚔️
        </h1>

        <p className="text-[#a89070] text-xs sm:text-sm mt-1">라운드 결과</p>

        <div className="rope-divider w-full max-w-[360px] mx-auto mt-3"></div>
      </div>

      {/* Players */}
      <div className="flex-1 min-h-0 w-full px-2 sm:px-5 mt-2 sm:mt-3 space-y-2 sm:space-y-4 overflow-y-auto">
        {players.map((player, index) => {
          const roundScore =
            (player.currentRoundScore || 0) + (player.currentBonusScore || 0);

          const previousTotalScore = player.totalScore || 0;

          const expectedTotal = previousTotalScore + roundScore;

          const isSuccess =
            player.currentRoundScore >= 0 &&
            player.prediction === player.success;

          return (
            <div
              key={index}
              className={`
                w-full
                min-w-0
                rounded-xl
                px-6 sm:px-5
                py-3 sm:py-4
                border
                ${
                  isSuccess
                    ? "border-yellow-500 bg-gold-treasure"
                    : "border-red-700 bg-gold-lose"
                }
              `}
            >
              {/* Player */}
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                {isSuccess ? (
                  <div className="player-avatar w-8 h-8 sm:w-[34px] sm:h-[34px] shrink-0">
                    <FaSkull />
                  </div>
                ) : (
                  <div className="player-avatar-lose w-8 h-8 sm:w-[34px] sm:h-[34px] shrink-0">
                    <FaSkull />
                  </div>
                )}

                <div className="player-divider h-6 sm:h-7 shrink-0"></div>

                <div className="flex w-full min-w-0 justify-between items-center gap-2">
                  <h2 className="font-cinzel text-sm sm:text-base text-[#cbaf76] truncate">
                    {player.name}
                  </h2>

                  {isSuccess ? (
                    <div className="pirate-title diphylleia-regular text-xl sm:text-2xl shrink-0">
                      Win
                    </div>
                  ) : (
                    <div className="text-red-500 diphylleia-regular text-xl sm:text-2xl shrink-0">
                      Lose
                    </div>
                  )}
                </div>
              </div>

              {/* Score Information */}
              <div className="space-y-0.5 text-xs sm:text-sm mt-3">
                {/* Prediction */}
                <div className="flex justify-between">
                  <span className="text-[#a89070]">예측</span>
                  <span>{player.prediction}</span>
                </div>

                {/* Success */}
                <div className="flex justify-between">
                  <span className="text-[#a89070]">성공</span>
                  <span>{player.success}</span>
                </div>

                <div className="border-t border-[#937b5bab] mt-2"></div>

                {/* Previous Total Score */}
                <div className="flex justify-between font-bold mt-1">
                  <span className="text-[#8c7855]">이전 총점</span>

                  <span
                    className={`font-bold ${
                      previousTotalScore >= 0
                        ? "text-[#b89d6a]"
                        : "text-red-500"
                    }`}
                  >
                    {previousTotalScore > 0 ? "+" : ""}
                    {previousTotalScore}점
                  </span>
                </div>

                {/* Round Score */}
                <div className="flex justify-between font-bold mt-1">
                  <span className="text-[#a89070]">이번 라운드</span>

                  <span
                    className={`font-bold ${
                      roundScore >= 0 ? "pirate-title" : "text-red-500"
                    }`}
                  >
                    {roundScore > 0 ? "+" : ""}
                    {roundScore}점
                  </span>
                </div>

                {/* Bonus */}
                {isSuccess && (
                  <div className="flex justify-between items-center mt-2 gap-2">
                    <button
                      onClick={() => openBonus(index)}
                      className="
                        btn-pirate-bo
                        rounded-xl
                        p-1.5
                        px-2
                        font-cinzel
                        font-bold
                        text-[#f047f0]
                        flex
                        items-center
                        shrink-0
                      "
                    >
                      <FaGift className="inline mr-1" />
                      Bonus
                    </button>

                    {player.currentBonusScore !== 0 && (
                      <span className="pirate-title-bo font-bold text-[#f047f0]">
                        +{player.currentBonusScore}점
                      </span>
                    )}
                  </div>
                )}

                {/* Total Score */}
                <div className="flex justify-between text-base sm:text-lg font-bold mt-2">
                  <span
                    className={`font-bold ${
                      expectedTotal >= 0 ? "pirate-title" : "text-red-500"
                    }`}
                  >
                    총점
                  </span>

                  <span
                    className={`font-bold ${
                      expectedTotal >= 0 ? "pirate-title" : "text-red-500"
                    }`}
                  >
                    {expectedTotal}점
                  </span>
                </div>
              </div>
            </div>
          );
        })}
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
        <div className="space-y-3">
          <button
            onClick={nextRound}
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

            {round === 10 ? "최종 결과 보기" : `ROUND ${round + 1} 시작하기`}

            <FaAnchor className="inline ml-2" />
          </button>

          <button
            onClick={finishGame}
            className="
              w-full
              rounded-xl
              py-4
              border
              border-[#7d5f37]
              text-[#b08348]
              hover:bg-[#c9942a]/10
              transition
            "
          >
            🏁 여기까지 하고 최종 결과 보기
          </button>
        </div>
      </div>
    </div>
  );
}
