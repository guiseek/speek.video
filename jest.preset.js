const nxPreset = require('@nrwl/jest/preset')

module.exports = {
  ...nxPreset,
  transform: {
    '.(ts|tsx)': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],

  globals: {
    'ts-jest': {
      compiler: 'ttypescript'
    }
  }
}
