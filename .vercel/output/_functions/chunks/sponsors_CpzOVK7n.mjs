import { c as createComponent } from './astro-component_C3RRFcv-.mjs';
import 'piccolore';
import { I as renderTemplate, u as maybeRenderHead, _ as addAttribute } from './sequence_By5MsV8w.mjs';
import { r as renderComponent } from './entrypoint_BTCT42F7.mjs';
import { $ as $$DashboardLayout } from './DashboardLayout_CHIhPeU5.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { getSponsors } from './data_DnS_ebgs.mjs';

const PACK_LABELS = {
  platine: "🥇 Platine",
  or: "🟡 Or",
  argent: "⚪ Argent",
  bronze: "🟤 Bronze",
  custom: "✨ Sur mesure"
};
const STATUS_LABELS = { pending: "⏳ En attente", confirmed: "✅ Confirmé", rejected: "❌ Refusé" };
const STATUS_COLORS = { pending: "#f3f1c7", confirmed: "#d4edda", rejected: "#fde8e8" };
function SponsorsTable({ initialData }) {
  const [data, setData] = useState(initialData);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [isAdding, setIsAdding] = useState(false);
  async function saveSponsor(sponsor) {
    const isNew = !sponsor.id;
    const method = isNew ? "POST" : "PATCH";
    const url = isNew ? "/api/sponsor/create" : "/api/sponsor/" + sponsor.id;
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sponsor)
    });
    const result = await res.json();
    if (isNew) {
      setData((prev) => [result, ...prev]);
    } else {
      setData((prev) => prev.map((s) => s.id === sponsor.id ? { ...s, ...sponsor } : s));
    }
  }
  async function updateSponsor(id, updates) {
    await saveSponsor({ ...updates, id });
  }
  async function deleteSponsor(id) {
    if (!confirm("Supprimer ce sponsor ?")) return;
    setData((prev) => prev.filter((s) => s.id !== id));
    await fetch("/api/sponsor/" + id, { method: "DELETE" });
  }
  const handleEdit = (s) => {
    setEditingId(s.id);
    setEditForm(s);
  };
  const handleAdd = () => {
    setIsAdding(true);
    setEditForm({ entreprise: "", contact: "", email: "", pack: "bronze", status: "confirmed" });
  };
  const handleSave = async () => {
    await saveSponsor(editForm);
    setEditingId(null);
    setIsAdding(false);
  };
  return /* @__PURE__ */ jsxs("div", { style: { fontFamily: "'Poppins', sans-serif" }, children: [
    /* @__PURE__ */ jsx("div", { style: { display: "flex", justifyContent: "flex-end", marginBottom: 20 }, children: /* @__PURE__ */ jsx("button", { onClick: handleAdd, style: { padding: "10px 20px", borderRadius: 12, border: "none", background: "#de6c49", color: "white", fontWeight: 700, cursor: "pointer", fontFamily: "'Fredoka', sans-serif" }, children: "+ Ajouter un sponsor" }) }),
    /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 12 }, children: [
      isAdding && /* @__PURE__ */ jsx("div", { style: { background: "#f3f1c7", borderRadius: 16, padding: "20px", border: "2px dashed #de6c49" }, children: /* @__PURE__ */ jsx(SponsorForm, { form: editForm, onChange: setEditForm, onSave: handleSave, onCancel: () => setIsAdding(false) }) }),
      data.length === 0 && !isAdding ? /* @__PURE__ */ jsx("div", { style: { textAlign: "center", padding: "64px", color: "#69322d", opacity: 0.4 }, children: "Aucun sponsor pour l'instant." }) : data.slice().reverse().map((s) => /* @__PURE__ */ jsx("div", { style: { background: "white", borderRadius: 16, padding: "16px 20px", border: "1.5px solid #e8e5a8" }, children: editingId === s.id ? /* @__PURE__ */ jsx(SponsorForm, { form: editForm, onChange: setEditForm, onSave: handleSave, onCancel: () => setEditingId(null) }) : /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexWrap: "wrap", gap: 12, alignItems: "flex-start" }, children: [
        s.imageUrl && /* @__PURE__ */ jsx("img", { src: s.imageUrl, style: { width: 60, height: 60, borderRadius: 12, objectFit: "contain", border: "1px solid #e8e5a8", padding: 4 }, alt: "" }),
        /* @__PURE__ */ jsxs("div", { style: { flex: 1, minWidth: 200 }, children: [
          /* @__PURE__ */ jsx("div", { style: { fontFamily: "'Fredoka', sans-serif", fontWeight: 700, fontSize: 16, color: "#69322d" }, children: s.entreprise }),
          /* @__PURE__ */ jsx("div", { style: { fontSize: 13, color: "#69322d", opacity: 0.7 }, children: s.contact }),
          s.pack && /* @__PURE__ */ jsx("div", { style: { fontSize: 12, color: "#26422b", fontWeight: 600, marginTop: 4 }, children: PACK_LABELS[s.pack] ?? s.pack }),
          /* @__PURE__ */ jsxs("div", { style: { fontSize: 12, color: "#de6c49", marginTop: 4 }, children: [
            s.zone && /* @__PURE__ */ jsxs("span", { children: [
              "📍 ",
              s.zone
            ] }),
            s.stand && /* @__PURE__ */ jsxs("span", { children: [
              " · 🏠 ",
              s.stand
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 12, marginTop: 8 }, children: [
            s.lienWeb && /* @__PURE__ */ jsx("a", { href: s.lienWeb, target: "_blank", style: { fontSize: 11, color: "#de6c49", textDecoration: "none", fontWeight: 600 }, children: "🌐 Site Web" }),
            s.instagram && /* @__PURE__ */ jsx("a", { href: `https://instagram.com/${s.instagram.replace("@", "")}`, target: "_blank", style: { fontSize: 11, color: "#de6c49", textDecoration: "none", fontWeight: 600 }, children: "📸 Instagram" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: { textAlign: "right" }, children: [
          /* @__PURE__ */ jsx("span", { style: { padding: "3px 10px", borderRadius: 9999, fontSize: 12, fontWeight: 600, background: STATUS_COLORS[s.status], color: "#69322d", display: "inline-block", marginBottom: 8 }, children: STATUS_LABELS[s.status] }),
          /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 6, justifyContent: "flex-end" }, children: [
            /* @__PURE__ */ jsx("button", { onClick: () => handleEdit(s), style: { padding: "4px 10px", borderRadius: 8, border: "1.5px solid #e8e5a8", background: "white", fontSize: 11, fontWeight: 600, cursor: "pointer" }, children: "✏️ Éditer" }),
            s.status !== "confirmed" && /* @__PURE__ */ jsx("button", { onClick: () => updateSponsor(s.id, { status: "confirmed" }), style: { padding: "4px 10px", borderRadius: 8, border: "none", background: "#26422b", color: "white", fontSize: 11, fontWeight: 600, cursor: "pointer" }, children: "✅ Confirmer" }),
            /* @__PURE__ */ jsx("button", { onClick: () => deleteSponsor(s.id), style: { padding: "4px 10px", borderRadius: 8, border: "none", background: "#fde8e8", color: "#c0392b", fontSize: 11, fontWeight: 600, cursor: "pointer" }, children: "🗑️" })
          ] }),
          /* @__PURE__ */ jsx("div", { style: { fontSize: 11, color: "#69322d", opacity: 0.4, marginTop: 4 }, children: new Date(s.createdAt).toLocaleDateString("fr-FR") })
        ] })
      ] }) }, s.id))
    ] })
  ] });
}
function SponsorForm({ form, onChange, onSave, onCancel }) {
  return /* @__PURE__ */ jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }, children: [
    /* @__PURE__ */ jsxs("div", { style: { gridColumn: "span 2" }, children: [
      /* @__PURE__ */ jsx("label", { style: { display: "block", fontSize: 11, fontWeight: 700, marginBottom: 4 }, children: "ENTREPRISE" }),
      /* @__PURE__ */ jsx("input", { style: inputStyle, value: form.entreprise, onChange: (ev) => onChange({ ...form, entreprise: ev.target.value }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { style: { display: "block", fontSize: 11, fontWeight: 700, marginBottom: 4 }, children: "SITE WEB" }),
      /* @__PURE__ */ jsx("input", { style: inputStyle, value: form.lienWeb || "", onChange: (ev) => onChange({ ...form, lienWeb: ev.target.value }), placeholder: "https://..." })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { style: { display: "block", fontSize: 11, fontWeight: 700, marginBottom: 4 }, children: "INSTAGRAM" }),
      /* @__PURE__ */ jsx("input", { style: inputStyle, value: form.instagram || "", onChange: (ev) => onChange({ ...form, instagram: ev.target.value }), placeholder: "@compte" })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { style: { display: "block", fontSize: 11, fontWeight: 700, marginBottom: 4 }, children: "ZONE" }),
      /* @__PURE__ */ jsx("input", { style: inputStyle, value: form.zone || "", onChange: (ev) => onChange({ ...form, zone: ev.target.value }), placeholder: "ex: Scène Centrale" })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { style: { display: "block", fontSize: 11, fontWeight: 700, marginBottom: 4 }, children: "STAND" }),
      /* @__PURE__ */ jsx("input", { style: inputStyle, value: form.stand || "", onChange: (ev) => onChange({ ...form, stand: ev.target.value }), placeholder: "ex: Stand A1" })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: { gridColumn: "span 2" }, children: [
      /* @__PURE__ */ jsx("label", { style: { display: "block", fontSize: 11, fontWeight: 700, marginBottom: 4 }, children: "IMAGE URL (LOGO)" }),
      /* @__PURE__ */ jsx("input", { style: inputStyle, value: form.imageUrl || "", onChange: (ev) => onChange({ ...form, imageUrl: ev.target.value }), placeholder: "https://..." })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: { gridColumn: "span 2", display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 8 }, children: [
      /* @__PURE__ */ jsx("button", { onClick: onCancel, style: { padding: "8px 16px", borderRadius: 8, border: "1.5px solid #e8e5a8", background: "white", cursor: "pointer", fontSize: 13, fontWeight: 600 }, children: "Annuler" }),
      /* @__PURE__ */ jsx("button", { onClick: onSave, style: { padding: "8px 16px", borderRadius: 8, border: "none", background: "#26422b", color: "white", cursor: "pointer", fontSize: 13, fontWeight: 600 }, children: "Enregistrer" })
    ] })
  ] });
}
const inputStyle = {
  width: "100%",
  border: "1.5px solid #e8e5a8",
  borderRadius: 10,
  padding: "8px 12px",
  fontSize: 14,
  fontFamily: "'Poppins', sans-serif",
  color: "#69322d",
  outline: "none",
  boxSizing: "border-box"
};

