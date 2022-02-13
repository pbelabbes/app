import { Guideline } from '../models/guideline';
import { getLetterFromDico, Letter } from '../models/letter';
import { getWordsByLength, Word } from '../models/word';

export class Solveur {
  availableWords: Word[] = [];
  wordLength = 0;
  lastWord = '';

  constructor(firstLetter: string, length: number) {
    this.wordLength = length;
    const firstLetterWeights: Letter = getLetterFromDico(firstLetter);
    this.initAvailableWords();
    this.refineAvailableWords({
      letter: firstLetterWeights,
      code: 'X',
      position: 0,
    });
  }

  initAvailableWords(): void {
    this.availableWords = getWordsByLength(this.wordLength);
  }

  refineAvailableWords(guideline: Guideline): void {
    const position = guideline.position;
    switch (guideline.code) {
      case '_':
        this.availableWords = this.availableWords.filter(
          (word) => !word.value.includes(guideline.letter.value),
        );
        break;

      case 'X':
        if (position === undefined) {
          throw new Error('A letter in a good place must have a position');
        }
        this.availableWords = this.availableWords.filter(
          (word) => word.value.charAt(position) === guideline.letter.value,
        );
        break;
      case 'O':
        if (position === undefined) {
          throw new Error('A letter in a good place must have a position');
        }
        this.availableWords = this.availableWords.filter(
          (word) =>
            word.value.includes(guideline.letter.value) &&
            !(word.value.charAt(position) === guideline.letter.value),
        );
    }
  }

  getMostEvaluatedWord(): string {
    if (this.availableWords.length <= 0) {
      throw Error('Must init available words list before getting one');
    }
    const word: Word | undefined = this.availableWords
      .sort((a, b) => a.weight - b.weight)
      .pop();
    if (word === undefined) {
      throw Error('Must init available words list before getting one');
    }
    return word.value;
  }

  start(): string {
    this.lastWord = this.getMostEvaluatedWord();
    return this.lastWord;
  }

  next(response: string): string {
    const newGuidelinesCode = response.split('');

    newGuidelinesCode.forEach((code, index) => {
      const letter: Letter = getLetterFromDico(this.lastWord.charAt(index));
      const newGuideline: Guideline = { letter, code, position: index };
      this.refineAvailableWords(newGuideline);
    });

    return this.start();
  }
}
