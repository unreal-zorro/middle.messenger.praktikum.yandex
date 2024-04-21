import type { Router } from '@/base';

export function errorRedirect(error: unknown, router: Router) {
  const { message } = error as Error;
  const status = message.slice(8, 11);
  const reason = message.slice(21);

  if (reason === 'User already in system') {
    router.go('/messenger');
  } else if (status === '401') {
    console.log(message);
    router.go('/');
  } else if (status === '500') {
    console.log(message);
    router.go('/error500');
  } else {
    console.log(message);
  }
}
