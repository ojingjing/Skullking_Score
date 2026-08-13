import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaAnchor } from "react-icons/fa";
import {
  GiMermaid,
  GiPirateSkull,
  GiPirateHat,
  GiCardJackSpades,
  GiCardRandom,
} from "react-icons/gi";

import { calculateBonusScore, INITIAL_BONUS_DATA } from "../utils/score";

function BonusCounter({ icon, title, point, value, setValue, className }) {
  return (
    <div className={`card-frame rounded-xl p-7 ${className}`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className={`bonus-badge ${className}-badge`}>{icon}</div>

          <div>
            <h2 className="font-bold text-[#ba9d26] drop-shadow-md">{title}</h2>

            <p className="text-sm text-[#b0921a]">{point}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setValue(Math.max(0, value - 1))}
            className="number-btn number-btn-sm"
          >
            −
          </button>

          <span className="font-cinzel text-2xl text-[#f0c060] w-8 text-center">
            {value}
          </span>

          <button
            onClick={() => setValue(value + 1)}
            className="number-btn number-btn-sm"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

function ToggleCard({ icon, title, point, active, onClick, className }) {
  return (
    <div className={`card-frame rounded-xl p-7 ${className}`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className={`bonus-badge ${className}-badge`}>{icon}</div>

          <div>
            <h2 className="text-base font-bold text-[#ba9d26] drop-shadow-md">
              {title}
            </h2>

            <p className="text-sm text-[#b0921a]">{point}</p>
          </div>
        </div>

        <button
          onClick={onClick}
          className={`
            px-4
            py-2
            rounded-xl
            transition-all
            border
            ${
              active
                ? "border-[#b49216] bg-[#eac327ae] text-[#1a1208]"
                : "border-[#6e5528] text-[#c9942a]"
            }
          `}
        >
          {active ? "해제하기" : "획득하기"}
        </button>
      </div>
    </div>
  );
}

export default function Bonus({ players, setPlayers, selectedPlayer }) {
  const navigate = useNavigate();

  const player = players[selectedPlayer];

  // 선택된 플레이어가 없는 경우
  if (!player) {
    navigate("/result");
    return null;
  }

  const bonus = player.bonusData ?? INITIAL_BONUS_DATA;

  const [coloredCard, setColoredCard] = useState(bonus.coloredCard);

  const [black14, setBlack14] = useState(bonus.black14);

  const [pirateCatchMermaid, setPirateCatchMermaid] = useState(
    bonus.pirateCatchMermaid,
  );

  const [skullKingCatchPirate, setSkullKingCatchPirate] = useState(
    bonus.skullKingCatchPirate,
  );

  const [mermaidCatchSkullKing, setMermaidCatchSkullKing] = useState(
    bonus.mermaidCatchSkullKing,
  );

  const bonusData = {
    coloredCard,
    black14,
    pirateCatchMermaid,
    skullKingCatchPirate,
    mermaidCatchSkullKing,
  };

  const bonusScore = calculateBonusScore(bonusData);

  function applyBonus() {
    const newPlayers = [...players];

    newPlayers[selectedPlayer] = {
      ...newPlayers[selectedPlayer],
      currentBonusScore: bonusScore,
      bonusData,
    };

    setPlayers(newPlayers);
    navigate("/result");
  }

  return (
    <div className="min-h-screen flex flex-col bg-texture px-5 py-5 text-[#e8d5a8]">
      {/* Header */}
      <div className="text-center pt-2">
        <div className="rope-divider w-90 mx-auto mb-3"></div>

        <h1 className="diphylleia-regular text-3xl pirate-title-bo">
          ✦ BONUS ✦
        </h1>

        <div className="flex justify-center items-center">
          <p className="mt-1 text-sm pirate-title-bo mr-1">{player.name}님</p>

          <p className="text-[#8f7b58] mt-1 text-sm">의 보너스 점수</p>
        </div>

        <div className="rope-divider w-90 mx-auto mt-3"></div>
      </div>

      {/* Bonus List */}
      <div className="flex-1 mt-4 space-y-3">
        <BonusCounter
          className="bg-card-gold"
          icon={<GiCardRandom />}
          title="색깔 카드"
          point="+10점"
          value={coloredCard}
          setValue={setColoredCard}
        />

        <ToggleCard
          className="bg-card"
          icon={<GiCardJackSpades />}
          title="검은색 카드"
          point="+20점"
          active={black14}
          onClick={() => setBlack14(!black14)}
        />

        <BonusCounter
          className="bg-pirate"
          icon={<GiPirateHat />}
          title="해적 → 인어"
          point="+20점"
          value={pirateCatchMermaid}
          setValue={setPirateCatchMermaid}
        />

        <ToggleCard
          className="bg-mermaid"
          icon={<GiMermaid />}
          title="인어 → 스컬킹"
          point="+40점"
          active={mermaidCatchSkullKing}
          onClick={() => setMermaidCatchSkullKing(!mermaidCatchSkullKing)}
        />

        <BonusCounter
          className="bg-skull"
          icon={<GiPirateSkull />}
          title="스컬킹 → 해적"
          point="+30점"
          value={skullKingCatchPirate}
          setValue={setSkullKingCatchPirate}
        />

        {/* Total Bonus */}
        <div className="card-frame rounded-xl p-3 text-center">
          <p className="text-[#8f7b58] text-sm">획득 보너스</p>

          <p className="font-cinzel text-4xl pirate-title-bo mt-2 font-bold">
            +{bonusScore}점
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 pb-3 space-y-3">
        <button
          onClick={applyBonus}
          className="w-full rounded-xl py-4 font-cinzel font-bold text-[#ffe819] btn-pirate-bo-2 pirate-btn"
        >
          <FaAnchor className="inline mr-2" />
          보너스 획득하기
          <FaAnchor className="inline ml-2" />
        </button>

        <button
          onClick={() => navigate("/result")}
          className="w-full py-4 rounded-xl border border-[#6e5528] text-[#c9942a] hover:bg-[#c9942a]/10 transition"
        >
          뒤로가기
        </button>
      </div>
    </div>
  );
}
