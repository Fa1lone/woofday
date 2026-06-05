import { c as createComponent } from './astro-component_C3RRFcv-.mjs';
import 'piccolore';
import { I as renderTemplate, u as maybeRenderHead, _ as addAttribute } from './sequence_By5MsV8w.mjs';
import { r as renderComponent } from './entrypoint_BTCT42F7.mjs';
import { $ as $$DashboardLayout } from './DashboardLayout_CHIhPeU5.mjs';
import { getContacts } from './data_DnS_ebgs.mjs';

const $$Contacts = createComponent(($$result, $$props, $$slots) => {
  const contacts = getContacts();
  const reasonLabels = {
    venir: "🎉 Venir à l'événement",
    benevole: "🙋 Être bénévole",
    idee: "💡 Proposer une idée",
    info: "📬 Être informé",
    affiche: "📌 Demander des affiches",
    pro: "🤝 Exposant / Sponsor"
  };
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "Messages de contact", "activeTab": "contacts" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px"> <div style="font-family:'Poppins',sans-serif;font-size:14px;color:#69322d;opacity:.6"> ${contacts.length} message${contacts.length > 1 ? "s" : ""} reçu${contacts.length > 1 ? "s" : ""} </div> <a href="/api/export?type=contacts" download="contacts.csv" style="display:inline-flex;align-items:center;gap:8px;background:#fff;border:1.5px solid #e8e5a8;border-radius:10px;padding:8px 16px;font-family:'Poppins',sans-serif;font-size:13px;font-weight:600;color:#69322d;text-decoration:none">
📥 Export CSV
</a> </div> ${contacts.length === 0 ? renderTemplate`<div style="text-align:center;padding:64px;color:#69322d;opacity:.4;font-family:'Poppins',sans-serif">
Aucun message pour l'instant.
</div>` : renderTemplate`<div style="display:flex;flex-direction:column;gap:10px"> ${contacts.slice().reverse().map((c) => renderTemplate`<div style="background:white;border-radius:16px;padding:16px 20px;border:1.5px solid #e8e5a8;display:flex;flex-wrap:wrap;gap:12px;align-items:flex-start"> <div style="flex:1;min-width:200px"> <div style="font-family:'Fredoka',sans-serif;font-weight:700;font-size:16px;color:#69322d">${c.nom}</div> <div style="font-family:'Poppins',sans-serif;font-size:12px;color:#de6c49;margin-top:2px">${reasonLabels[c.reason] ?? c.reason}</div> ${c.message && renderTemplate`<div style="font-family:'Poppins',sans-serif;font-size:13px;color:#69322d;opacity:.7;margin-top:8px;line-height:1.5">${c.message}</div>`} </div> <div style="text-align:right"> <a${addAttribute(`mailto:${c.email}`, "href")} style="font-family:'Poppins',sans-serif;font-size:12px;color:#91acda;text-decoration:none;display:block">${c.email}</a> <div style="font-family:'Poppins',sans-serif;font-size:11px;color:#69322d;opacity:.4;margin-top:4px">${new Date(c.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })}</div> </div> </div>`)} </div>`}` })}`;
}, "/Users/tristan/Dev/woofday/src/pages/dashboard/contacts.astro", void 0);

const $$file = "/Users/tristan/Dev/woofday/src/pages/dashboard/contacts.astro";
const $$url = "/dashboard/contacts";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Contacts,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
