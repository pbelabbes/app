import got from 'got/dist/source';
import { getDiffInDaysSinceStartGame } from '../helpers/date';
import { Guideline } from '../models/guideline';
import { getLetterFromDico, Letter } from '../models/letter';

export class SutomMock {
  wordToFind = '';

  // link to find word : https://sutom.nocle.fr/mots/36.txt
  async init(date: Date): Promise<string> {
    this.wordToFind = await this.getWordToFindByDate(date);
    return this.wordToFind;
  }

  async getWordToFindByDate(date: Date): Promise<string> {
    const days = getDiffInDaysSinceStartGame(date);
    const baseLink = 'https://sutom.nocle.fr/mots/';
    const link = `${baseLink}${days}.txt`;
    const { body } = await got(link);
    return body;
  }

  checkWord(word: string): string {
    const responseArray = Array(word.length);
    const wordArray = word.split('');
    let tmpWordToFind = this.wordToFind;
    const letterWrongPlaces: Guideline[] = [];

    wordArray.forEach((letter: string, index: number) => {
      if (!this.wordToFind.includes(letter)) {
        responseArray[index] = '_';
      } else if (this.wordToFind.charAt(index) === letter) {
        responseArray[index] = 'X';
        const tmpWordToFindArray = tmpWordToFind.split('');
        tmpWordToFindArray[index] = '_';
        tmpWordToFind = tmpWordToFindArray.join('');
      } else {
        const letterFromDico: Letter = getLetterFromDico(letter);
        letterWrongPlaces.push({
          letter: letterFromDico,
          code: 'O',
          position: index,
        });
      }
    });

    for (const letter of letterWrongPlaces) {
      if (tmpWordToFind.includes(letter.letter.value) && letter.position) {
        responseArray[letter.position] = 'O';
      }
    }

    return responseArray.join('');
  }
}
