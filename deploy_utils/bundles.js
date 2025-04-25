import fs from "node:fs";
import path from "node:path";
import {bundlePathForLandingPath} from './paths.js';
import figures from "figures";

export function getBundlesForLanding(landingName, pageDescriptor) {
  return pageDescriptor.contents.map(markup_path => ({
    cmsTitle: widgetNameForLandingPath(landingName, markup_path),
    source: fs.readFileSync(bundlePathForLandingPath(pageDescriptor.env.brand, landingName, markup_path), 'utf8')
  }));
}

export function widgetNameForLandingPath(landingName, markup_path) {
  const {name} = path.parse(markup_path);
  return `${figures.warning} ${landingName} | ${name}`;
}

export function bundlesForLandingPageDescriptor(landingName, pageDescriptor) {
  return pageDescriptor.contents.map(content_src => {
    const {name: markup_name} = path.parse(content_src);
    return `${pageDescriptor.env.brand}--${landingName}--${markup_name}.html`;
  });
}

export function htmlTagsFromBundleGraph(bundleGraph, bundleType, prefix, suffix) {
  return bundleGraph.getBundles()
    .filter(bundle => bundle.type === bundleType)
    .map(bundle => {
      const bundle_code = fs.readFileSync(bundle.filePath, 'utf8');
      return prefix + bundle_code + suffix;
    }).join("\n");
}
