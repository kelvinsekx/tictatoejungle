import React, { useState } from 'react';

export default function Aside({ isVisible, submitUsername }) {
  const [v, sV] = useState('');
  return (
    <>
      <div
        style={
          isVisible
            ? {
                background: '#555555',
                border: '1px solid #111',
                width: '8rem',
                height: '4rem',
                color: 'white',
                position: 'absolute',
                right: '18px',
                top: '2.8rem',
              }
            : { display: 'none' }
        }
      >
        <div>
          <input
            value={v}
            onChange={(e) => sV(e.target.value)}
            style={{ width: '100%', boxSizing: 'border-box' }}
          />
          <button onClick={() => submitUsername(v)}>
            set username
          </button>
        </div>
      </div>
    </>
  );
}
