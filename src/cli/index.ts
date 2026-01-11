import url from 'url';
import { Program } from './program.js';

export * from './program.js';

const __filename = url.fileURLToPath(import.meta.url);
if (__filename === process.argv[1] || __filename === process.env.pm_exec_path) {
  const program = new Program();
  program.run(process.argv);
}
