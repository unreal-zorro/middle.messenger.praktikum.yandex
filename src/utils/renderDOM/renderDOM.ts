import type { Block } from '@/base';

export function render(query: string, block: Block) {
  const root = document.querySelector(query);

  if (root) {
    if (root.firstElementChild) {
      root.removeChild(root.firstElementChild);
    }
    root.appendChild(block.getContent()!);
  }

  block.dispatchComponentDidMount();
  return root;
}
