const { spawn } = require('child_process');
const path = require('path');

const projectDir = path.join(__dirname, '..');
const nextBin = path.join(projectDir, 'node_modules', '.bin', 'next.cmd');

const child = spawn(nextBin, ['dev', '--port', '3000'], {
  cwd: projectDir,
  stdio: 'inherit',
  shell: true,
});

child.on('error', (err) => {
  console.error('Failed to start:', err);
  process.exit(1);
});

child.on('exit', (code) => {
  process.exit(code ?? 0);
});
