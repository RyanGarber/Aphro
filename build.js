import { execSync } from 'node:child_process';

const watch = process.argv.includes('--watch');

if (watch) {
  console.log('Compiling in watch mode...');
  execSync('tsc --watch', { stdio: 'inherit' });
} else {
  try {
    console.log('Cleaning old build...');
    execSync('npm run clean', { stdio: 'inherit' });

    console.log('Compiling new build...');
    execSync('tsc', { stdio: 'inherit' });

    console.log('Build succeeded!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}
