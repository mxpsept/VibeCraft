#!/usr/bin/env node
import { program } from 'commander';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf8'));

program
  .name('vibecraft')
  .description('AI 辅助开发的方法论模板体系')
  .version(pkg.version);

program
  .command('init')
  .description('在当前项目初始化 VibeCraft 模板')
  .action(async () => {
    const { init } = await import('../src/commands/init.js');
    await init();
  });

program.parse();
