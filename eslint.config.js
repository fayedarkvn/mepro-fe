import {
  combine,
  comments,
  ignores,
  imports,
  javascript,
  jsdoc,
  jsonc,
  markdown,
  node,
  stylistic,
  typescript,
  unicorn,
  yaml,
  react,
} from '@antfu/eslint-config';

export default combine(
  ignores(),
  javascript(),
  comments(),
  node(),
  jsdoc(),
  imports(),
  unicorn(),
  typescript({
    overrides: {
      'ts/consistent-type-imports': 'off',
    },
  }),
  stylistic({
    semi: true,
    indent: 2,
    quotes: 'single',
  }),
  jsonc(),
  yaml(),
  markdown(),
  react({
    overrides: {
      'react-refresh/only-export-components': 'off',
    },
  }),
);
