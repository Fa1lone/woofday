import { c as createComponent } from './astro-component_C3RRFcv-.mjs';
import 'piccolore';
import { I as renderTemplate, u as maybeRenderHead } from './sequence_By5MsV8w.mjs';
import { r as renderComponent } from './entrypoint_BTCT42F7.mjs';
import { $ as $$DashboardLayout } from './DashboardLayout_CHIhPeU5.mjs';

const $$Settings = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "Réglages", "activeTab": "settings" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div style="max-width:480px"> <div style="background:white;border-radius:16px;padding:20px;border:1.5px solid #e8e5a8;margin-bottom:16px"> <h2 style="font-family:'Fredoka',sans-serif;font-size:18px;color:#69322d;margin:0 0 12px">Événement</h2> <div style="font-family:'Poppins',sans-serif;font-size:14px;color:#69322d;opacity:.7;line-height:1.8"> <div>📅 <strong>Date :</strong> Dimanche 13 septembre 2026</div> <div>🕙 <strong>Horaires :</strong> 10h – 18h</div> <div>📍 <strong>Lieu :</strong> Ambérac, Charente (16)</div> <div>🎫 <strong>Entrée :</strong> Gratuite</div> <div>❤️ <strong>Cause :</strong> Refuge de l'Angoumois</div> </div> </div> <div style="background:#f3f1c7;border-radius:16px;padding:16px;font-family:'Poppins',sans-serif;font-size:13px;color:#69322d;opacity:.7">
Pour modifier les données de l'événement, contactez le développeur.
</div> </div> ` })}`;
}, "/Users/tristan/Dev/woofday/src/pages/dashboard/settings.astro", void 0);

const $$file = "/Users/tristan/Dev/woofday/src/pages/dashboard/settings.astro";
const $$url = "/dashboard/settings";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Settings,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
