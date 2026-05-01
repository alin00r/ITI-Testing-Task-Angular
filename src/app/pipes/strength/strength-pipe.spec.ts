import { StrengthPipe } from './strength-pipe';
describe('strength pipe:', () => {
  let pipe = new StrengthPipe();
  it('transform function should return "20 (unbelievable)"', () => {
    expect(pipe.transform(20)).toMatch(/unbelievable/i)
  });
  it('transform function should return "8 (weak)"', () => {
    expect(pipe.transform(8)).toBe('8 (weak)');
  });
  it('transform function should return "18 (strong)"', () => {
    expect(pipe.transform(18)).toMatch(/strong/i)
  });

});
