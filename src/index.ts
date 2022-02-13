import { Solveur } from './core/solveur';
import { SutomMock } from './core/sutomMock';
(async () => {
  try {
    const mock = new SutomMock();
    const wordToFind = await mock.init(new Date(Date.now()));
    const solveur = new Solveur(wordToFind[0], wordToFind.length);
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
    console.log(suggestedWord);
  } catch (e) {
    // Deal with the fact the chain failed
  }
})().catch((e) => {
  console.log(e);
});
