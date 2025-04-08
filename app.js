/**
 * 财富自由计算器 - 增强版
 * 功能：财务阶段计算、投资收益预测、主题切换、粒子动画等
 */

let stages = [];
const STORAGE_KEY = 'wealth_freedom_data';

// ============================================
// 初始化
// ============================================

document.addEventListener("DOMContentLoaded", function () {
  initParticles();
  initTheme();
  initSlider();
  loadStagesData();
  loadSavedData();
});

// 加载财富阶段数据
function loadStagesData() {
  fetch("stages.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      stages = data;
      console.log("✅ 财务阶段数据加载成功");
    })
    .catch((error) => {
      console.error("❌ 加载财务阶段数据失败:", error);
      showToast("无法加载财务阶段数据，请刷新页面重试！", "error");
    });
}

// ============================================
// 粒子动画
// ============================================

function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const particleCount = 30;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 20 + 's';
    particle.style.animationDuration = (15 + Math.random() * 15) + 's';
    particle.style.opacity = Math.random() * 0.5 + 0.1;
    container.appendChild(particle);
  }
}

// ============================================
// 主题切换
// ============================================

function initTheme() {
  const toggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme') || 'dark';

  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  toggle?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  const toggle = document.getElementById('themeToggle');
  if (!toggle) return;

  const icon = toggle.querySelector('i');
  if (theme === 'dark') {
    icon.className = 'fas fa-moon';
  } else {
    icon.className = 'fas fa-sun';
  }
}

// ============================================
// 滑块控件
// ============================================

function initSlider() {
  const slider = document.getElementById('investmentReturn');
  const valueDisplay = document.getElementById('returnValue');

  if (!slider || !valueDisplay) return;

  slider.addEventListener('input', () => {
    valueDisplay.textContent = slider.value + '%';
    updateSliderBackground(slider);
  });

  updateSliderBackground(slider);
}

function updateSliderBackground(slider) {
  const value = (slider.value - slider.min) / (slider.max - slider.min) * 100;
  slider.style.background = `linear-gradient(to right, #6366f1 0%, #818cf8 ${value}%, rgba(255,255,255,0.1) ${value}%)`;
}

// ============================================
// 本地存储
// ============================================

function loadSavedData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    const data = JSON.parse(saved);

    if (data.age) document.getElementById('age').value = data.age;
    if (data.assets) document.getElementById('assets').value = data.assets;
    if (data.monthlyIncome) document.getElementById('monthlyIncome').value = data.monthlyIncome;
    if (data.monthlyExpenditure) document.getElementById('monthlyExpenditure').value = data.monthlyExpenditure;
    if (data.investmentReturn) {
      document.getElementById('investmentReturn').value = data.investmentReturn;
      document.getElementById('returnValue').textContent = data.investmentReturn + '%';
      updateSliderBackground(document.getElementById('investmentReturn'));
    }
  } catch (e) {
    console.warn("无法加载保存的数据:", e);
  }
}

function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn("无法保存数据:", e);
  }
}

// ============================================
// 表单提交处理
// ============================================

document.getElementById("financial-form").addEventListener("submit", function (event) {
  event.preventDefault();

  if (stages.length === 0) {
    showToast("财务阶段数据尚未加载完成，请稍后再试！", "warning");
    return;
  }

  calculateFinancialFreedom();
});

// ============================================
// 核心计算逻辑
// ============================================

function calculateFinancialFreedom() {
  clearResult();

  // 获取输入值
  const age = parseInt(document.getElementById("age").value);
  const assets = parseFloat(document.getElementById("assets").value);
  const monthlyIncome = parseFloat(document.getElementById("monthlyIncome").value);
  const monthlyExpenditure = parseFloat(document.getElementById("monthlyExpenditure").value);
  const investmentReturn = parseFloat(document.getElementById("investmentReturn").value) / 100;

  // 验证输入
  if (isNaN(assets) || isNaN(monthlyIncome) || isNaN(monthlyExpenditure) || isNaN(age)) {
    showToast("请输入有效数字", "error");
    return;
  }

  if (age < 0 || age > 100) {
    showToast("请输入有效的年龄（0-100）", "error");
    return;
  }

  // 保存输入数据
  saveData({ age, assets, monthlyIncome, monthlyExpenditure, investmentReturn: investmentReturn * 100 });

  // 计算核心数据
  const annualSavings = (monthlyIncome - monthlyExpenditure) * 12;
  const annualIncome = monthlyIncome * 12;
  const savingsRate = annualIncome > 0 ? (annualSavings / annualIncome) * 100 : 0;
  const survivalMonths = monthlyExpenditure > 0 ? Math.floor(assets / monthlyExpenditure) : Infinity;

  // 确定当前和未来阶段
  // 使用当前净资产作为判定基准，更直观反映当前状态
  let { currentStage, nextStage, futureStages } = determineAllStages(assets);

  // 计算到达各阶段所需时间（从当前的 assets 开始计算，直到达到未来的目标）
  const futureStagesWithTime = calculateTimeToAllStages(
    assets,
    annualSavings,
    investmentReturn,
    futureStages,
    age
  );

  // 显示结果
  showResult({
    currentStage,
    nextStage,
    futureStages: futureStagesWithTime,
    advice: currentStage.advice,
    annualSavings,
    savingsRate,
    survivalMonths,
    assets,
    investmentReturn,
    monthlyExpenditure
  });
}

