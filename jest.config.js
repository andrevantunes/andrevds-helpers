module.exports = {
  verbose: false,
  testURL: 'https://local.mesalva.com/',
  transform: { '^.+\\.js$': 'babel-jest' },
  globals: { NODE_ENV: 'test' },
  moduleFileExtensions: ['js'],
  modulePathIgnorePatterns: ['__tests__/__support__'],
}
