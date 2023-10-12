module.exports = {
  plugins: ["react", "@typescript-eslint"],
  extends: [
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier", // must be the last one
  ],
  parser: "@typescript-eslint/parser",
  rules: {},
};
