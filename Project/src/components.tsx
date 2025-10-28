/** @jsx createElement */
import { createElement } from './jsx-runtime';

/* -------------------------------
   🧩 CARD COMPONENT
-------------------------------- */
interface CardProps {
  key?: string | number;
  title?: string;
  children?: any;
  className?: string;
  onClick?: () => void;
}

const Card = ({ title, children, className = '', onClick }: CardProps) => {
  return (
    <div
      className={`card ${className}`}
      onClick={onClick}
      style={{
        border: '1px solid #ddd',
        borderRadius: '12px',
        padding: '16px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        marginBottom: '16px',
        backgroundColor: '#fff',
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      {title && (
        <h3 style={{ marginBottom: '8px', color: '#4e8cff' }}>{title}</h3>
      )}
      <div>{children}</div>
    </div>
  );
};

/* -------------------------------
   🪟 MODAL COMPONENT
-------------------------------- */
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: any;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      onClick={handleOverlayClick as any}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: '10px',
          padding: '20px',
          width: '400px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        }}
      >
        {title && (
          <h2 style={{ color: '#4e8cff', marginBottom: '10px' }}>{title}</h2>
        )}
        <div>{children}</div>
        <button
          onClick={onClose}
          style={{
            marginTop: '16px',
            padding: '8px 12px',
            backgroundColor: '#ff6b6b',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

/* -------------------------------
   🧾 FORM COMPONENT
-------------------------------- */
interface FormProps {
  onSubmit: (e: Event) => void;
  children?: any;
  className?: string;
}

const Form = ({ onSubmit, children, className = '' }: FormProps) => {
  const handleSubmit = (e: Event) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form className={className} onSubmit={handleSubmit as any}>
      {children}
    </form>
  );
};

/* -------------------------------
   🖋 INPUT COMPONENT
-------------------------------- */
interface InputProps {
  type?: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
}

const Input = ({
  type = 'text',
  value,
  onChange,
  placeholder = '',
  className = '',
}: InputProps) => {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onInput={(e: any) => onChange(e.target.value)}
      className={className}
      style={{
        padding: '8px 12px',
        border: '1px solid #ccc',
        borderRadius: '6px',
        width: '100%',
        marginBottom: '10px',
      }}
    />
  );
};

/* -------------------------------
   EXPORT COMPONENTS
-------------------------------- */
export { Card, Modal, Form, Input };
