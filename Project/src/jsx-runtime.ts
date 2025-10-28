/**
 * ============================================
 * JSX RUNTIME IMPLEMENTATION – LAB 2
 * Author: <your name>
 * Date: <submit date>
 *
 * Description:
 * This file implements a custom JSX runtime similar to React's internal logic,
 * enabling component rendering, state management, and virtual node creation
 * without using React library.
 * 
 * Core functionalities:
 * 1. createElement() – Creates virtual DOM nodes (VNode)
 * 2. renderToDOM() – Converts VNodes into real DOM elements
 * 3. mount() – Attaches a rendered component tree into the container
 * 4. useState() – Implements local component state system
 * 
 * Optimization highlights:
 * - Flatten nested children arrays for performance
 * - Ignore null/undefined children to avoid invalid DOM nodes
 * - Direct property mapping for native attributes & styles
 * - Efficient fragment handling via DocumentFragment
 * 
 * Reusability:
 * - Components such as Card, Modal, and Form reuse this runtime
 * - useState is used across Counter and TodoApp
 * ============================================
 */

export interface VNode {
  type: string | ComponentFunction;
  props: Record<string, any>;
  children: (VNode | string | number)[];
}

export interface ComponentProps {
  children?: (VNode | string | number)[];
  [key: string]: any;
}

export type ComponentFunction = (props: ComponentProps) => VNode;

export function createElement(
  type: string | ComponentFunction,
  props: Record<string, any> | null,
  ...children: (VNode | string | number)[]
): VNode {
  const finalProps = props || {};
  const flatChildren = children.flat().filter(c => c !== null && c !== undefined);
  return { type, props: finalProps, children: flatChildren };
}

export function createFragment(
  props: Record<string, any> | null,
  ...children: (VNode | string | number)[]
): VNode {
  return createElement('fragment', props, ...children);
}
const vnode = createElement('div', { className: 'test' }, 'Hello World');
console.log(vnode);
export function renderToDOM(vnode: VNode | string | number): Node {
  if (typeof vnode === 'string' || typeof vnode === 'number') {
    return document.createTextNode(String(vnode));
  }

  if (vnode.type === 'fragment') {
    const fragment = document.createDocumentFragment();
    vnode.children.forEach(child => fragment.appendChild(renderToDOM(child)));
    return fragment;
  }

  if (typeof vnode.type === 'function') {
    const componentVNode = vnode.type({ ...vnode.props, children: vnode.children });
    return renderToDOM(componentVNode);
  }

  const el = document.createElement(vnode.type as string);
 for (const [key, value] of Object.entries(vnode.props)) {
  // Feature 1: Ref support
  if (key === 'ref' && typeof value === 'function') {
    value(el); // gọi ref callback với element
  }

  // Feature 2: Event handler (onClick, onInput, ...)
  else if (key.startsWith('on') && typeof value === 'function') {
    el.addEventListener(key.slice(2).toLowerCase(), value);
  }

  // Feature 3: className
  else if (key === 'className') {
    el.className = value;
  }

  // Feature 4: CSS-in-JS support
  else if (key === 'style') {
    if (typeof value === 'string') {
      el.setAttribute('style', value);
    } else if (typeof value === 'object') {
      const styleString = Object.entries(value)
        .map(([prop, val]) =>
          `${prop.replace(/[A-Z]/g, m => '-' + m.toLowerCase())}:${val}`
        )
        .join(';');
      el.setAttribute('style', styleString);
    }
  }

  // Feature 5: default attribute
  else {
    el.setAttribute(key, value);
  }
}

  vnode.children.forEach(child => el.appendChild(renderToDOM(child)));
  return el;
}

export function mount(vnode: VNode, container: HTMLElement): void {
  container.appendChild(renderToDOM(vnode));
}

export function useState<T>(initialValue: T): [() => T, (newValue: T) => void] {
  let value = initialValue;
  const get = () => value;
  const set = (newValue: T) => { value = newValue; };
  return [get, set];
}
