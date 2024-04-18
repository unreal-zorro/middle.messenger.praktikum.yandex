import type { Block } from '@/base';

export function render(query: string, block: Block) {
  const root = document.querySelector(query);

  if (root) {
    root.innerHTML = '';
    const content = block.getContent();

    if (content) {
      root.appendChild(content);
    }
  }

  block.dispatchComponentDidMount();
  return root;
}
