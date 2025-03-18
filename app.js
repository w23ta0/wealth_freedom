let stages = [];

document.addEventListener("DOMContentLoaded", function () {
  fetch("stages.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      stages = data;
    })
    .catch((error) => {
      console.error("Error loading stages data:", error);
      alert("无法加载财务阶段数据，请检查网络连接或文件路径！");
    });
});

document.getElementById("financial-form").addEventListener("submit", function (event) {
  event.preventDefault();
  if (stages.length === 0) {
    alert("财务阶段数据尚未加载完成，请稍后再试！");
    return;
  }
  calculateFinancialFreedom();
});

function calculateFinancialFreedom() {
  clearResult();
  const assets = parseFloat(document.getElementById("assets").value);
  const monthlyIncome = parseFloat(document.getElementById("monthlyIncome").value);
  const monthlyExpenditure = parseFloat(document.getElementById("monthlyExpenditure").value);
  const age = parseInt(document.getElementById("age").value);

  if (isNaN(assets) || isNaN(monthlyIncome) || isNaN(monthlyExpenditure) || isNaN(age)) {
    alert("请输入有效数字");
    return;
  }
  if (age < 0 || age > 100) {
    alert("请输入有效的年龄（0-100）");
    return;
  }

  const annualSavings = (monthlyIncome - monthlyExpenditure) * 12;
  const { currentStage, futureStages } = determineAllStages(assets);
  const futureStagesWithTime = calculateTimeToAllStages(
    assets,
    annualSavings,
    futureStages,
    age
  );

  showResult({
    currentStage,
    futureStages: futureStagesWithTime,
    advice: currentStage.advice, // 直接从当前阶段获取建议
    annualSavings,
  });
}

function clearResult() {
  const resultDiv = document.getElementById("result");
  const stageTitle = resultDiv.querySelector(".stage-title");
  const stageName = resultDiv.querySelector(".stage-name");
  const description = resultDiv.querySelector(".description");
  const advicePara = resultDiv.querySelector(".advice p");
  const stagesTable = document.getElementById("stages-table").querySelector("tbody");
  const stageTags = resultDiv.querySelector(".stage-tags");

  stageTitle.textContent = "";
  stageName.textContent = "";
  description.textContent = "";
  advicePara.textContent = "";
  stagesTable.innerHTML = "";
  stageTags.innerHTML = "";
  resultDiv.classList.add("hidden");
}

function determineAllStages(assets) {
  let currentStage = null;
  let futureStages = [];
  for (let i = 0; i < stages.length; i++) {
    if (assets >= stages[i].minAssets) {
      currentStage = stages[i];
    } else {
      futureStages = stages.slice(i);
      break;
    }
  }
  if (currentStage === null) {
    currentStage = stages[0];
    futureStages = stages.slice(1);
  } else {
    futureStages = stages.slice(stages.indexOf(currentStage) + 1);
  }
  return { currentStage, futureStages };
}

function calculateTimeToAllStages(currentAssets, annualSavings, futureStages, currentAge) {
  let years = 0;
  let assets = currentAssets;
  const results = [];
  for (const stage of futureStages) {
    if (assets >= stage.minAssets) continue;
    const gap = stage.minAssets - assets;
    if (annualSavings <= 0) {
      results.push({ ...stage, yearsToReach: "无法达成（收支失衡）" });
      continue;
    }
    const requiredYears = gap / annualSavings;
    years += requiredYears;
    if (currentAge + years > 100) {
      results.push({ ...stage, yearsToReach: "无法达成（年龄超限）" });
      break;
    }
    results.push({ ...stage, yearsToReach: years.toFixed(2) + " 年" });
    assets = stage.minAssets;
  }
  return results;
}

function showResult(data) {
  const resultDiv = document.getElementById("result");
  const stageTitle = resultDiv.querySelector(".stage-title");
  const stageName = resultDiv.querySelector(".stage-name");
  const description = resultDiv.querySelector(".description");
  const advicePara = resultDiv.querySelector(".advice p");
  const stagesTable = document.getElementById("stages-table").querySelector("tbody");
  const stageTags = resultDiv.querySelector(".stage-tags");

  stageTitle.textContent = data.currentStage.title;
  stageName.textContent = data.currentStage.name;
  description.textContent = data.currentStage.description;
  advicePara.textContent = data.advice;

  stageTags.innerHTML = data.currentStage.tag
    .map((tag) => `<span class="tag ${getTagColor(tag)}">${tag}</span>`)
    .join("");

  function getTagColor(tag) {
    const colors = ["magenta", "cyan", "orange", "green"];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  stagesTable.innerHTML = "";
  if (data.futureStages.length === 0) {
    stagesTable.innerHTML =
      '<tr><td colspan="3" style="text-align: center;">已达到最高财务自由阶段</td></tr>';
  } else {
    data.futureStages.forEach((stage) => {
      const row = document.createElement("tr");
      const yearsContent =
        typeof stage.yearsToReach === "number"
          ? `${stage.yearsToReach} 年`
          : stage.yearsToReach;
      row.innerHTML = `
                <td><i class="fas ${stage.icon}"></i> ${stage.name}</td>
                <td>${stage.minAssets.toLocaleString()} 元</td>
                <td>${yearsContent}</td>
            `;
      stagesTable.appendChild(row);
    });
  }
  resultDiv.classList.remove("hidden");
}