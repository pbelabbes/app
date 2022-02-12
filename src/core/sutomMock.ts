import got from 'got/dist/source';
import { getDiffInDaysSinceStartGame } from '../helpers/date';

export class SutomMock {
  wordToFind = '';
  nbRun = 0;

  // link to find word : https://sutom.nocle.fr/mots/36.txt
  async init(date: Date): Promise<void> {
    this.wordToFind = await this.getWordToFindByDate(date);
  }

  async getWordToFindByDate(date: Date): Promise<string> {
    const days = getDiffInDaysSinceStartGame(date);
    const baseLink = 'https://sutom.nocle.fr/mots/';
    const link = `${baseLink}${days}.txt`;
    const { body } = await got(link);

    console.log(body);
    return body;
  }
}
