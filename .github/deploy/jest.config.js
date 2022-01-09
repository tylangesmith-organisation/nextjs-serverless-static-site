module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    './**/*.spec.ts'
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  }
}
