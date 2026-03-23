/**
 * Brand Guidelines 合规检查脚本
 * 用法: node check-compliance.js "要检查的文案"
 */

const TEXT = process.argv[2] || '';

// ─── 规则定义 ───────────────────────────────────────────

const FORBIDDEN_WORDS = [
  '最好', '第一', '无与伦比', '最强', '最优', '绝对', '保证', '承诺永久',
];

const COMPETITOR_NAMES = [
  // 根据实际情况填写竞品名称
  'CompetitorA', 'CompetitorB',
];

const BRAND_COLORS_HEX = [
  '#1A73E8', '#0D47A1', '#34A853', '#FBBC04', '#EA4335',
  '#202124', '#5F6368', '#DADCE0', '#F8F9FA', '#FFFFFF',
];

// ─── 检查函数 ───────────────────────────────────────────

function checkForbiddenWords(text) {
  const found = FORBIDDEN_WORDS.filter(word => text.includes(word));
  return {
    pass: found.length === 0,
    issues: found.map(w => `包含夸大用词：「${w}」`),
  };
}

function checkCompetitors(text) {
  const found = COMPETITOR_NAMES.filter(name => text.includes(name));
  return {
    pass: found.length === 0,
    issues: found.map(n => `包含竞品名称：「${n}」`),
  };
}

function checkLength(text) {
  const pass = text.length >= 10 && text.length <= 500;
  return {
    pass,
    issues: pass ? [] : [`文案长度 ${text.length} 字，建议控制在 10~500 字之间`],
  };
}

// ─── 主逻辑 ────────────────────────────────────────────

function runCheck(text) {
  if (!text) {
    console.log('用法: node check-compliance.js "要检查的文案"');
    process.exit(1);
  }

  console.log('\n=== 品牌合规检查报告 ===\n');
  console.log(`输入内容: ${text}\n`);

  const checks = [
    { name: '夸大用词检查', result: checkForbiddenWords(text) },
    { name: '竞品名称检查', result: checkCompetitors(text) },
    { name: '文案长度检查', result: checkLength(text) },
  ];

  let allPass = true;

  checks.forEach(({ name, result }) => {
    const status = result.pass ? '✅ 通过' : '❌ 不合规';
    console.log(`[${name}] ${status}`);
    if (!result.pass) {
      allPass = false;
      result.issues.forEach(issue => console.log(`   → ${issue}`));
    }
  });

  console.log('\n─────────────────────────');
  console.log(allPass ? '\n🎉 整体合规，可以使用！' : '\n⚠️  存在合规问题，请按建议修改后再使用。');
  console.log('');
}

runCheck(TEXT);
