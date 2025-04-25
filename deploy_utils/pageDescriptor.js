import fs from "node:fs";
import path from "node:path";
import JSON5 from 'json5';
import {conformPageDescriptorToExpectedFormat} from './conform.js';

export function pageDescriptorWithFile(file2process) {
  const {ext: source_ext} = path.parse(file2process);

  let page_descriptor;
  if (source_ext.match(/json5?/)) {
    page_descriptor = JSON5.parse(fs.readFileSync(file2process, 'utf8'));
  } else if (source_ext.match(/html?|pug/)) {
    page_descriptor = {contents: file2process};
  }
  conformPageDescriptorToExpectedFormat(page_descriptor, path.dirname(file2process));
  return page_descriptor;
}

export function resolveDependency(basedir, dep) {
  const path_parts = [];
  if (!path.isAbsolute(basedir)) {
    path_parts.push(process.cwd());
  }
  dep = dep.replace(/^\/+/, '');
  path_parts.push(dep);
  return path.resolve(...path_parts);
}
