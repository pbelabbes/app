import * as _ from 'lodash';
import * as dico from '../data/dico.json';
import { writeJSON } from '../helpers/writer';
import { Letter } from '../models/letter';
import { Word } from '../models/word';

export class DicoGenerator {
  lettersWeight: Letter[] = [];
  dico: Word[] = [];

  importDicoFromJSON(): void {
    const data: string[] = dico.words;
    this.computeLettersWeight(data);
    this.computeDico(data);
  }

  computeLettersWeight(words: string[]): void {
    let countLetter = 0;
    for (const word of words) {
      const destructWord = word.split('');
      for (const letter of destructWord) {
        const existingLetter: Letter | undefined = this.lettersWeight.find(
          (l) => l.value === letter,
        );
        if (existingLetter != null) {
          existingLetter.weight++;
        } else {
          this.lettersWeight.push({ value: letter, weight: 1 });
        }
        countLetter++;
      }
    }

    for (const letter of this.lettersWeight) {
      letter.weight = letter.weight / countLetter;
    }

    this.saveLetterDicoToFile();
  }

  saveLetterDicoToFile(): void {
    writeJSON(this.lettersWeight, 'letterDico.json');
  }

  computeDico(words: string[]): void {
    for (const word of words) {
      this.dico.push(this.computeWord(word));
    }
    writeJSON(this.dico, 'wordsEvaluated.json');
  }

  computeWord(word: string): Word {
    const sumWeight: number = _.uniq(word.split('')).reduce(
      (acc: number, letter: string) => {
        const letterRef: Letter | undefined = this.lettersWeight.find(
          (l) => l.value === letter.toUpperCase(),
        );

        if (letterRef != null) {
          return acc + letterRef.weight;
        } else {
          return acc;
        }
      },
      0,
    );

    return { value: word, length: word.length, weight: sumWeight };
  }
}
