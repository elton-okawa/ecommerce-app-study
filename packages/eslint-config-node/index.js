module.exports = {
  plugins: ["@typescript-eslint"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "prettier", // must be the last one
  ],
  parser: "@typescript-eslint/parser",
  rules: {},
};
