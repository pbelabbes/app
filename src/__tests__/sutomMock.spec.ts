import { SutomMock } from '../core/sutomMock';
jest.setTimeout(60000);
describe('Test init Mock', () => {
  it('Should init mock with', async () => {
    const mock = new SutomMock();
    await mock.init(new Date(Date.now()));
    expect(mock.wordToFind).toBe('FACILE');
  });
});
