import fs from "node:fs";
import path from "node:path";
import {buildDir} from './paths.js';

export function storeDeploymentDescriptor(landingName, pageDescriptor, deploymentDescriptor) {
  const descriptorBasename = `${pageDescriptor.env.brand}--${landingName}.deploy.json`;
  const descriptorPath = path.join(buildDir(), descriptorBasename);
  fs.writeFileSync(descriptorPath, JSON.stringify(deploymentDescriptor, null, 4), 'utf8');
}

export function getDeploymentDescriptor(landingName, pageDescriptor) {
  const descriptorBasename = `${pageDescriptor.env.brand}--${landingName}.deploy.json`;
  const descriptorPath = path.join(buildDir(), descriptorBasename);
  if (fs.existsSync(descriptorPath)) {
    return JSON.parse(fs.readFileSync(descriptorPath, 'utf8'));
  }
}

export function getAssetsDescriptor(pageDescriptor) {
  const descriptorBasename = `${pageDescriptor.env.brand}.assets.json`;
  const descriptorPath = path.join(buildDir(), descriptorBasename);
  if (fs.existsSync(descriptorPath)) {
    return JSON.parse(fs.readFileSync(descriptorPath, 'utf8'));
  }
  return [];
}

export function storeAssetsDescriptor(pageDescriptor, assetsDescriptor) {
  const descriptorBasename = `${pageDescriptor.env.brand}.assets.json`;
  const descriptorPath = path.join(buildDir(), descriptorBasename);
  fs.writeFileSync(descriptorPath, JSON.stringify(assetsDescriptor, null, 4), 'utf8');
}
