export const INITIAL_BONUS_DATA = {
  coloredCard: 0,
  black14: false,
  pirateCatchMermaid: 0,
  skullKingCatchPirate: 0,
  mermaidCatchSkullKing: false,
};

export function calculateRoundScore(round, prediction, success) {
  if (prediction === 0) {
    return success === 0 ? round * 10 : -(round * 10);
  }

  if (prediction === success) {
    return prediction * 20;
  }

  return -Math.abs(prediction - success) * 10;
}

export function calculateBonusScore(bonusData) {
  if (!bonusData) return 0;

  return (
    bonusData.coloredCard * 10 +
    (bonusData.black14 ? 20 : 0) +
    bonusData.pirateCatchMermaid * 20 +
    bonusData.skullKingCatchPirate * 30 +
    (bonusData.mermaidCatchSkullKing ? 40 : 0)
  );
}

export const createPlayer = () => ({
  name: "",
  prediction: 0,
  success: 0,

  totalScore: 0,

  currentRoundScore: 0,
  currentBonusScore: 0,

  bonusData: { ...INITIAL_BONUS_DATA },

  roundScores: [],
});
