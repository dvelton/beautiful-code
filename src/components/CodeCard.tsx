import { useEffect, useRef } from 'react';
import type { CuratedExample } from '../types';

declare const hljs: {
  highlightElement: (el: HTMLElement) => void;
};

interface CodeCardProps {
  example: CuratedExample;
  highlight: boolean;
  dark: boolean;
}

export function CodeCard({ example, highlight, dark }: CodeCardProps) {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current && typeof hljs !== 'undefined') {
      codeRef.current.removeAttribute('data-highlighted');
      hljs.highlightElement(codeRef.current);
    }
  }, [example.code, dark]);

  const langClass = `language-${example.language.toLowerCase().replace(/[^a-z0-9]/g, '')}`;

  return (
    <article
      id={`card-${example.id}`}
      className={`rounded-xl border overflow-hidden transition-shadow ${
        highlight ? 'highlight-flash' : ''
      } ${
        dark
          ? 'bg-gray-900 border-gray-800 hover:border-gray-700'
          : 'bg-white border-gray-200 hover:border-gray-300 shadow-sm'
      }`}
    >
      <div className="px-5 pt-5 pb-3">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className={`text-base font-semibold leading-snug ${dark ? 'text-gray-100' : 'text-gray-900'}`}>
            {example.title}
          </h3>
          <span
            className={`shrink-0 px-2 py-0.5 rounded text-xs font-mono font-medium ${
              dark
                ? 'bg-gray-800 text-gray-300'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {example.language}
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {example.conceptTags.map((tag) => (
            <span
              key={tag}
              className={`px-2 py-0.5 rounded-full text-xs ${
                dark
                  ? 'bg-indigo-900/40 text-indigo-300'
                  : 'bg-indigo-50 text-indigo-600'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className={`mx-5 mb-4 rounded-lg overflow-hidden ${dark ? 'bg-gray-950' : 'bg-gray-50'}`}>
        <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
          <code ref={codeRef} className={`${langClass} font-mono`}>
            {example.code}
          </code>
        </pre>
      </div>

      <div className="px-5 pb-5 space-y-3">
        <p className={`text-sm leading-relaxed font-serif ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
          {example.explanation}
        </p>
        <div className={`border-t pt-3 ${dark ? 'border-gray-800' : 'border-gray-100'}`}>
          <p className={`text-sm leading-relaxed ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
            <span className="font-medium">Why it's elegant:</span> {example.whyElegant}
          </p>
        </div>
        <p className={`text-sm italic ${dark ? 'text-indigo-400' : 'text-indigo-600'}`}>
          {example.keyInsight}
        </p>
        <p className={`text-sm ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
          Analogy: {example.analogy}
        </p>
        <p className={`text-xs ${dark ? 'text-gray-600' : 'text-gray-400'}`}>
          {example.sourceNote}
        </p>
      </div>
    </article>
  );
}
