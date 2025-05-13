import React from "react";
import styles from '../RightPanel/verfication-right-panel.module.css';

const CodeInput = ({ code, onCodeChange }) => {
  const handleInputChange = (index, event) => {
    let value = event.target.value;
    if (!/^[0-9]?$/.test(value)) return;

    onCodeChange(index, value);
    
    if (value && index < 5) {
      document.getElementById(`code-input-${index + 1}`).focus();
    }
  };

  return (
    <div className={styles.codeInput}>
      {code.map((digit, index) => (
        <input
          key={index}
          id={`code-input-${index}`}
          type="text"
          maxLength="1"
          autoComplete="off"
          value={digit}
          onChange={(e) => handleInputChange(index, e)}
        />
      ))}
    </div>
  );
};

export default CodeInput;
