module.exports = {
   preset: 'ts-jest',
   testEnvironment: 'jsdom',
   transform: {
      '^.+\\.jsx?$': 'babel-jest',
   },
   moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
   moduleNameMapper: {
      '^context/(.*)$': '<rootDir>/src/context/$1',
      '\\.(css|less)$': 'identity-obj-proxy',
      '\\.(jpg|jpeg|png|gif|webp|avif|svg)$': '<rootDir>/src/test/__mocks__/fileMock.js',
   },
   moduleDirectories: ['node_modules', 'src'],
};
