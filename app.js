const stages = [
  // 负资产阶段（债务危机）
  {
    minAssets: -1000000000000, // -1000亿
    name: "银行都怕你不小心嘎了",
    title: "商业巨鳄",
    description: "债务规模超过万亿，银行风控系统已全面预警，需紧急处理资产风险",
    icon: "fas fa-globe",
    tag: ["商业大佬", "金融怪兽", "高危玩家"],
  },
  {
    minAssets: -1000000000, // -10亿
    name: "生活惬意",
    title: "公司老总",
    description: "企业破产导致个人承担连带责任，表面光鲜但债务压力巨大",
    icon: "fas fa-building",
    tag: ["破产CEO", "假富豪", "表面风光"],
  },
  {
    minAssets: -10000000, //  -1000万
    name: "供房养车",
    title: "合格成功者",
    description: "拥有车房但深陷贷款泥潭，现金流紧张难以支撑日常开支",
    icon: "fas fa-car",
    tag: ["车奴房奴", "月光族2.0", "隐形贫困人口"],
  },
  {
    minAssets: -1000000, // -100万
    name: "眼界开阔",
    title: "高度消费者",
    description: "购置不动产后入不敷出，生活质量严重依赖借贷维持",
    icon: "fas fa-house",
    tag: ["房产小白", "投资新手", "借钱买房"],
  },
  {
    minAssets: -100000, //  -10万
    name: "生活质量",
    title: "中度消费者",
    description: "追求中产生活品质，但收入难以覆盖日常消费支出",
    icon: "fas fa-star",
    tag: ["精致穷", "假装有钱", "中产幻觉"],
  },
  {
    minAssets: -10000, // -1万
    name: "没有规划",
    title: "普通消费者",
    description: "月光族状态，无储蓄计划且依赖短期借贷周转",
    icon: "fas fa-chart-line",
    tag: ["月光族", "卡奴", "借钱过日子"],
  },

  {
    minAssets: -1000, //  -1000
    name: "呼吸自由",
    title: "严重困难户",
    description: "仅能维持基本生存，无额外消费能力",
    icon: "fas fa-lungs",
    tag: ["生存模式", "勉强活着", "吃土青年"],
  },

  // 低收入阶段
  {
    minAssets: 1000, // 1000
    name: "会员自由",
    title: "贫困户",
    description: "可负担基础会员服务，但仍需精打细算",
    icon: "fas fa-user",
    tag: ["省钱达人", "优惠猎人", "经济适用"],
  },
  {
    minAssets: 10000, // 1万
    name: "菜场自由",
    title: "凡人",
    description: "可自由购买菜市场商品，无需过度关注价格",
    icon: "fas fa-shopping-basket",
    tag: ["买菜小能手", "菜篮子工程", "生活小确幸"],
  },
  {
    minAssets: 50000, // 5万
    name: "外卖自由",
    title: "都市蚁族",
    description: "可自由点外卖无需计算满减优惠",
    icon: "fas fa-hamburger",
    tag: ["干饭自由", "外卖刺客", "打工人福音"],
  },

  {
    minAssets: 100000, // 10万
    name: "奶茶自由",
    title: "都市白领",
    description: "可每天一杯星巴克不心疼",
    icon: "fas fa-coffee",
    tag: ["消费升级", "奶茶续命", "小资生活"],
  },
  {
    minAssets: 200000, // 20万
    name: "旅游自由",
    title: "金领",
    description: "可负担国内旅游和基础度假消费",
    icon: "fas fa-plane",
    tag: ["旅行达人", "度假专家", "世界那么大"],
  },
  {
    minAssets: 500000, // 50万
    name: "汽车自由",
    title: "有车一族",
    description: "可全款购置中高端汽车，无需分期压力",
    icon: "fas fa-car",
    tag: ["车神", "自驾游爱好者", "车展达人"],
  },
  // 中产阶段
  {
    minAssets: 1000000, //  100万
    name: "首付自由",
    title: "普通人极限",
    description: "可支付一线城市首付款（30%）",
    icon: "fas fa-piggy-bank",
    tag: ["房贷起步", "刚需购房"],
  },
  {
    minAssets: 2000000, // 200万
    name: "工作自由",
    title: "斜杠青年",
    description: "被动收入覆盖基本生活开支",
    icon: "fas fa-laptop-code",
    tag: ["副业刚需", "睡后收入", "FIRE运动"],
  },

  // 高净值阶段
  {
    minAssets: 5000000, // 500万
    name: "学区自由",
    title: "鸡娃家长",
    description: "可负担重点学区房或国际学校",
    icon: "fas fa-school",
    tag: ["学区房战争", "教育军备竞赛", "海淀家长"],
  },
  {
    minAssets: 10000000, // 1000万
    name: "医疗自由",
    title: "健康守护者",
    description: "可负担私立医院VIP服务及海外医疗",
    icon: "fas fa-heartbeat",
    tag: ["医疗内卷", "健康焦虑", "VIP通道"],
  },
  {
    minAssets: 30000000, // 3000万
    name: "房产自由",
    title: "包租公婆",
    description: "可在北上广深持有3套以上房产",
    icon: "fas fa-city",
    tag: ["包租婆日常", "房产投资", "收租人生"],
  },
  {
    minAssets: 100000000, // 1亿
    name: "传承自由",
    title: "家族掌门",
    description: "建立家族信托保障三代财富",
    icon: "fas fa-infinity",
    tag: ["富过三代", "信托玩家", "财富永续"],
  },
  {
    minAssets: 500000000, // 5亿
    name: "国籍自由",
    title: "地球村民",
    description: "可规划多国税务居民身份，实现资产全球化配置",
    icon: "fas fa-globe-asia",
    tag: ["移民规划", "税务优化", "跨国大佬"],
  },

  // 顶级财富
  {
    minAssets: 1000000000, // 10亿
    name: "普通人不要去想了",
    title: "隐形富豪",
    description: "资产规模远超常规认知，进入财富自由新维度",
    icon: "fas fa-space-shuttle",
    tag: ["神秘富豪", "顶级玩家", "无法想象"],
  },
];

