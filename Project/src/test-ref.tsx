/** @jsx createElement */
import { createElement, mount } from './jsx-runtime';

const RefTest = () => {
  let divRef: HTMLElement | null = null;

  const handleClick = () => {
    if (divRef) {
      divRef.style.backgroundColor = '#4e8cff';
      divRef.textContent = 'Ref works!';
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <div
        // thêm kiểu cho el để fix lỗi TS7006
        ref={(el: HTMLElement | null) => (divRef = el)}
        style={{
          backgroundColor: '#eee',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '12px'
        }}
      >
        Click button to test ref
      </div>
      <button
        onClick={handleClick}
        style={{
          backgroundColor: '#4e8cff',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          padding: '8px 16px',
          cursor: 'pointer'
        }}
      >
        Change via Ref
      </button>
    </div>
  );
};

const root = document.getElementById('app');
if (root) mount(<RefTest />, root);

