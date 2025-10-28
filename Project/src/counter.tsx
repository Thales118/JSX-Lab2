/** @jsx createElement */
import { createElement, useState } from './jsx-runtime';

// interface cho Button
interface ButtonProps {
  onClick?: () => void;
  className?: string;
  children?: (string | number | any)[];
}

// Component Button
const Button = ({ onClick, className = '', children }: ButtonProps) => {
  return (
    <button className={className} onClick={onClick} style={{ margin: '4px', padding: '6px 12px' }}>
      {children}
    </button>
  );
};

// interface cho Counter
interface CounterProps {
  initialCount?: number;
}

// Component Counter
const Counter = ({ initialCount = 0 }: CounterProps) => {
  const [getCount, setCount] = useState(initialCount);

  const increment = () => setCount(getCount() + 1);
  const decrement = () => setCount(getCount() - 1);
  const reset = () => setCount(initialCount);

  return (
    <div className="counter" style={{ textAlign: 'center', marginTop: '40px' }}>
      <h2>Count: {getCount()}</h2>
      <div className="buttons">
        <Button onClick={increment}>+</Button>
        <Button onClick={decrement}>-</Button>
        <Button onClick={reset}>Reset</Button>
      </div>
    </div>
  );
};

export { Counter };
