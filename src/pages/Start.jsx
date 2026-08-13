import { useNavigate } from "react-router-dom";
import { FaAnchor, FaShip } from "react-icons/fa";
import { GiPirateSkull } from "react-icons/gi";
import "../styles/pirate.css";

export default function Start() {
  const navigate = useNavigate();

  return (
    <div className="start-page stars-bg bg-texture text-[#e8d5a8]">
      {/* 상단 */}
      <div className="start-top">
        <div className="skull-decoration tracking-widest">
          ✦ ☠ ✦ ☠ ✦ ☠ ✦ ☠ ✦
        </div>
      </div>

      {/* 메인 */}
      <div className="start-main">
        {/* 해골 */}
        <div className="anchor-spin relative">
          <div className="start-skull rounded-full flex items-center justify-center relative skull-circle">
            <GiPirateSkull className="start-skull-icon skull-icon" />

            <div className="absolute inset-0 rounded-full dashed-circle"></div>
          </div>
        </div>

        {/* 타이틀 */}
        <div className="start-title flex flex-col items-center">
          <h1 className="sekuya-regular tracking-tight pirate-title">SKULL</h1>

          <h1 className="sekuya-regular tracking-tight pirate-title">KING</h1>

          <p className="diphylleia-regular text-[#c9942a] subtitle-glow">
            점수 계산기
          </p>
        </div>

        {/* 설명 카드 */}
        <div className="start-card card-frame pirate-card rounded-xl w-full relative">
          <div className="corner-deco corner-tl" />
          <div className="corner-deco corner-tr" />
          <div className="corner-deco corner-bl" />
          <div className="corner-deco corner-br" />

          <p className="text-center text-[#a89070]">
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
            start-button
            btn-pirate
            pirate-btn
            rounded-xl
            w-full
            font-cinzel
            font-bold
            tracking-widest
            text-[#4f2d07]
          "
        >
          <FaAnchor className="inline mr-2" />
          항해 시작
          <FaAnchor className="inline ml-2" />
        </button>
      </div>

      {/* 하단 */}
      <div className="start-bottom">
        <div className="flex gap-3 items-center text-[rgba(201,148,42,.3)]">
          <FaShip className="start-ship" />

          <span className="font-cinzel start-footer-text tracking-widest">
            ✦ ☠ SAIL THE SEAS ☠ ✦
          </span>

          <FaShip className="start-ship scale-x-[-1]" />
        </div>
      </div>
    </div>
  );
}
