import React, { useState } from 'react';
import { evaluate } from 'advanced-calculator';

const Calculator = () => {
  const [expression, setExpression] = useState('');

  const handleButtonClick = (value) => {
    setExpression(prevExpression => prevExpression + value);
  };

  const handleEvaluate = () => {
    try {
      const result = evaluate(expression);
      setExpression(result.toString());
    } catch (error) {
      console.error('Error evaluating expression:', error);
    }
  };

  const handleClear = () => {
    setExpression('');
  };

  return (
    <div>
      <input type="text" value={expression} readOnly />
      <div>
        <button onClick={() => handleButtonClick('1')}>1</button>
        <button onClick={() => handleButtonClick('2')}>2</button>
        <button onClick={() => handleButtonClick('3')}>3</button>
        <button onClick={() => handleButtonClick('+')}>+</button>
      </div>
      <div>
        <button onClick={() => handleButtonClick('4')}>4</button>
        <button onClick={() => handleButtonClick('5')}>5</button>
        <button onClick={() => handleButtonClick('6')}>6</button>
        <button onClick={() => handleButtonClick('-')}>-</button>
      </div>
      <div>
        <button onClick={() => handleButtonClick('7')}>7</button>
        <button onClick={() => handleButtonClick('8')}>8</button>
        <button onClick={() => handleButtonClick('9')}>9</button>
        <button onClick={() => handleButtonClick('*')}>*</button>
      </div>
      <div>
        <button onClick={() => handleButtonClick('0')}>0</button>
        <button onClick={() => handleButtonClick('.')}>.</button>
        <button onClick={handleEvaluate}>=</button>
        <button onClick={() => handleButtonClick('/')}>/</button>
      </div>
      <div>
        <button onClick={handleClear}>C</button>
      </div>
    </div>
  );
};

export default Calculator;
