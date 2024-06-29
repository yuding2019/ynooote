/** @type {import("prettier").Config} */
const config = {
  singleQuote: true,
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: [
    '^react(/[^\\/]+)?$',
    '^next(/[^\\/]+)?$',
    '<THIRD_PARTY_MODULES>',
    '^(?!.*stylex$)\\./?',
    '\\.stylex$',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

export default config;
