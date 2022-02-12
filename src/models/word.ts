import _ from 'lodash';
import * as wordsDico from '../data/wordsEvaluated.json';

export interface Word {
  value: string;
  length: number;
  weight: number;
}

export function getWordsByLength(wordLength: number): Word[] {
  const dico: Word[] = wordsDico as Word[];
  return _.filter(dico, word => word.length === wordLength);
}
