import { Letter } from './letter';

export interface Guideline {
  letter: Letter;
  code: string; // _: not in word, X : Good place, O : wrong place
  position?: number;
}
