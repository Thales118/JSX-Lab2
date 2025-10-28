/** @jsx createElement */
import { createElement, mount, useState } from './jsx-runtime';
import { Card, Modal, Form, Input } from './components';

const ComponentsDemo = () => {
  const [getModal, setModal] = useState(false);
  const [getName, setName] = useState('');

  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  const handleSubmit = () => {
    alert(`Hello, ${getName()}!`);
    setName('');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto' }}>
      <Card title="Mini Component Library Demo">
        <Form onSubmit={handleSubmit}>
          <Input
            value={getName()}
            onChange={setName}
            placeholder="Enter your name"
          />
          <button
            type="submit"
            style={{
              backgroundColor: '#4e8cff',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '8px 16px',
              cursor: 'pointer',
            }}
          >
            Submit
          </button>
        </Form>
        <button
          onClick={openModal}
          style={{
            marginTop: '10px',
            backgroundColor: '#00b894',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: '8px 16px',
            cursor: 'pointer',
          }}
        >
          Open Modal
        </button>
      </Card>

      <Modal isOpen={getModal()} onClose={closeModal} title="Hello!">
        <p>This is a reusable modal component 😎</p>
      </Modal>
    </div>
  );
};

const root = document.getElementById('app');
if (root) mount(<ComponentsDemo />, root);
export { ComponentsDemo };
