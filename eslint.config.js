import { FlatCompat } from "@eslint/eslintrc";
import eslintConfigPrettier from "eslint-config-prettier";
import typeScriptESLint from "@typescript-eslint/eslint-plugin";
import typeScriptESLintParser from "@typescript-eslint/parser";
import eslintConfig from "@eslint/js";

const compat = new FlatCompat();

/**
 * ESLint Config
 * @type {import('eslint').Linter.FlatConfig[]}
 */
export default [
  eslintConfig.configs.recommended,
  eslintConfigPrettier,
  ...compat.extends("plugin:@typescript-eslint/eslint-recommended"),
  {
    plugins: {
      typeScriptESLint,
    },
    languageOptions: {
      parser: typeScriptESLintParser,
    },
  },
];
