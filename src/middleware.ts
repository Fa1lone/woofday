import { defineMiddleware } from 'astro:middleware';
import { checkSession } from './lib/auth';

export const onRequest = defineMiddleware(({ url, cookies, redirect }, next) => {
  const isDashboard = url.pathname.startsWith('/dashboard') && url.pathname !== '/dashboard/login';
  if (isDashboard && !checkSession(cookies)) {
    return redirect('/dashboard/login');
  }
  return next();
});
