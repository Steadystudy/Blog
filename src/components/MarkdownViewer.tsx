'use client';

import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Image from 'next/image';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface Props {
  content: string;
}

export default function MarkdownViewer({ content }: Props) {
  return (
    <div className="mb-8 prose xl:prose-xl max-w-none dark:prose-invert dark:prose-headings:text-green-100">
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter language={match[1]} PreTag="div" {...props} style={materialDark}>
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={`dark:text-green-100`} {...props}>
                {children}
              </code>
            );
          },
          img: (image) => (
            <Image
              className="object-cover"
              src={image.src || ''}
              alt={image.alt || ''}
              width={image.width || 500}
              height={image.height || 500}
            />
          ),
          details: ({ children, ...props }) => (
            <details className="my-4" {...props}>
              {children}
            </details>
          ),
          summary: ({ children, ...props }) => (
            <summary className="cursor-pointer hover:text-primary" {...props}>
              {children}
            </summary>
          ),
        }}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
