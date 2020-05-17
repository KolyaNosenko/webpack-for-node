module.exports = {
  root: true,
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  env: {
    node: true,
    es2020: true,
  },
  parserOptions: {
    sourceType: "module",
  },
  rules: {
    "prettier/prettier": "warn",
  },
  overrides: [
    {
      files: ["**/*.ts"],
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint"],
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
      ],
    },
  ],
};
