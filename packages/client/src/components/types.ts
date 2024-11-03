import { type JSX } from 'react';

/**
 * A utility type for getting around issues with `eslint-plugin-react`'s
 * `react/prop-types` rule for HTML elements.
 *
 * @see{@link https://github.com/jsx-eslint/eslint-plugin-react/issues/3684}
 */
export type HtmlProps<T extends keyof JSX.IntrinsicElements> = JSX.IntrinsicElements[T];
