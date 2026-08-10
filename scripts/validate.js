#! /usr/bin/env node

import fs from 'fs';
import path from 'path';
import { validateStyleMin } from '@maplibre/maplibre-gl-style-spec';

const styles = ['historical', 'japanese_scroll', 'railway', 'woodblock'];

let failed = false;
styles.forEach((style) => {
  const file = path.join(style, `${style}.json`);
  const errors = validateStyleMin(JSON.parse(fs.readFileSync(file)));
  if (errors.length) {
    failed = true;
    console.error(`${file}:`);
    errors.forEach((error) => console.error(`  ${error.message}`));
  } else {
    console.log(`${file}: valid`);
  }
});

process.exit(failed ? 1 : 0);
