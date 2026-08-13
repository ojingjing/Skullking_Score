import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPlayer } from "../utils/score";

export default function FinalResult({ players, setPlayers, setRound }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState("rank");

  const ranking = [...players]
    .sort((a, b) => (b.totalScore ?? 0) - (a.totalScore ?? 0))
    .map((player, index, arr) => {
      let rank = 1;

      for (let i = 0; i < index; i++) {
        if ((arr[i].totalScore ?? 0) > (player.totalScore ?? 0)) {
          rank++;
        }
      }

      return {
        ...player,
        rank,
      };
    });

  const topScore = Math.max(...players.map((player) => player.totalScore ?? 0));

  const winners = ranking.filter(
    (player) => (player.totalScore ?? 0) === topScore,
  );

  function restartGame() {
    const resetPlayers = players.map((player) => ({
      ...createPlayer(),
      name: player.name,
    }));

    setPlayers(resetPlayers);
    setRound(1);

    navigate("/prediction");
  }

  function newGame() {
    localStorage.removeItem("players");

    const emptyPlayers = Array.from({ length: 2 }, () => createPlayer());

    setPlayers(emptyPlayers);
    setRound(1);

    navigate("/start");
  }

  return (
    <div className="game-page min-h-[100dvh] flex flex-col bg-texture px-3 sm:px-4 text-[#e8d5a8]">
      {/* Content */}
      <div className="flex-1 min-h-0 w-full overflow-y-auto">
        {/* Header */}
        <div className="shrink-0 text-center pt-4 sm:pt-8 pb-4 sm:pb-6 px-3 sm:px-5">
          <h1 className="diphylleia-regular text-xl sm:text-3xl font-bold pirate-title">
            🏆 FINAL RESULT 🏆
          </h1>
        </div>

        {/* Winner Card */}
        <div className="px-3 sm:px-5">
          <div className="winner-card w-full rounded-2xl p-4 sm:p-5 mb-4 sm:mb-5">
            <div className="flex flex-col items-center">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl">👑</div>

                <p className="font-cinzel text-xs pirate-title mt-1">WINNER</p>

                <div className="font-cinzel flex justify-center flex-wrap gap-2 sm:gap-3 text-lg sm:text-xl font-bold pirate-title mt-1">
                  {winners.map((player) => (
                    <span key={player.name}>{player.name}</span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-1 mt-1">
                <p className="sekuya-regular text-2xl sm:text-3xl pirate-title">
                  {winners[0]?.totalScore ?? 0}
                </p>

                <span className="sekuya-regular text-xl sm:text-2xl pirate-title">
                  점
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-3 sm:px-5">
          <div className="flex p-1 rounded-xl mb-4 bg-white/5 border border-[#c9942a]/20">
            <button
              onClick={() => setTab("rank")}
              className={`
                flex-1
                py-2
                rounded-lg
                font-noto
                text-xs sm:text-sm
                ${
                  tab === "rank"
                    ? "bg-[#c9942a]/20 text-[#c9942a]"
                    : "text-[#a89070]/50"
                }
              `}
            >
              🏆 순위
            </button>

            <button
              onClick={() => setTab("table")}
              className={`
                flex-1
                py-2
                rounded-lg
                font-noto
                text-xs sm:text-sm
                ${
                  tab === "table"
                    ? "bg-[#c9942a]/20 text-[#c9942a]"
                    : "text-[#a89070]/50"
                }
              `}
            >
              📋 라운드 점수
            </button>
          </div>
        </div>

        {/* Ranking */}
        {tab === "rank" && (
          <div className="px-3 sm:px-5 space-y-2 sm:space-y-3">
            {ranking.map((player, index) => (
              <div
                key={index}
                className={`
                  w-full
                  min-w-0
                  flex
                  items-center
                  gap-3
                  p-4
                  rounded-xl
                  ${
                    player.rank === 1
                      ? "bg-[#3a2a05]/80 border border-[#ffd700]/60 shadow-[0_0_15px_rgba(255,215,0,0.25)]"
                      : player.rank === 2
                        ? "bg-[#262626]/80 border border-[#dfdfdf]/60"
                        : player.rank === 3
                          ? "bg-[#3a2110]/80 border border-[#cd7f32]/60"
                          : "bg-[#1a1208]/80 border border-[#c9942a]/20"
                  }
                `}
              >
                <div
                  className={`
                    rank-medal
                    shrink-0
                    ${
                      player.rank === 1
                        ? "rank-gold"
                        : player.rank === 2
                          ? "rank-silver"
                          : player.rank === 3
                            ? "rank-bronze"
                            : "rank-normal"
                    }
                  `}
                >
                  {player.rank}
                </div>

                <div className="flex justify-between w-full min-w-0 items-center gap-2 pr-1 sm:pr-3">
                  <p className="font-cinzel font-bold text-sm sm:text-base truncate">
                    {player.name || "이름 없음"}
                  </p>

                  <p
                    className={`
                      font-cinzel
                      text-lg sm:text-xl
                      font-bold
                      shrink-0
                      ${
                        player.rank === 1
                          ? "pirate-title drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]"
                          : player.rank === 2
                            ? "text-[#b5b5b5] drop-shadow-[0_0_8px_rgba(220,220,220,0.5)]"
                            : player.rank === 3
                              ? "text-[#dc7a19] drop-shadow-[0_0_8px_rgba(205,127,50,0.5)]"
                              : "text-[#a89070]"
                      }
                    `}
                  >
                    {player.totalScore ?? 0}점
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Round Score Table */}
        {tab === "table" && (
          <div className="px-3 sm:px-5">
            <div className="w-full rounded-xl p-3 sm:p-4 bg-[#1a1208]/80 border border-[#c9942a]/20 overflow-x-auto">
              <table className="w-full min-w-[360px] text-[11px] sm:text-xs table-fixed">
                <thead>
                  <tr className="text-[#c9942a]">
                    <th className="w-[60px] sm:w-[70px] text-left p-2">이름</th>

                    {Array.from({
                      length: Math.max(
                        ...players.map(
                          (player) => player.roundScores?.length || 0,
                        ),
                        0,
                      ),
                    }).map((_, index) => (
                      <th key={index} className="text-center p-1">
                        R{index + 1}
                      </th>
                    ))}

                    <th className="p-1">합계</th>
                  </tr>
                </thead>

                <tbody>
                  {ranking.map((player, index) => (
                    <tr key={index} className="border-t border-[#c9942a]/10">
                      <td className="p-2 text-left truncate">{player.name}</td>

                      {(player.roundScores || []).map((score, roundIndex) => (
                        <td key={roundIndex} className="text-center p-1">
                          {score}
                        </td>
                      ))}

                      <td className="text-center text-[#f0c060] font-bold p-1">
                        {player.totalScore ?? 0}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="h-4 sm:h-6"></div>
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
            onClick={restartGame}
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
            👥 같은 멤버로 다시하기
          </button>

          <button
            onClick={newGame}
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
            🔄 새 게임 시작
          </button>
        </div>
      </div>
    </div>
  );
}
