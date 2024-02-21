import React from 'react';
import '../styles/Button.css'

function Button({ onClick, text }) {
  return (
    <button className='clic-button'
      onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
