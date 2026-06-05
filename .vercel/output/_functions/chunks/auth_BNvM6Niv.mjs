function checkSession(cookies) {
  const session = cookies.get("wd_session");
  return session?.value === "change-me-in-production-with-a-long-random-string";
}
function createSessionCookie(secret) {
  return `wd_session=${secret}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400`;
}

export { createSessionCookie as a, checkSession as c };
