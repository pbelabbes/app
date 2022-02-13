import { Solveur } from '../core/solveur';
import { SutomMock } from '../core/sutomMock';
jest.setTimeout(60000);
describe('Test init Mock', () => {
  it('Should init mock with', async () => {
    const mock = new SutomMock();
    await mock.init(new Date(2022, 1, 12));
    expect(mock.wordToFind).toBe('FACILE');
  });

  it('Should return the pattern response of a word', () => {
    const mock = new SutomMock();
    mock.wordToFind = 'FACILE';
    const response = mock.checkWord('FRAISE');

    expect(response).toBe('X_OX_X');
  });

  it('Should find the good word', async () => {
    const mock = new SutomMock();
    await mock.init(new Date(2022, 1, 12)); //month start at 0 in js
    const solveur = new Solveur(mock.wordToFind[0], mock.wordToFind.length);
    let count = 0;

    let stop = false;
    let suggestedWord: string = solveur.start();
    do {
      const response = mock.checkWord(suggestedWord);
      count++;
      stop = !response.includes('_') && !response.includes('O');
      if (!stop) {
        suggestedWord = solveur.next(response);
      }
    } while (!stop);

    console.log(count);
    expect(suggestedWord).toBe(mock.wordToFind);
  });
});
