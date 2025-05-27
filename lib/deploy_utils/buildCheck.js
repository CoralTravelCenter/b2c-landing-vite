import fs from "node:fs";
import path from "node:path";
import {buildDir} from './paths.js';

export function hasBeenBuilt(landingName, pageDescriptor) {
  return pageDescriptor.contents.every(content => {
    const {name} = path.parse(content);
    const expectedFile = `${pageDescriptor.env.brand}--${landingName}--${name}.html`;
    return fs.existsSync(path.join(buildDir(), expectedFile));
  });
}