// ============================================
// 阶段判定
// ============================================

function determineAllStages(assets) {
  let currentStage = null;
  let nextStage = null;
  let currentIndex = 0;

  for (let i = 0; i < stages.length; i++) {
    if (assets >= stages[i].minAssets) {
      currentStage = stages[i];
      currentIndex = i;
    } else {
      break;
    }
  }

  // 默认为第一个阶段
  if (currentStage === null) {
    currentStage = stages[0];
    currentIndex = 0;
  }

  // 下一阶段
  if (currentIndex + 1 < stages.length) {
    nextStage = stages[currentIndex + 1];
  }

  // 未来阶段
  const futureStages = stages.slice(currentIndex + 1);

  return { currentStage, nextStage, futureStages };
}

// ============================================
// 时间计算（考虑复利）
// ============================================

function calculateTimeToAllStages(currentAssets, annualSavings, investmentReturn, futureStages, currentAge) {
  const results = [];
  let tempAssets = currentAssets;
  let totalYears = 0;
  // 计算最多能模拟到100岁
  const maxSimYears = Math.max(0, 100 - currentAge);

  // 复制待达成的阶段列表
  let stagesToAchieve = [...futureStages];

  if (stagesToAchieve.length === 0) return [];

  // 处理无法达成的情况
  if (annualSavings <= 0 && investmentReturn <= 0) {
    return futureStages.map(s => ({ ...s, yearsToReach: "需增加储蓄", unreachable: true }));
  }

  // 模拟逐年增长
  while (stagesToAchieve.length > 0 && totalYears < maxSimYears) {
    totalYears++;
    // 计算一年后的资产 (上年资产 + 年储蓄) * (1 + 收益率)
    tempAssets = (tempAssets + annualSavings) * (1 + investmentReturn);

    // 检查是否在此年度内达到了一个或多个阶段
    // 使用 while 是因为一年内可能跨越多个阶段（尤其是早期阶段）
    while (stagesToAchieve.length > 0 && tempAssets >= stagesToAchieve[0].minAssets) {
      const stage = stagesToAchieve.shift();

      // 记录从“现在”开始的总年数
      const yearsDisplay = `${totalYears.toFixed(1)} 年`;
      const ageAtArrival = (currentAge + totalYears) + " 岁";

      results.push({
        ...stage,
        yearsToReach: yearsDisplay,
        totalYears: totalYears,
        ageAtArrival: ageAtArrival
      });
    }
  }

  // 标记未能在限制时间内达成的阶段
  while (stagesToAchieve.length > 0) {
    const stage = stagesToAchieve.shift();
    const limitText = "无法达成，可能人已经嘎了！";
    results.push({
      ...stage,
      yearsToReach: limitText,
      unreachable: true
    });
  }

  return results;
}

// ============================================
// 清空结果
// ============================================

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

// ============================================
// 显示结果
// ============================================

