#!/usr/bin/env node
import { $, nothrow } from 'zx';

const snapshotDir = 'vistest/snapshots';
const reportPath = `vistest/index.html`;
const workingDir = 'vistest/.tmp';
const actualDir = `${workingDir}/actual`;
const diffDir = `${workingDir}/diff`;

// Clear working directory and result
await $`rm -rf ${workingDir} ${reportPath}`;

// Build storybook
await $`yarn storybook:build`;

// Capture actural snapshot
await $`yarn storycap http://localhost:6007 --serverCmd \"npx http-server --port 6007 storybook-static\" --flat --outDir ${actualDir}`;

// Run visual comparison
await nothrow(
  $`yarn reg-cli ${actualDir} ${snapshotDir} ${diffDir} -R ${reportPath} -J ${workingDir}/reg.json`,
);
