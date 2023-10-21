import { Password } from './password.vo';

describe('Password - Unit Test', () => {
  const correct = 'super-password';

  it('should return "true" on correct password', async () => {
    const pwd = await Password.create(correct);

    expect(pwd.isCorrect(correct)).resolves.toBe(true);
  });

  it('should return "false" on incorrect passoword', async () => {
    const pwd = await Password.create(correct);

    expect(pwd.isCorrect('other')).resolves.toBe(false);
  });

  it('should reconstruct password correctly', async () => {
    const original = await Password.create(correct);
    const reconstructed = Password.from(original.toString());

    expect(reconstructed.isCorrect(correct)).resolves.toBe(true);
  });
});
