import path from "path";
import fs from "fs";


export async function writeGitignore(targetPath) {
  const gitignoreLines = [
    'node_modules', 'dev', '@CMS', '.DS_Store', 'Thumbs.db',
    '.idea', '.vscode', '*.log', 'npm-debug.log', '.env'
  ];
  fs.writeFileSync(path.join(targetPath, '.gitignore'), gitignoreLines.join('\n') + '\n');
}
