import React from 'react';

const renderInline = (text) =>
  text.split(/(\*\*[^*]+\*\*)/g).map((chunk, i) =>
    chunk.startsWith('**') && chunk.endsWith('**')
      ? <strong key={i}>{chunk.slice(2, -2)}</strong>
      : <React.Fragment key={i}>{chunk}</React.Fragment>
  );

export const RichText = ({ blocks, className = '' }) => (
  <div className={`prose ${className}`}>
    {blocks.map((block, index) => {
      if (block.t === 'h2') return <h2 key={index}>{block.v}</h2>;
      if (block.t === 'h3') return <h3 key={index}>{block.v}</h3>;
      if (block.t === 'quote') return <blockquote key={index}>{renderInline(block.v)}</blockquote>;
      if (block.t === 'ul') {
        return (
          <ul key={index}>
            {block.v.map((item, i) => <li key={i}>{renderInline(item)}</li>)}
          </ul>
        );
      }
      return <p key={index}>{renderInline(block.v)}</p>;
    })}
  </div>
);

export default RichText;
