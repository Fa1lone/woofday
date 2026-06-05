import { c as createComponent } from './astro-component_C3RRFcv-.mjs';
import 'piccolore';
import { J as createRenderInstruction, _ as addAttribute, bi as renderHead, bj as renderSlot, I as renderTemplate, u as maybeRenderHead } from './sequence_By5MsV8w.mjs';
import 'clsx';

async function renderScript(result, id) {
  const inlined = result.inlinedScripts.get(id);
  let content = "";
  if (inlined != null) {
    if (inlined) {
      content = `<script type="module">${inlined}</script>`;
    }
  } else {
    const resolved = await result.resolve(id);
    content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"></script>`;
  }
  return createRenderInstruction({ type: "script", id, content });
}

const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title = "Woof Day — La grande fête canine de Charente",
    description = "Dimanche 13 septembre 2026 à Ambérac. Entrée gratuite, 50+ exposants, animations, tombola. Au profit du Refuge de l'Angoumois."
  } = Astro2.props;
  return renderTemplate`<html lang="fr"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title}</title><meta name="description"${addAttribute(description, "content")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:type" content="website"><link rel="icon" type="image/svg+xml" href="/logos/tete-chien.svg"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Kalam:wght@400;700&family=Poppins:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">${renderHead()}</head> <body> <div id="toast"></div> ${renderSlot($$result, $$slots["default"])} ${renderScript($$result, "/Users/tristan/Dev/woofday/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts")} </body> </html> `;
}, "/Users/tristan/Dev/woofday/src/layouts/Layout.astro", void 0);

const $$DoodleMark = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$DoodleMark;
  const {
    variant = "arrow",
    color = "currentColor",
    class: className = "",
    style = ""
  } = Astro2.props;
  return renderTemplate`${variant === "arrow" && renderTemplate`${maybeRenderHead()}<svg${addAttribute(`doodle-mark ${className}`, "class")}${addAttribute(style, "style")} width="60" height="50" viewBox="0 0 60 50" fill="none" aria-hidden="true" data-astro-cid-b6j7xr4j><path d="M5 5 C15 3 35 15 52 40"${addAttribute(color, "stroke")} stroke-width="2.5" stroke-linecap="round" fill="none" data-astro-cid-b6j7xr4j></path><path d="M52 40 L42 34"${addAttribute(color, "stroke")} stroke-width="2.5" stroke-linecap="round" data-astro-cid-b6j7xr4j></path><path d="M52 40 L48 48"${addAttribute(color, "stroke")} stroke-width="2.5" stroke-linecap="round" data-astro-cid-b6j7xr4j></path></svg>`}${variant === "arrow-curved" && renderTemplate`<svg${addAttribute(`doodle-mark ${className}`, "class")}${addAttribute(style, "style")} width="80" height="80" viewBox="0 0 80 80" fill="none" aria-hidden="true" data-astro-cid-b6j7xr4j><path d="M10 10 Q 40 5, 50 40 T 70 70"${addAttribute(color, "stroke")} stroke-width="2" stroke-linecap="round" fill="none" data-astro-cid-b6j7xr4j></path><path d="M70 70 L58 68"${addAttribute(color, "stroke")} stroke-width="2" stroke-linecap="round" data-astro-cid-b6j7xr4j></path><path d="M70 70 L68 58"${addAttribute(color, "stroke")} stroke-width="2" stroke-linecap="round" data-astro-cid-b6j7xr4j></path></svg>`}${variant === "circle" && renderTemplate`<svg${addAttribute(`doodle-mark ${className}`, "class")}${addAttribute(style, "style")} width="220" height="96" viewBox="0 0 220 96" fill="none" aria-hidden="true" data-astro-cid-b6j7xr4j><path d="M112 7C164 6 211 24 214 51C217 76 176 90 109 90C42 90 8 75 8 50C8 23 58 8 112 7Z"${addAttribute(color, "stroke")} stroke-width="3" stroke-linecap="round" data-astro-cid-b6j7xr4j></path><path d="M116 13C166 13 205 29 205 51C205 72 168 84 108 84C48 84 17 72 17 51C17 31 60 14 116 13Z"${addAttribute(color, "stroke")} stroke-width="1.8" stroke-linecap="round" opacity=".45" data-astro-cid-b6j7xr4j></path></svg>`}${variant === "burst" && renderTemplate`<svg${addAttribute(`doodle-mark ${className}`, "class")}${addAttribute(style, "style")} width="86" height="70" viewBox="0 0 86 70" fill="none" aria-hidden="true" data-astro-cid-b6j7xr4j><path d="M43 5 L43 20"${addAttribute(color, "stroke")} stroke-width="4" stroke-linecap="round" data-astro-cid-b6j7xr4j></path><path d="M15 15 L28 28"${addAttribute(color, "stroke")} stroke-width="4" stroke-linecap="round" data-astro-cid-b6j7xr4j></path><path d="M71 15 L58 28"${addAttribute(color, "stroke")} stroke-width="4" stroke-linecap="round" data-astro-cid-b6j7xr4j></path></svg>`}${variant === "underline" && renderTemplate`<svg${addAttribute(`doodle-mark ${className}`, "class")}${addAttribute(style, "style")} width="160" height="20" viewBox="0 0 160 20" fill="none" aria-hidden="true" data-astro-cid-b6j7xr4j><path d="M5 10 C30 12 130 8 155 12"${addAttribute(color, "stroke")} stroke-width="4" stroke-linecap="round" fill="none" data-astro-cid-b6j7xr4j></path></svg>`}`;
}, "/Users/tristan/Dev/woofday/src/components/DoodleMark.astro", void 0);

const $$LogoTicker = createComponent(($$result, $$props, $$slots) => {
  const logos = [
    "/logos/LOGOCOULEURV1.svg",
    "/logos/LOGOCOULEURV2.svg",
    "/logos/LOGOCOULEURV4.svg",
    "/logos/LOGOCOULEURV5.svg"
  ];
  const loop = [...logos, ...logos, ...logos];
  return renderTemplate`${maybeRenderHead()}<div class="logo-ticker" aria-label="Variantes du logo Woof Day" data-astro-cid-poo66wfk> <div class="logo-ticker__track" data-astro-cid-poo66wfk> ${loop.map((src) => renderTemplate`<img class="logo-ticker__logo"${addAttribute(src, "src")} alt="Woof Day" loading="lazy" data-astro-cid-poo66wfk>`)} </div> </div>`;
}, "/Users/tristan/Dev/woofday/src/components/LogoTicker.astro", void 0);

export { $$Layout as $, $$DoodleMark as a, $$LogoTicker as b, renderScript as r };
