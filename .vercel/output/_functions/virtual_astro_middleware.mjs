import { d as defineMiddleware, s as sequence } from './chunks/sequence_By5MsV8w.mjs';
import 'piccolore';
import 'clsx';
import { c as checkSession } from './chunks/auth_BNvM6Niv.mjs';

const onRequest$1 = defineMiddleware(({ url, cookies, redirect }, next) => {
  const isDashboard = url.pathname.startsWith("/dashboard") && url.pathname !== "/dashboard/login";
  if (isDashboard && !checkSession(cookies)) {
    return redirect("/dashboard/login");
  }
  return next();
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
