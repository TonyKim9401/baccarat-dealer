import React, { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Clock, Globe } from "lucide-react";

const SUITS = ["♠", "♥", "♦", "♣"];
const RANKS = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

const TRANSLATIONS = {
  ko: {
    title: "바카라 딜러 연습",
    player: "Player",
    banker: "Banker",
    score: "점수",
    pause: "일시정지",
    autoPlay: "자동진행",
    nextStep: "다음 단계",
    newGame: "새 게임",
    speed: "속도",
    nextAction: "다음 액션",
    recentHistory: "최근 기록",
    playerWin: "Player 승리",
    bankerWin: "Banker 승리",
    tie: "Tie",
    vs: "대",
    clickToSeeHint: "클릭해서 다음 액션 확인",
    natural: "Natural! 게임 종료",
    playerDraw: "Player에게 3번째 카드 지급",
    playerStand: "Player는 Stand. Banker 확인 필요",
    bankerDraw: "Banker에게 3번째 카드 지급",
    bankerStand: "Banker는 Stand. 게임 종료",
    bothStand: "Banker도 Stand. 게임 종료",
    gameEnd: "게임 종료",
  },
  en: {
    title: "Baccarat Dealer Practice",
    player: "Player",
    banker: "Banker",
    score: "Score",
    pause: "Pause",
    autoPlay: "Auto Play",
    nextStep: "Next Step",
    newGame: "New Game",
    speed: "Speed",
    nextAction: "Next Action",
    recentHistory: "Recent History",
    playerWin: "Player Wins",
    bankerWin: "Banker Wins",
    tie: "Tie",
    vs: "vs",
    clickToSeeHint: "Click to see next action",
    natural: "Natural! Game Over",
    playerDraw: "Deal 3rd card to Player",
    playerStand: "Player stands. Check Banker",
    bankerDraw: "Deal 3rd card to Banker",
    bankerStand: "Banker stands. Game Over",
    bothStand: "Banker stands. Game Over",
    gameEnd: "Game Over",
  },
  ja: {
    title: "バカラディーラー練習",
    player: "プレイヤー",
    banker: "バンカー",
    score: "スコア",
    pause: "一時停止",
    autoPlay: "自動進行",
    nextStep: "次のステップ",
    newGame: "新しいゲーム",
    speed: "速度",
    nextAction: "次のアクション",
    recentHistory: "最近の記録",
    playerWin: "プレイヤー勝利",
    bankerWin: "バンカー勝利",
    tie: "引き分け",
    vs: "対",
    clickToSeeHint: "クリックして次のアクションを確認",
    natural: "ナチュラル！ゲーム終了",
    playerDraw: "プレイヤーに3枚目を配る",
    playerStand: "プレイヤーはスタンド。バンカー確認",
    bankerDraw: "バンカーに3枚目を配る",
    bankerStand: "バンカーはスタンド。ゲーム終了",
    bothStand: "バンカーもスタンド。ゲーム終了",
    gameEnd: "ゲーム終了",
  },
  zh: {
    title: "百家乐荷官练习",
    player: "闲家",
    banker: "庄家",
    score: "点数",
    pause: "暂停",
    autoPlay: "自动进行",
    nextStep: "下一步",
    newGame: "新游戏",
    speed: "速度",
    nextAction: "下一步操作",
    recentHistory: "最近记录",
    playerWin: "闲家胜",
    bankerWin: "庄家胜",
    tie: "和局",
    vs: "对",
    clickToSeeHint: "点击查看下一步操作",
    natural: "天牌！游戏结束",
    playerDraw: "给闲家发第3张牌",
    playerStand: "闲家停牌。检查庄家",
    bankerDraw: "给庄家发第3张牌",
    bankerStand: "庄家停牌。游戏结束",
    bothStand: "庄家也停牌。游戏结束",
    gameEnd: "游戏结束",
  },
  vi: {
    title: "Luyện tập Chia bài Baccarat",
    player: "Player",
    banker: "Banker",
    score: "Điểm",
    pause: "Tạm dừng",
    autoPlay: "Tự động",
    nextStep: "Bước tiếp theo",
    newGame: "Ván mới",
    speed: "Tốc độ",
    nextAction: "Hành động tiếp theo",
    recentHistory: "Lịch sử gần đây",
    playerWin: "Player thắng",
    bankerWin: "Banker thắng",
    tie: "Hòa",
    vs: "vs",
    clickToSeeHint: "Nhấp để xem hành động tiếp theo",
    natural: "Natural! Kết thúc",
    playerDraw: "Chia lá thứ 3 cho Player",
    playerStand: "Player dừng. Kiểm tra Banker",
    bankerDraw: "Chia lá thứ 3 cho Banker",
    bankerStand: "Banker dừng. Kết thúc",
    bothStand: "Banker cũng dừng. Kết thúc",
    gameEnd: "Kết thúc",
  },
};

