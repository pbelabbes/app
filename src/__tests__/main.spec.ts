import { DicoGenerator } from '../core/dicoGenerator';
import { Solveur } from '../core/solveur';

describe('This is a test suit', () => {
  it('should build dicos', () => {
    const dicoGenerator = new DicoGenerator();

    dicoGenerator.importDicoFromJSON();
  });

  describe('The solveur', () => {
    it('should bet created ', () => {
      const firstLetter = 'F';
      const length = 6;
      const solveur: Solveur = new Solveur(firstLetter, length);
      expect(solveur.availableWords.length).toBeGreaterThanOrEqual(1);
      expect(solveur.lastWord).toBe('');
      expect(solveur.wordLength).toBe(length);
    });

    it('Should start game', () => {
      const expectWord = 'Fresia';
      const solveur: Solveur = new Solveur('F', 6);
      const word = solveur.start();
      expect(word.toLowerCase()).toBe(expectWord.toLowerCase());
    });

    it('Should suggest better word after fresia', () => {
      // Target word is FRAISE
      const expectWord = 'FRAISE';
      const solveur: Solveur = new Solveur('F', 6);
      solveur.start(); // return FRESIA
      const response = 'XXOOOO';
      const word = solveur.next(response);
      expect(word.toLowerCase()).toBe(expectWord.toLowerCase());
    });
  });
});
