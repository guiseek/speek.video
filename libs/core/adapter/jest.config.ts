module.exports = {
  displayName: 'core-adapter',

  globals: {
    'ts-jest': { tsconfig: '<rootDir>/tsconfig.spec.json' },
  },
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../coverage/libs/core/adapter',
  testEnvironment: 'node',
  preset: '../../../jest.preset.ts',
}
