import './style.scss';
import { router } from './router';

router.start();

const clickHandler: (event: MouseEvent) => void = (event) => {
  event.preventDefault();

  const target = event.target as HTMLElement;
  const href = target.getAttribute('href');

  if (href) {
    router.go(href);
  }
};

document.body.addEventListener('click', (event: MouseEvent) => clickHandler(event));
