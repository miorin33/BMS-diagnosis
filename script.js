// 各カテゴリの合計点に応じた診断結果（L, M, H）の判定関数
function getDiagnosis(score) {
  // ※各カテゴリは8問の場合の合計（最低8点～最高40点）
  if (score >= 5 && score <= 20) {
    return "L";
  } else if (score >= 21 && score <= 35) {
    return "M";
  } else if (score >= 36 && score <= 40) {
    return "H";
  } else {
    return "不明";
  }
}

// 指定したセクション内の全質問のスコアを計算する関数
function calculateSectionScore(sectionName, numQuestions) {
  let score = 0;
  for (let i = 1; i <= numQuestions; i++) {
    let radios = document.getElementsByName(sectionName + i);
    let answered = false;
    for (let radio of radios) {
      if (radio.checked) {
        score += parseInt(radio.value, 10);
        answered = true;
        break;
      }
    }
    // 未回答の場合はアラート表示して処理中断
    if (!answered) {
      alert("すべての質問に回答してください。");
      return null;
    }
  }
  return score;
}

// 各セクションの結果を格納するオブジェクト
const results = {
  body: "",
  mind: "",
  soul: ""
};

// 体セクションの「次へ」ボタン
document.getElementById("nextBody").addEventListener("click", function() {
  const score = calculateSectionScore("body", 8);
  if (score === null) return;
  results.body = getDiagnosis(score);
  // 体セクションを非表示にして心セクションを表示
  document.getElementById("section-body").classList.remove("active");
  document.getElementById("section-mind").classList.add("active");
});

// 心セクションの「次へ」ボタン
document.getElementById("nextMind").addEventListener("click", function() {
  const score = calculateSectionScore("mind", 8);
  if (score === null) return;
  results.mind = getDiagnosis(score);
  // 心セクションを非表示にして魂セクションを表示
  document.getElementById("section-mind").classList.remove("active");
  document.getElementById("section-soul").classList.add("active");
});

// 魂セクションの「診断結果を表示」ボタン
document.getElementById("finish").addEventListener("click", function() {
  const score = calculateSectionScore("soul", 8);
  if (score === null) return;
  results.soul = getDiagnosis(score);
  // 全てのセクションを非表示にして結果を表示
  document.getElementById("section-soul").classList.remove("active");
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `
    <h2>BMS 体、心、魂の健康診断</h2>
    <p style="font-size:18px;">体：${results.body}　心：${results.mind}　魂：${results.soul}</p>
    <a href="https://o09guhda.autosns.app/cp/JLvSX32Zaq?uid=[[uid]]" target="_blank" style="display:inline-block; margin-top:20px;">
      <img src="https://f.yourl.jp/5a23aca7/" alt="診断結果詳細" style="max-width:100%; height:auto;">
    </a>
  `;
});
