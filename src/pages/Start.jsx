import { useNavigate } from "react-router-dom";
import { FaAnchor, FaShip } from "react-icons/fa";
import { GiPirateSkull, GiPirateFlag } from "react-icons/gi";
import "../styles/pirate.css";

export default function Start() {
  const navigate = useNavigate();

  return (
    <div className="stars-bg min-h-screen flex flex-col justify-between overflow-hidden bg-texture px-5 py-8 text-[#e8d5a8]">
      {/* 상단 */}
      <div className="w-full flex flex-col items-center gap-2 pt-4">
        <div className="skull-decoration tracking-widest text-xs">
          ✦ ☠ ✦ ☠ ✦ ☠ ✦ ☠ ✦ ☠ ✦
        </div>
      </div>

      {/* 메인 */}
      <div className="flex flex-col items-center gap-8 px-6">
        {/* 해골 */}
        <div className="anchor-spin relative">
          <div className="w-28 h-28 rounded-full flex items-center justify-center relative skull-circle">
            <GiPirateSkull className="text-6xl skull-icon " />
            <div className="absolute inset-0 rounded-full dashed-circle "></div>
          </div>
        </div>

        {/* 타이틀 */}
        <div className="flex flex-col items-center">
          <h1
            className="
            sekuya-regular
            text-6xl
            tracking-tight
            pirate-title
            text-[#f0c060]
            "
          >
            SKULL
          </h1>

          <h1
            className="
            sekuya-regular
            text-7xl
            tracking-tight
            pirate-title
            text-[#f0c060]
            "
          >
            KING
          </h1>

          <p className="diphylleia-regular text-xl mt-2 text-[#c9942a] subtitle-glow">
            점수 계산기
          </p>
        </div>

        {/* 설명 카드 */}
        <div className="card-frame pirate-card rounded-xl px-6 py-5 w-full max-w-xs relative">
          <div className="corner-deco corner-tl" />
          <div className="corner-deco corner-tr" />
          <div className="corner-deco corner-bl" />
          <div className="corner-deco corner-br" />

          <p className="text-center text-sm leading-relaxed text-[#a89070]">
            2~8명의 해적단과 함께
            <br />
            <span className="text-[#f0c060] font-bold">10라운드</span>
            동안 예측과 전략으로
            <br />
            바다의 왕좌를 차지하라!
          </p>
        </div>

        {/* 시작 버튼 */}
        <button
          onClick={() => navigate("/setup")}
          className="
          btn-pirate
          pirate-btn
          rounded-xl
          px-10
          py-4
          w-full
          max-w-xs
          font-cinzel
          font-bold
          tracking-widest
          text-base
          text-[#4f2d07]
          "
        >
          <FaAnchor className="inline mr-2" />
          항해 시작
          <FaAnchor className="inline ml-2" />
        </button>
      </div>

      {/* 하단 */}
      <div className="flex flex-col items-center gap-2">
        <div className="flex gap-3 items-center text-[rgba(201,148,42,.3)]">
          <FaShip className="text-xs" />

          <span className="font-cinzel text-xs tracking-widest">
            ✦ ☠ SAIL THE SEAS ☠ ✦
          </span>

          <FaShip className="text-xs scale-x-[-1]" />
        </div>
      </div>
    </div>
  );
}
