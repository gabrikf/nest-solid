import { Content } from './content';

describe('Content entity', () => {
  it('should be able to create a notification content', () => {
    const content = new Content('this is a test');
    expect(content).toBeTruthy();
  });

  it('should not able able to create a notification with less than 5 characters', () => {
    expect(() => new Content('aaa')).toThrow();
  });
  it('should not able able to create a notification with more than 240', () => {
    expect(() => new Content('a'.repeat(241))).toThrow();
  });
});