document
  .getElementById("financial-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    calculateFinancialFreedom();
  });

function calculateFinancialFreedom() {
  clearResult();

  const assets = parseFloat(document.getElementById("assets").value);
  const monthlyIncome = parseFloat(
    document.getElementById("monthlyIncome").value
  );
  const monthlyExpenditure = parseFloat(
    document.getElementById("monthlyExpenditure").value
  );
  const age = parseInt(document.getElementById("age").value);

  if (
    isNaN(assets) ||
    isNaN(monthlyIncome) ||
    isNaN(monthlyExpenditure) ||
    isNaN(age)
  ) {
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
    advice: getAdvice(currentStage.name, age),
    annualSavings,
  });
}

function clearResult() {
  const resultDiv = document.getElementById("result");
  const stageTitle = resultDiv.querySelector(".stage-title");
  const stageName = resultDiv.querySelector(".stage-name");
  const description = resultDiv.querySelector(".description");
  const advicePara = resultDiv.querySelector(".advice p");
  const stagesTable = document
    .getElementById("stages-table")
    .querySelector("tbody");
  const annualSavingsDisplay = document.getElementById(
    "annual-savings-display"
  );
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

function calculateTimeToAllStages(
  currentAssets,
  annualSavings,
  futureStages,
  currentAge
) {
  if (futureStages.length === 0) return [];

  let assets = currentAssets;
  const results = [];
  let cumulativeYears = 0;

  for (const stage of futureStages) {
    if (assets >= stage.minAssets) continue;

    const requiredAssets = stage.minAssets;
    const gap = Math.max(requiredAssets - assets, 0); // 修正负数差额

    if (annualSavings <= 0 && gap > 0) {
      results.push({ ...stage, yearsToReach: "无法达成（收支失衡）" });
      continue;
    }

    const years = Math.ceil(gap / annualSavings);
    cumulativeYears += years;

    if (currentAge + cumulativeYears > 100) {
      results.push({ ...stage, yearsToReach: "无法达成（年龄超限）" });
      continue;
    }

    results.push({
      ...stage,
      yearsToReach: years > 0 ? cumulativeYears : "无法达成",
    });
    assets = requiredAssets;
  }

  return results;
}

function getAdvice(currentStageName, age) {
  const adviceMap = {
      // 负资产阶段
      '银行都怕你不小心嘎了': '立即启动"债务保命"计划！联系专业律师团队处理资产保全，优先偿还信用卡/网贷等高息负债，停止新增债务并开启"断舍离"模式',
      '生活惬意': '建议申请个人破产保护，剥离企业连带债务。同步建立家庭资产防火墙，学习《公司法》风险隔离技巧',
      '供房养车': '优化贷款结构：采用"以租养贷"策略覆盖月供，建议发展副业增加现金流。警惕车房贬值风险',
      '眼界开阔': '暂停新增不动产投资！与银行协商贷款展期，建议挂牌出售非核心资产止损',
      '生活质量': '强制关闭花呗借呗循环贷，启用50/30/20预算法则（50%生存/30%发展/20%投资）',
      '没有规划': '开启"21天存钱挑战"计划！建立强制储蓄习惯，学习记账APP使用（如随手记/鲨鱼记账）',
      '呼吸自由': '申请政府临时救助金和社区帮扶项目，学习"极简生活"理财法，从每日记账开始重建财务',
      
      // 低收入阶段
      '会员自由': '利用拼多多/闲鱼等平台薅羊毛，但要警惕消费陷阱。建议将会员费控制在月收入3%以内',
      '菜场自由': '开启"菜篮子经济学"：比较菜场/超市/社区团购价格，用5%收入建立应急基金',
      '外卖自由': '警惕"外卖刺客"！建议自己做饭+带饭，每月餐饮预算控制在1500元内。可尝试预制菜节省开支',
      '奶茶自由': '每天一杯星巴克？建议改为瑞幸+自冲咖啡组合，年省5000元。将差价投入指数基金定投',
      
      // 中产阶段
      '旅游自由': '采用"分时度假"模式替代自由行，建议用航空里程积分兑换机票。警惕过度消费主义陷阱',
      '汽车自由': '优先考虑新能源车购置税减免政策，建议保留20万流动资金应对突发状况',
      '首付自由': '警惕"首付贷"陷阱！建议使用公积金贷款降低月供压力，同步配置重疾险规避风险',
      '工作自由': '重点发展"睡后收入"：建议配置指数基金+REITs组合，学习FIRE运动4%安全提款率原则',
      
      // 高净值阶段
      '学区自由': '采用"教育组合投资"：国际学校+海外夏令营+学区房租赁策略，警惕政策变动风险',
      '医疗自由': '配置MSH/平安高端医疗险，但需注意免赔额条款。建议设立专项医疗储备金',
      '房产自由': '采用"以租养贷"策略，警惕房产税试点影响。建议配置海外房产分散风险',
      '传承自由': '设立家族信托前需完成"资产穿透"核查，建议配置大额保单实现定向传承',
      '国籍自由': '优先考虑新加坡/香港税务居民身份，建议设立离岸公司进行资产隔离',
      
      // 顶级财富
      '普通人不要去想了': '建议成立慈善基金会实现税务优化，配置家族办公室管理资产。警惕"共同富裕"政策影响'
  };

  let advice = adviceMap[currentStageName] || '建议咨询专业财务规划师定制方案';

  return advice;
}

function showResult(data) {
  const resultDiv = document.getElementById("result");
  const stageTitle = resultDiv.querySelector(".stage-title");
  const stageName = resultDiv.querySelector(".stage-name");
  const description = resultDiv.querySelector(".description");
  const advicePara = resultDiv.querySelector(".advice p");
  const stagesTable = document
    .getElementById("stages-table")
    .querySelector("tbody");
  const annualSavingsDisplay = document.getElementById(
    "annual-savings-display"
  );
  const stageTags = resultDiv.querySelector(".stage-tags");

  stageTitle.textContent = data.currentStage.title;
  stageName.textContent = data.currentStage.name;
  description.textContent = data.currentStage.description;
  advicePara.textContent = data.advice;

  // 动态渲染标签
  stageTags.innerHTML = data.currentStage.tag
    .map((tag) => `<span class="tag ${getTagColor(tag)}">${tag}</span>`)
    .join("");

  // 标签颜色随机分配
  function getTagColor(tag) {
    const colors = ["magenta", "cyan", "orange", "green"];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // 生成路线图
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
