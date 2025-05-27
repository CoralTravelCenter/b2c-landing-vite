import path from "node:path";

export function buildDir() {
  return path.join(process.cwd(), '@CMS');
}

export function bundleBasenameForLandingPath(brand, landingName, markup_path) {
  const {name} = path.parse(markup_path);
  return `${brand}--${landingName}--${name}.html`;
}

export function bundlePathForLandingPath(brand, landingName, markup_path) {
  return path.join(buildDir(), bundleBasenameForLandingPath(brand, landingName, markup_path));
}
