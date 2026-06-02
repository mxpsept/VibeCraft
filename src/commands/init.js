import inquirer from 'inquirer';
import chalk from 'chalk';
import { existsSync } from 'fs';
import { join } from 'path';
import { ensureDirSync } from 'fs-extra/esm';
import { TEMPLATES_DIR, listTemplates, copyTemplate } from '../utils/templateUtils.js';

const CLAUDE_TEMPLATES = {
  'fullstack-app': '全栈 Web 应用',
  'ai-platform': 'AI 应用平台',
};

const DESIGN_TEMPLATES = {
  'linear-dark': 'Linear 暗色风格（开发者工具 / B 端 SaaS）',
  '(跳过)': '暂不添加 DESIGN.md',
};

const RULES_TEMPLATES = {
  'enterprise': '企业级：安全 / 日志 / 合规规范',
  'team-github-flow': '团队级：GitHub Flow 分支策略',
  'personal-python': '个人级：Python 工程师个人规范',
};

function printBanner() {
  console.log('');
  console.log(chalk.bold.cyan('  ██╗   ██╗██╗██████╗ ███████╗'));
  console.log(chalk.bold.cyan('  ██║   ██║██║██╔══██╗██╔════╝'));
  console.log(chalk.bold.cyan('  ██║   ██║██║██████╔╝█████╗  '));
  console.log(chalk.bold.cyan('  ╚██╗ ██╔╝██║██╔══██╗██╔══╝  '));
  console.log(chalk.bold.cyan('   ╚████╔╝ ██║██████╔╝███████╗'));
  console.log(chalk.bold.cyan('    ╚═══╝  ╚═╝╚═════╝ ╚══════╝'));
  console.log(chalk.bold.cyan('  ██████╗ ██████╗  █████╗ ███████╗████████╗'));
  console.log(chalk.bold.cyan('  ██╔════╝██╔══██╗██╔══██╗██╔════╝╚══██╔══╝'));
  console.log(chalk.bold.cyan('  ██║     ██████╔╝███████║█████╗     ██║   '));
  console.log(chalk.bold.cyan('  ██║     ██╔══██╗██╔══██║██╔══╝     ██║   '));
  console.log(chalk.bold.cyan('  ╚██████╗██║  ██║██║  ██║██║        ██║   '));
  console.log(chalk.bold.cyan('   ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝        ╚═╝   '));
  console.log('');
  console.log(chalk.gray('  让 AI 辅助开发从「随机应变」变成「有章可循」'));
  console.log('');
}

