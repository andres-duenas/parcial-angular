// Ejecuta el Angular CLI inyectando las variables del archivo .env (si existe).
// Si no hay .env, o no define API_URL, se ejecuta `ng` normalmente y la
// aplicación usa la URL por defecto definida en el código.
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';

try {
  process.loadEnvFile('.env');
} catch {
  // Sin .env: no pasa nada, se usan los valores por defecto.
}

const args = process.argv.slice(2);
const apiUrl = process.env.API_URL?.trim();

if (apiUrl) {
  args.push('--define', `NG_API_URL=${JSON.stringify(apiUrl)}`);
}

const require = createRequire(import.meta.url);
const ngBin = require.resolve('@angular/cli/bin/ng.js');

const child = spawn(process.execPath, [ngBin, ...args], { stdio: 'inherit' });
child.on('exit', (code) => process.exit(code ?? 0));
