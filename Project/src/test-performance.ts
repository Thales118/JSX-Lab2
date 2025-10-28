/** @jsx createElement */
import { createElement, renderToDOM } from './jsx-runtime';

const t0 = performance.now();

for (let i = 0; i < 1000; i++) {
  const vnode = createElement('div', { className: 'box' }, `Item ${i}`);
  renderToDOM(vnode);
}

const t1 = performance.now();
console.log(`✅ createElement + renderToDOM executed 1000x in ${t1 - t0} ms`);