const $$Sponsors = createComponent(($$result, $$props, $$slots) => {
  const sponsors = getSponsors();
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "Sponsors", "activeTab": "sponsors" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:12px;margin-bottom:24px"> ${[
    { val: sponsors.length, label: "Total", color: "#26422b" },
    { val: sponsors.filter((s) => s.status === "confirmed").length, label: "Confirmés", color: "#26422b" },
    { val: sponsors.filter((s) => s.status === "pending").length, label: "En attente", color: "#de6c49" }
  ].map((s) => renderTemplate`<div style="background:white;border-radius:16px;padding:16px;border:1.5px solid #e8e5a8;text-align:center"> <div${addAttribute(`font-family:'Fredoka',sans-serif;font-size:28px;font-weight:700;color:${s.color}`, "style")}>${s.val}</div> <div style="font-family:'Poppins',sans-serif;font-size:11px;color:#69322d;opacity:.6;text-transform:uppercase">${s.label}</div> </div>`)} </div> <div style="display:flex;gap:10px;margin-bottom:20px"> <a href="/api/export?type=sponsors" download="sponsors.csv" style="display:inline-flex;align-items:center;gap:8px;background:#fff;border:1.5px solid #e8e5a8;border-radius:10px;padding:8px 16px;font-family:'Poppins',sans-serif;font-size:13px;font-weight:600;color:#69322d;text-decoration:none">
📥 Export CSV sponsors
</a> </div> ${sponsors.length === 0 ? renderTemplate`<div style="text-align:center;padding:64px;color:#69322d;opacity:.4;font-family:'Poppins',sans-serif">
Aucune demande de sponsoring pour l'instant.
</div>` : renderTemplate`${renderComponent($$result2, "SponsorsTable", SponsorsTable, { "initialData": sponsors, "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/tristan/Dev/woofday/src/components/dashboard/SponsorsTable", "client:component-export": "SponsorsTable" })}`}` })}`;
}, "/Users/tristan/Dev/woofday/src/pages/dashboard/sponsors.astro", void 0);

const $$file = "/Users/tristan/Dev/woofday/src/pages/dashboard/sponsors.astro";
const $$url = "/dashboard/sponsors";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Sponsors,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
