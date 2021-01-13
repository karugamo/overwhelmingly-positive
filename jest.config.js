module.exports = {
  preset: 'jest-playwright-preset',
  testMatch: ['**/tests/*.ts'],
  transform: {
    '^.+\\.(ts)$': 'ts-jest'
  }
}
