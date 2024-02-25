// eslint-disable-next-line no-undef
module.exports = {
  testMatch: ["**/test/**/*.test.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": "esbuild-jest",
  },
  testEnvironment: "miniflare",
};
