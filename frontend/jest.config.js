// frontend/jest.config.js
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom', // Use jsdom for testing React components
    testMatch: ['<rootDir>/__tests__/**/*.test.(ts|tsx)'], // Look for test files in the __tests__ folder
    moduleNameMapper: {
        '\\.(css|less|scss)$': 'identity-obj-proxy', // Mock CSS imports
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Optional, in case you have a setup file for Jest
};
