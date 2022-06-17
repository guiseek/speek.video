module.exports = {
  displayName: 'webapp',

  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],

  transformIgnorePatterns: ['node_modules/(?!.*.mjs$)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],

  globals: {
    'ts-jest': {
      compiler: 'typescript',

      stringifyContentPathRegex: '\\.(html|svg)$',

      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  coverageDirectory: '../../coverage/apps/webapp',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
  transform: { '^.+\\.(ts|js|html)$': 'jest-preset-angular' },
  preset: '../../jest.preset.ts',
}
