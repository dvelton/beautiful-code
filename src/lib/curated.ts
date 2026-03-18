import type { CuratedExample } from '../types';
import { classicAlgorithms } from './curated/classic-algorithms';
import { pythonPatterns } from './curated/python-patterns';
import { functionalProgramming } from './curated/functional-programming';
import { unixShell } from './curated/unix-shell';
import { javascriptTypescript } from './curated/javascript-typescript';
import { mathematicalElegance } from './curated/mathematical-elegance';
import { dataStructures } from './curated/data-structures';
import { recursion } from './curated/recursion';
import { languageDesign } from './curated/language-design';
import { compressionEncoding } from './curated/compression-encoding';
import { apiDesign } from './curated/api-design';
import { concurrency } from './curated/concurrency';

export const examples: CuratedExample[] = [
  ...classicAlgorithms,
  ...pythonPatterns,
  ...functionalProgramming,
  ...unixShell,
  ...javascriptTypescript,
  ...mathematicalElegance,
  ...dataStructures,
  ...recursion,
  ...languageDesign,
  ...compressionEncoding,
  ...apiDesign,
  ...concurrency,
];
