import path from "node:path";
import {fileURLToPath} from "node:url";
import {findUpSync} from 'find-up';

const module_path = fileURLToPath(import.meta.url);
const found = findUpSync('package.json', {cwd: path.dirname(module_path)});
export const appRoot = path.dirname(found);
