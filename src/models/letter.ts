import _ from 'lodash';
import * as letterDico from '../data/letterDico.json';

export interface Letter {
  value: string;
  weight: number;
}

export function getLetterFromDico(letter: string): Letter {
  const dico: Letter[] = letterDico as Letter[];
  const res: Letter | undefined = _.find(dico, l => l.value === letter);
  if (res === undefined) {
    throw new Error(`The letter ${letter} is not in the dico`);
  }

  return res;
}