function showResult(data) {
  const resultDiv = document.getElementById("result");

  // 更新财务摘要
  updateFinancialSummary(data);

  // 更新当前阶段
  updateCurrentStage(data.currentStage);

  // 更新进度条
  updateProgressBar(data);

  // 更新建议 (自动在序号前换行)
  const advicePara = document.querySelector(".advice p");
  advicePara.innerText = data.advice.replace(/([①-⑨⑩])/g, '\n$1').trim();

  // 更新阶段表格
  updateStagesTable(data.futureStages);

  // 显示结果区域
  resultDiv.classList.remove("hidden");

  // 滚动到结果区域
  setTimeout(() => {
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

// ============================================
// 更新财务摘要
// ============================================

function updateFinancialSummary(data) {
  // 净资产
  document.getElementById('summaryAssets').textContent = formatCurrency(data.assets);

  // 年储蓄
  const savingsEl = document.getElementById('summaryAnnualSavings');
  const savingsItem = document.getElementById('savingsItem');
  savingsEl.textContent = formatCurrency(data.annualSavings);

  if (data.annualSavings > 0) {
    savingsEl.classList.add('positive');
    savingsEl.classList.remove('negative');
    savingsItem.classList.add('positive');
    savingsItem.classList.remove('negative');
  } else {
    savingsEl.classList.add('negative');
    savingsEl.classList.remove('positive');
    savingsItem.classList.add('negative');
    savingsItem.classList.remove('positive');
  }

  // 储蓄率
  const rateEl = document.getElementById('summarySavingsRate');
  const rateItem = document.getElementById('savingsRateItem');
  rateEl.textContent = data.savingsRate.toFixed(1) + '%';
  rateEl.classList.remove('positive', 'negative');
  if (data.savingsRate >= 30) {
    rateEl.classList.add('positive');
    rateItem.classList.add('positive');
  } else if (data.savingsRate < 0) {
    rateEl.classList.add('negative');
    rateItem.classList.add('negative');
  }

  // 可支撑月数
  const survivalEl = document.getElementById('summarySurvivalMonths');
  if (data.survivalMonths === Infinity) {
    survivalEl.textContent = '∞';
  } else if (data.survivalMonths >= 12) {
    const yrs = Math.floor(data.survivalMonths / 12);
    const mos = data.survivalMonths % 12;
    survivalEl.textContent = mos > 0 ? `${yrs} 年 ${mos} 月` : `${yrs} 年`;
  } else {
    survivalEl.textContent = data.survivalMonths + ' 月';
  }

  // 预计年投资收益
  const investReturnEl = document.getElementById('summaryInvestReturn');
  const investReturnItem = document.getElementById('investReturnItem');
  const annualInvestReturn = data.assets * data.investmentReturn;
  investReturnEl.textContent = formatCurrency(annualInvestReturn);
  investReturnItem.classList.remove('positive', 'negative', 'neutral');
  if (annualInvestReturn > 0) {
    investReturnItem.classList.add('positive');
    investReturnEl.classList.add('positive');
    investReturnEl.classList.remove('negative');
  } else if (annualInvestReturn < 0) {
    investReturnItem.classList.add('negative');
    investReturnEl.classList.add('negative');
    investReturnEl.classList.remove('positive');
  } else {
    investReturnItem.classList.add('neutral');
  }

  // 日均消费
  const gapEl = document.getElementById('summaryGap');
  const gapItem = document.getElementById('gapItem');
  gapItem.classList.remove('positive', 'negative', 'neutral');

  // 计算日均消费 = 月支出 / 30
  const dailyExpense = data.monthlyExpenditure / 30;
  gapEl.textContent = formatCurrency(dailyExpense);
  gapItem.classList.add('neutral');
}


// ============================================
// 更新当前阶段
// ============================================

function updateCurrentStage(currentStage) {
  const resultDiv = document.getElementById("result");
  const stageTitle = resultDiv.querySelector(".stage-title");
  const stageName = resultDiv.querySelector(".stage-name");
  const description = resultDiv.querySelector(".description");
  const stageTags = resultDiv.querySelector(".stage-tags");

  stageTitle.textContent = currentStage.title;
  stageName.textContent = currentStage.name;
  description.textContent = currentStage.description;

  // 生成标签
  const tagColors = ['magenta', 'cyan', 'orange', 'green', 'purple', 'blue'];
  stageTags.innerHTML = currentStage.tag
    .map((tag, index) => {
      const color = tagColors[index % tagColors.length];
      return `<span class="tag ${color}">${tag}</span>`;
    })
    .join("");
}

// ============================================
// 更新进度条
// ============================================

function updateProgressBar(data) {
  const progressSection = document.getElementById('progressSection');
  const progressBar = document.getElementById('progressBar');
  const progressCurrent = document.getElementById('progressCurrent');
  const progressTarget = document.getElementById('progressTarget');
  const progressAnnualSavings = document.getElementById('progressAnnualSavings');
  const progressTimeEstimate = document.getElementById('progressTimeEstimate');

  if (!data.nextStage) {
    progressSection.style.display = 'none';
    return;
  }

  progressSection.style.display = 'block';

  const current = data.assets;
  const annualSavings = data.annualSavings;
  const amountAfterYear = current + annualSavings;
  const currentStageMin = data.currentStage.minAssets;
  const target = data.nextStage.minAssets;

  // 计算进度百分比（考虑本年结余后的进度）
  // 使用 (当前资产 + 本年结余) 来计算在当前阶段内的进度，更具动态感
  const progress = Math.min(100, Math.max(0,
    ((amountAfterYear - currentStageMin) / (target - currentStageMin)) * 100
  ));

  // 更新年结余标签和目标标签
  if (progressCurrent.childNodes[1]) {
    progressCurrent.childNodes[1].textContent = " 年结余: ";
  }
  progressAnnualSavings.textContent = formatCurrency(data.annualSavings);
  progressTarget.childNodes[0].textContent = `目标: ${formatCurrency(target)} (${data.nextStage.name}) `;

  // 计算达到下一阶段需要的时间
  const gap = target - current;
  if (gap <= 0) {
    progressTimeEstimate.textContent = '已达成!';
  } else if (data.annualSavings <= 0 && data.investmentReturn <= 0) {
    progressTimeEstimate.textContent = '需增加储蓄';
  } else {
    // 考虑投资收益的复利计算
    const r = data.investmentReturn; // data.investmentReturn 已经是小数 (如 0.05)
    if (r > 0) {
      // 使用复利公式估算
      let years = 0;
      let projected = current;
      const userAge = parseInt(document.getElementById("age").value);
      const remainingYears = Math.max(0, 100 - userAge);

      while (projected < target && years < remainingYears) {
        projected = projected * (1 + r) + annualSavings;
        years++;
      }
      if (projected < target && years >= remainingYears) {
        progressTimeEstimate.textContent = '超出 100 岁';
      } else if (years === 1) {
        const months = Math.ceil(gap / (annualSavings / 12 + current * r / 12));
        progressTimeEstimate.textContent = `约${Math.min(12, months)}个月`;
      } else {
        progressTimeEstimate.textContent = `约${years}年`;
      }
    } else {
      // 无投资收益，简单计算
      const years = gap / annualSavings;
      const userAge = parseInt(document.getElementById("age").value);
      if (userAge + years >= 100) {
        progressTimeEstimate.textContent = '超出 100 岁';
      } else if (years < 1) {
        progressTimeEstimate.textContent = `约${Math.ceil(years * 12)}个月`;
      } else {
        progressTimeEstimate.textContent = `约${years.toFixed(1)}年`;
      }
    }
  }

  // 动画显示进度条
  progressBar.style.width = '0%'; // 先重置
  setTimeout(() => {
    progressBar.style.width = progress + '%';
  }, 100);
}

// ============================================
// 更新阶段表格
// ============================================

function updateStagesTable(futureStages) {
  const stagesTable = document.getElementById("stages-table").querySelector("tbody");
  stagesTable.innerHTML = "";

  if (futureStages.length === 0) {
    stagesTable.innerHTML = `
      <tr>
        <td colspan="3" style="text-align: center; padding: 30px;">
          <i class="fas fa-crown" style="font-size: 2rem; color: #fbbf24; margin-bottom: 10px; display: block;"></i>
          恭喜！您已达到最高财务自由阶段 🎉
        </td>
      </tr>
    `;
    return;
  }

  futureStages.forEach((stage) => {
    const row = document.createElement("tr");

    // 根据状态添加样式类
    if (stage.achieved) {
      row.classList.add('achieved');
    } else if (stage.unreachable) {
      row.classList.add('unreachable');
    }

    const yearsText = typeof stage.yearsToReach === "number"
      ? `${stage.yearsToReach} 年`
      : stage.yearsToReach;

    const ageInfo = stage.ageAtArrival ? ` (${stage.ageAtArrival})` : '';

    row.innerHTML = `
      <td><i class="fas ${stage.icon}"></i> ${stage.name}</td>
      <td>${formatCurrency(stage.minAssets)}</td>
      <td>${yearsText}${ageInfo}</td>
    `;

    stagesTable.appendChild(row);
  });
}

// ============================================
// 工具函数
// ============================================

function formatCurrency(value) {
  const absValue = Math.abs(value);
  let formatted;

  if (absValue >= 100000000) {
    formatted = (absValue / 100000000).toFixed(2) + ' 亿';
  } else if (absValue >= 10000) {
    formatted = (absValue / 10000).toFixed(2) + ' 万';
  } else {
    formatted = absValue.toLocaleString('zh-CN');
  }

  return (value < 0 ? '-' : '') + '¥' + formatted;
}

function showToast(message, type = 'info') {
  // 移除已有的 toast
  const existingToast = document.querySelector('.toast');
  if (existingToast) {
    existingToast.remove();
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;

  // 根据类型设置样式
  if (type === 'error') {
    toast.style.borderLeft = '4px solid #f87171';
  } else if (type === 'warning') {
    toast.style.borderLeft = '4px solid #fbbf24';
  } else {
    toast.style.borderLeft = '4px solid #6366f1';
  }

  document.body.appendChild(toast);

  // 显示动画
  setTimeout(() => toast.classList.add('show'), 10);

  // 自动隐藏
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ============================================
// 输入格式化（可选）
// ============================================

// 添加键盘快捷键支持
document.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + Enter 提交表单
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    document.getElementById('financial-form').dispatchEvent(new Event('submit'));
  }
});