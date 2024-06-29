import React, { FC } from 'react';

import stylex from '@stylexjs/stylex';
import classNames from 'classnames';
import Highlight, { Language, defaultProps } from 'prism-react-renderer';
import Github from 'prism-react-renderer/themes/github';

import { MDXComponentProps } from './types';

import { mdxComponentStyles } from './styles.stylex';

const LANG_MAP: Record<string, Language> = {
  ts: 'typescript',
  typescript: 'typescript',
  tsx: 'tsx',
  js: 'javascript',
  javascript: 'javascript',
};

const Pre: FC<MDXComponentProps> = (props) => {
  const { className = '', children } = props;
  const lang = className.replace(/language-/, '');
  let language: Language = LANG_MAP[lang] || 'javascript';

  let code = '';
  if (React.isValidElement(children)) {
    code = children.props.children;
  }

  if (!code) {
    return null;
  }

  return (
    <Highlight {...defaultProps} code={code} language={language} theme={Github}>
      {({ className, tokens, getLineProps, getTokenProps }) => {
        return (
          <pre
            className={classNames(
              className,
              stylex.props(mdxComponentStyles.pre).className,
            )}
          >
            {tokens.map((line, i) => {
              if (i === tokens.length - 1) {
                return null;
              }

              const lineProps = getLineProps({ line, key: i });

              return (
                <div
                  key={i}
                  {...lineProps}
                  className={classNames(
                    lineProps.className,
                    stylex.props(mdxComponentStyles.codeLine).className,
                  )}
                >
                  <span {...stylex.props(mdxComponentStyles.codeLineOrder)}>
                    {i + 1}
                  </span>
                  {line.map((token, key) => {
                    const tokenProps = getTokenProps({ token, key });

                    return (
                      <span
                        key={key}
                        {...tokenProps}
                        style={{ ...tokenProps.style, fontStyle: 'none' }}
                      />
                    );
                  })}
                </div>
              );
            })}
          </pre>
        );
      }}
    </Highlight>
  );
};

export default Pre;
