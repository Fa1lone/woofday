import { c as createComponent } from './astro-component_C3RRFcv-.mjs';
import 'piccolore';
import { bi as renderHead, I as renderTemplate } from './sequence_By5MsV8w.mjs';
import 'clsx';
import { c as checkSession } from './auth_BNvM6Niv.mjs';

const $$Login = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Login;
  if (checkSession(Astro2.cookies)) return Astro2.redirect("/dashboard");
  const error = Astro2.url.searchParams.get("error");
  return renderTemplate`<html lang="fr"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Connexion — Woof Day Admin</title><link rel="icon" type="image/svg+xml" href="/logos/logo-chien-noir.svg"><link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">${renderHead()}</head> <body style="margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#f3f1c7;font-family:'Poppins',sans-serif"> <div style="width:100%;max-width:400px;padding:16px"> <div style="background:white;border-radius:28px;padding:40px;box-shadow:0 8px 40px rgba(105,50,45,.12);border:1.5px solid #e8e5a8"> <div style="text-align:center;margin-bottom:32px"> <img src="/logos/logo-couleur.svg" alt="Woof Day" style="height:48px;margin-bottom:16px"> <h1 style="font-family:'Fredoka',sans-serif;font-size:26px;font-weight:700;color:#69322d;margin:0">Accès Admin</h1> <p style="font-size:13px;color:#69322d;opacity:.6;margin:6px 0 0">Dashboard Woof Day 2026</p> </div> ${error && renderTemplate`<div style="background:#fde8e8;border-radius:12px;padding:12px 16px;margin-bottom:20px;font-size:13px;color:#c0392b;font-weight:600;text-align:center">
❌ Mot de passe incorrect
</div>`} <form method="POST" action="/api/auth"> <label style="display:block;font-size:13px;font-weight:600;color:#69322d;margin-bottom:6px">Mot de passe</label> <input type="password" name="password" placeholder="••••••••••" autofocus required style="width:100%;border:2px solid #e8e5a8;border-radius:14px;padding:14px 16px;font-size:15px;color:#69322d;outline:none;font-family:'Poppins',sans-serif;box-sizing:border-box;margin-bottom:16px" onfocus="this.style.borderColor='#de6c49'" onblur="this.style.borderColor='#e8e5a8'"> <button type="submit" style="width:100%;background:#de6c49;color:white;border:none;border-radius:9999px;padding:14px;font-family:'Fredoka',sans-serif;font-size:18px;font-weight:700;cursor:pointer">
Accéder au dashboard 🐾
</button> </form> <div style="margin-top:24px;background:#f3f1c7;border-radius:14px;padding:14px;font-size:12px;color:#69322d;opacity:.7;line-height:1.6"> <strong style="opacity:1">🔑 Accès réservé</strong><br>
Ce dashboard est réservé aux organisateurs du Woof Day.<br>
Mot de passe par défaut : <code style="background:white;padding:2px 6px;border-radius:6px">woofday2026</code> </div> <div style="text-align:center;margin-top:16px"> <a href="/" style="font-size:12px;color:#69322d;opacity:.5;text-decoration:none">← Retour au site public</a> </div> </div> </div> </body></html>`;
}, "/Users/tristan/Dev/woofday/src/pages/dashboard/login.astro", void 0);

const $$file = "/Users/tristan/Dev/woofday/src/pages/dashboard/login.astro";
const $$url = "/dashboard/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