export async function init() {
  printBanner();

  const cwd = process.cwd();

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: '项目名称？',
      default: cwd.split('/').pop(),
      validate: v => v.trim() ? true : '项目名称不能为空',
    },
    {
      type: 'input',
      name: 'projectDesc',
      message: '一句话描述项目（填入模板占位符）：',
      default: '{{用一句话描述项目}}',
    },
    {
      type: 'list',
      name: 'claudeTemplate',
      message: '选择 CLAUDE.md 模板：',
      choices: Object.entries(CLAUDE_TEMPLATES).map(([value, name]) => ({
        name: `${name}  ${chalk.gray(`(${value}.md)`)}`,
        value,
      })),
    },
    {
      type: 'list',
      name: 'designTemplate',
      message: '选择 DESIGN.md 模板：',
      choices: Object.entries(DESIGN_TEMPLATES).map(([value, name]) => ({
        name,
        value,
      })),
    },
    {
      type: 'checkbox',
      name: 'rulesTemplates',
      message: '选择 .rules/ 规则文件（空格多选）：',
      choices: Object.entries(RULES_TEMPLATES).map(([value, name]) => ({
        name,
        value,
        checked: value === 'enterprise',
      })),
    },
    {
      type: 'confirm',
      name: 'addAdrTemplate',
      message: '添加 ADR 模板（docs/adr/TEMPLATE.md）？',
      default: true,
    },
    {
      type: 'confirm',
      name: 'confirm',
      message: answers => {
        const lines = [
          '',
          chalk.bold('  将生成以下文件：'),
          `  ${chalk.green('✔')} CLAUDE.md`,
        ];
        if (answers.designTemplate !== '(跳过)') lines.push(`  ${chalk.green('✔')} DESIGN.md`);
        if (answers.rulesTemplates.length) {
          lines.push(`  ${chalk.green('✔')} .rules/`);
          answers.rulesTemplates.forEach(r => lines.push(`       ${chalk.gray('└─')} ${r}.md`));
        }
        if (answers.addAdrTemplate) lines.push(`  ${chalk.green('✔')} docs/adr/TEMPLATE.md`);
        lines.push('');
        lines.push('  目标目录：' + chalk.cyan(cwd));
        lines.push('');
        console.log(lines.join('\n'));
        return '确认生成？';
      },
      default: true,
    },
  ]);

  if (!answers.confirm) {
    console.log(chalk.yellow('\n  已取消。'));
    return;
  }

  const vars = {
    PROJECT_NAME: answers.projectName,
    '用一句话描述项目': answers.projectDesc,
    '用一句话描述项目是什么、解决什么问题、服务谁': answers.projectDesc,
  };

  const generated = [];

  // CLAUDE.md
  const claudeSrc = join(TEMPLATES_DIR, 'claude', `${answers.claudeTemplate}.md`);
  const claudeDest = join(cwd, 'CLAUDE.md');
  if (existsSync(claudeDest)) {
    const { overwrite } = await inquirer.prompt([{
      type: 'confirm',
      name: 'overwrite',
      message: chalk.yellow('CLAUDE.md 已存在，覆盖？'),
      default: false,
    }]);
    if (!overwrite) {
      console.log(chalk.gray('  跳过 CLAUDE.md'));
    } else {
      copyTemplate(claudeSrc, claudeDest, vars);
      generated.push('CLAUDE.md');
    }
  } else {
    copyTemplate(claudeSrc, claudeDest, vars);
    generated.push('CLAUDE.md');
  }

  // DESIGN.md
  if (answers.designTemplate !== '(跳过)') {
    const designSrc = join(TEMPLATES_DIR, 'design', `${answers.designTemplate}.md`);
    const designDest = join(cwd, 'DESIGN.md');
    copyTemplate(designSrc, designDest, vars);
    generated.push('DESIGN.md');
  }

  // .rules/
  if (answers.rulesTemplates.length > 0) {
    ensureDirSync(join(cwd, '.rules'));
    for (const rule of answers.rulesTemplates) {
      const srcFile = join(TEMPLATES_DIR, 'rules', `${rule}.md`);
      // Map template filename to .rules/ target name
      const destName = rule.startsWith('team-') ? 'team.md'
        : rule.startsWith('personal-') ? 'personal.md'
        : `${rule}.md`;
      const destFile = join(cwd, '.rules', destName);
      copyTemplate(srcFile, destFile, vars);
      generated.push(`.rules/${destName}`);
    }
  }

  // ADR template
  if (answers.addAdrTemplate) {
    const adrSrc = join(TEMPLATES_DIR, 'adr', 'TEMPLATE.md');
    const adrDest = join(cwd, 'docs', 'adr', 'TEMPLATE.md');
    copyTemplate(adrSrc, adrDest, vars);
    generated.push('docs/adr/TEMPLATE.md');
  }

  console.log('');
  console.log(chalk.bold.green('  初始化完成！'));
  console.log('');
  generated.forEach(f => console.log(`  ${chalk.green('✔')} ${f}`));
  console.log('');
  console.log('  下一步：');
  console.log(`  1. 打开 ${chalk.cyan('CLAUDE.md')}，将 ${chalk.yellow('{{占位符}}')} 替换为项目实际内容`);
  if (answers.rulesTemplates.length) {
    console.log(`  2. 按需调整 ${chalk.cyan('.rules/')} 中的规则文件`);
  }
  console.log('');
  console.log(chalk.gray('  文档：https://github.com/DylanMa/vibecraft'));
  console.log('');
}
