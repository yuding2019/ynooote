import React, { FC } from "react";
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import Github from 'prism-react-renderer/themes/github';

import { MDXComponentProps } from "./types";
import styles from './index.module.less';
import classNames from "classnames";

const LANG_MAP: Record<string, Language> = {
  ts: 'typescript',
  typescript: 'typescript',
  tsx: 'tsx',
  js: 'javascript',
  javascript: 'javascript',
}

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
      {
        ({ className, tokens, getLineProps, getTokenProps }) => {
          return (
            <pre className={classNames(className, "pre")}>
              {tokens.map((line, i) => {
                if (i === tokens.length - 1) {
                  return null;
                }

                const lineProps = getLineProps({ line, key: i });
    
                return (
                  <div key={i} {...lineProps} className={classNames(lineProps.className, 'code-line')}>
                    <span className="code-line-order">{i + 1}</span>
                    {line.map((token, key) => {
                      const toeknProps = getTokenProps({ token, key });

                      return (
                        <span key={key} {...toeknProps} style={{ ...toeknProps.style, fontStyle: 'none' }} />
                      );
                    })}
                  </div>
                );
              })}
            </pre>
          );
        }
      }
    </Highlight>
  )
};

export default Pre;
