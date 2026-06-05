export function checkSession(cookies: { get: (name: string) => { value: string } | undefined }): boolean {
  const session = cookies.get('wd_session');
  return session?.value === (import.meta.env.SESSION_SECRET ?? 'change-me');
}

export function createSessionCookie(secret: string): string {
  return `wd_session=${secret}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400`;
}