const Card = ({ suit, rank, hidden }) => {
  const isRed = suit === "♥" || suit === "♦";

  if (hidden) {
    return (
      <div className="w-16 h-24 bg-blue-600 rounded-lg border-2 border-blue-800 flex items-center justify-center">
        <div className="w-12 h-20 border-2 border-white rounded"></div>
      </div>
    );
  }

  return (
    <div className="w-16 h-24 bg-white rounded-lg border-2 border-gray-800 flex flex-col items-center justify-between p-2 shadow-lg">
      <div
        className={`text-xl font-bold ${isRed ? "text-red-600" : "text-black"}`}
      >
        {rank}
      </div>
      <div className={`text-3xl ${isRed ? "text-red-600" : "text-black"}`}>
        {suit}
      </div>
      <div
        className={`text-xl font-bold ${isRed ? "text-red-600" : "text-black"}`}
      >
        {rank}
      </div>
    </div>
  );
};

export default function BaccaratDealer() {
  const [deck, setDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [bankerHand, setBankerHand] = useState([]);
  const [step, setStep] = useState(0);
  const [speed, setSpeed] = useState(1000);
  const [isPlaying, setIsPlaying] = useState(false);
  const [result, setResult] = useState(null);
  const [correctAction, setCorrectAction] = useState("");
  const [history, setHistory] = useState([]);
  const [language, setLanguage] = useState("ko");
  const [showHint, setShowHint] = useState(false);

  const t = TRANSLATIONS[language];

  const createDeck = () => {
    const newDeck = [];
    for (let i = 0; i < 8; i++) {
      for (const suit of SUITS) {
        for (const rank of RANKS) {
          newDeck.push({ suit, rank, id: `${suit}-${rank}-${i}` });
        }
      }
    }
    return newDeck.sort(() => Math.random() - 0.5);
  };

  const getCardValue = (card) => {
    if (card.rank === "A") return 1;
    if (["J", "Q", "K", "10"].includes(card.rank)) return 0;
    return parseInt(card.rank);
  };

  const calculateScore = (hand) => {
    return hand.reduce((sum, card) => sum + getCardValue(card), 0) % 10;
  };

  const shouldPlayerDrawThird = (playerScore) => {
    return playerScore <= 5;
  };

  const shouldBankerDrawThird = (bankerScore, playerThirdCard) => {
    if (bankerScore >= 7) return false;
    if (bankerScore <= 2) return true;

    if (playerThirdCard === null) {
      return bankerScore <= 5;
    }

    const thirdValue = getCardValue(playerThirdCard);

    if (bankerScore === 3) return thirdValue !== 8;
    if (bankerScore === 4) return thirdValue >= 2 && thirdValue <= 7;
    if (bankerScore === 5) return thirdValue >= 4 && thirdValue <= 7;
    if (bankerScore === 6) return thirdValue === 6 || thirdValue === 7;

    return false;
  };

  const determineWinner = (playerScore, bankerScore) => {
    if (playerScore > bankerScore) return t.playerWin;
    if (bankerScore > playerScore) return t.bankerWin;
    return t.tie;
  };

  const newGame = () => {
    const newDeck = createDeck();
    setDeck(newDeck);
    setPlayerHand([]);
    setBankerHand([]);
    setStep(0);
    setResult(null);
    setCorrectAction("");
    setIsPlaying(false);
  };

  const nextStep = () => {
    setShowHint(false);
    if (step === 0) {
      const newPlayerHand = [deck[0], deck[2]];
      const newBankerHand = [deck[1], deck[3]];
      setPlayerHand(newPlayerHand);
      setBankerHand(newBankerHand);
      setDeck(deck.slice(4));
      setStep(1);

      const pScore = calculateScore(newPlayerHand);
      const bScore = calculateScore(newBankerHand);

      if (pScore >= 8 || bScore >= 8) {
        setCorrectAction(t.natural);
        setResult(determineWinner(pScore, bScore));
        setStep(4);
      } else if (shouldPlayerDrawThird(pScore)) {
        setCorrectAction(t.playerDraw);
      } else {
        setCorrectAction(t.playerStand);
        setStep(2.5);
      }
    } else if (step === 1) {
      const pScore = calculateScore(playerHand);
      if (shouldPlayerDrawThird(pScore)) {
        const newCard = deck[0];
        setPlayerHand([...playerHand, newCard]);
        setDeck(deck.slice(1));
        setStep(2);

        const bScore = calculateScore(bankerHand);
        if (shouldBankerDrawThird(bScore, newCard)) {
          setCorrectAction(t.bankerDraw);
        } else {
          setCorrectAction(t.bankerStand);
          const finalPScore = calculateScore([...playerHand, newCard]);
          setResult(determineWinner(finalPScore, bScore));
          setStep(4);
        }
      }
    } else if (step === 2) {
      const bScore = calculateScore(bankerHand);
      const playerThird = playerHand[2] || null;

      if (shouldBankerDrawThird(bScore, playerThird)) {
        const newCard = deck[0];
        setBankerHand([...bankerHand, newCard]);
        setDeck(deck.slice(1));
        setStep(3);

        const finalPScore = calculateScore(playerHand);
        const finalBScore = calculateScore([...bankerHand, newCard]);
        setResult(determineWinner(finalPScore, finalBScore));
        setCorrectAction(t.gameEnd);
        setStep(4);
      }
    } else if (step === 2.5) {
      const bScore = calculateScore(bankerHand);
      if (shouldBankerDrawThird(bScore, null)) {
        const newCard = deck[0];
        setBankerHand([...bankerHand, newCard]);
        setDeck(deck.slice(1));
        const finalPScore = calculateScore(playerHand);
        const finalBScore = calculateScore([...bankerHand, newCard]);
        setResult(determineWinner(finalPScore, finalBScore));
        setCorrectAction(t.gameEnd);
        setStep(4);
      } else {
        const finalPScore = calculateScore(playerHand);
        const finalBScore = calculateScore(bankerHand);
        setResult(determineWinner(finalPScore, finalBScore));
        setCorrectAction(t.bothStand);
        setStep(4);
      }
    } else if (step === 4) {
      const finalPScore = calculateScore(playerHand);
      const finalBScore = calculateScore(bankerHand);
      setHistory([
        {
          player: finalPScore,
          banker: finalBScore,
          result: result,
        },
        ...history.slice(0, 9),
      ]);

      const newDeck = createDeck();
      setDeck(newDeck);
      setPlayerHand([]);
      setBankerHand([]);
      setStep(0);
      setResult(null);
      setCorrectAction("");
    }
  };

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        nextStep();
      }, speed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, step, speed, playerHand, bankerHand, deck, t]);

  useEffect(() => {
    newGame();
  }, []);

  const playerScore = calculateScore(playerHand);
  const bankerScore = calculateScore(bankerHand);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 to-green-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-green-700 rounded-lg shadow-2xl p-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold text-white">🎴 {t.title}</h1>
              <div className="flex items-center gap-2 bg-green-600 px-3 py-2 rounded-lg">
                <Globe size={20} className="text-white" />
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-transparent text-white border-none outline-none cursor-pointer"
                >
                  <option value="ko">한국어</option>
                  <option value="en">English</option>
                  <option value="ja">日本語</option>
                  <option value="zh">中文</option>
                  <option value="vi">Tiếng Việt</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                {isPlaying ? t.pause : t.autoPlay}
              </button>
              <button
                onClick={nextStep}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                {t.nextStep}
              </button>
              <button
                onClick={newGame}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <RotateCcw size={20} />
                {t.newGame}
              </button>
            </div>
          </div>

          <div className="mb-6 flex items-center gap-4">
            <Clock size={20} className="text-white" />
            <input
              type="range"
              min="300"
              max="3000"
              step="100"
              value={speed}
              onChange={(e) => setSpeed(parseInt(e.target.value))}
              className="w-48"
            />
            <span className="text-white">
              {(speed / 1000).toFixed(1)}
              {language === "en"
                ? "s"
                : language === "zh"
                ? "秒"
                : language === "ja"
                ? "秒"
                : language === "vi"
                ? "giây"
                : "초"}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8">
            <div className="bg-blue-900 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-4">
                👤 {t.player} ({t.score}: {playerScore})
              </h2>
              <div className="flex gap-3">
                {playerHand.map((card) => (
                  <Card key={card.id} {...card} />
                ))}
              </div>
            </div>

            <div className="bg-red-900 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-4">
                🏦 {t.banker} ({t.score}: {bankerScore})
              </h2>
              <div className="flex gap-3">
                {bankerHand.map((card) => (
                  <Card key={card.id} {...card} />
                ))}
              </div>
            </div>
          </div>

          {correctAction && (
            <div
              onClick={() => setShowHint(!showHint)}
              className="bg-yellow-400 text-black px-6 py-3 rounded-lg mb-6 font-bold text-center cursor-pointer hover:bg-yellow-500 transition-colors"
            >
              {showHint ? (
                <div>
                  📋 {t.nextAction}: {correctAction}
                </div>
              ) : (
                <div>👆 {t.clickToSeeHint}</div>
              )}
            </div>
          )}

          {result && (
            <div
              className={`text-center py-6 rounded-lg text-2xl font-bold ${
                result === t.playerWin
                  ? "bg-blue-500"
                  : result === t.bankerWin
                  ? "bg-red-500"
                  : "bg-gray-500"
              } text-white mb-6`}
            >
              🏆 {playerScore} {t.vs} {bankerScore} {result}
            </div>
          )}

          {history.length > 0 && (
            <div className="bg-green-800 rounded-lg p-4">
              <h3 className="text-white font-bold mb-2">
                📊 {t.recentHistory}
              </h3>
              <div className="flex gap-2 overflow-x-auto">
                {history.map((h, idx) => (
                  <div
                    key={idx}
                    className={`px-3 py-2 rounded text-white text-sm whitespace-nowrap ${
                      h.result === t.playerWin
                        ? "bg-blue-600"
                        : h.result === t.bankerWin
                        ? "bg-red-600"
                        : "bg-gray-600"
                    }`}
                  >
                    P:{h.player} B:{h.banker}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
