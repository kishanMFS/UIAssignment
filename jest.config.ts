export default {
  testEnvironment: "jsdom",

  // setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],

  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },

  moduleNameMapper: {
    "\\.module\\.css$": "identity-obj-proxy",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },

  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
};
