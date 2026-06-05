import { c as createComponent } from './astro-component_C3RRFcv-.mjs';
import 'piccolore';
import { I as renderTemplate, u as maybeRenderHead, _ as addAttribute } from './sequence_By5MsV8w.mjs';
import { r as renderComponent } from './entrypoint_BTCT42F7.mjs';
import { $ as $$DashboardLayout } from './DashboardLayout_CHIhPeU5.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { getExposants, getInterestCount } from './data_DnS_ebgs.mjs';

const STATUS_LABELS = {
  pending: "⏳ En attente",
  confirmed: "✅ Confirmé",
  rejected: "❌ Refusé"
};
const STATUS_COLORS = {
  pending: "#f3f1c7",
  confirmed: "#d4edda",
  rejected: "#fde8e8"
};
function ExposantsTable({ initialData }) {
  const [data, setData] = useState(initialData);
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [isAdding, setIsAdding] = useState(false);
  const filtered = filter === "all" ? data : data.filter((e) => e.status === filter);
  async function saveExposant(exposant) {
    const isNew = !exposant.id;
    const method = isNew ? "POST" : "PATCH";
    const url = isNew ? "/api/exposant/create" : "/api/exposant/" + exposant.id;
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(exposant)
    });
    const result = await res.json();
    if (isNew) {
      setData((prev) => [result, ...prev]);
    } else {
      setData((prev) => prev.map((e) => e.id === exposant.id ? { ...e, ...exposant } : e));
    }
  }
  async function updateExposant(id, updates) {
    await saveExposant({ ...updates, id });
  }
  async function deleteExposant(id) {
    if (!confirm("Supprimer cet exposant ?")) return;
    setData((prev) => prev.filter((e) => e.id !== id));
    await fetch("/api/exposant/" + id, { method: "DELETE" });
  }
  const handleEdit = (e) => {
    setEditingId(e.id);
    setEditForm(e);
  };
  const handleAdd = () => {
    setIsAdding(true);
    setEditForm({ structure: "", responsable: "", email: "", telephone: "", ville: "", pole: "", description: "", status: "confirmed" });
  };
  const handleSave = async () => {
    await saveExposant(editForm);
    setEditingId(null);
    setIsAdding(false);
  };
  return /* @__PURE__ */ jsxs("div", { style: { fontFamily: "'Poppins', sans-serif" }, children: [
    /* @__PURE__ */ jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }, children: [
      /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" }, children: ["all", "pending", "confirmed", "rejected"].map((f) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setFilter(f),
          style: {
            padding: "6px 16px",
            borderRadius: 9999,
            border: "none",
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 600,
            background: filter === f ? "#69322d" : "#f3f1c7",
            color: filter === f ? "white" : "#69322d"
          },
          children: f === "all" ? `Tous (${data.length})` : STATUS_LABELS[f] + ` (${data.filter((e) => e.status === f).length})`
        },
        f
      )) }),
      /* @__PURE__ */ jsx("button", { onClick: handleAdd, style: { padding: "10px 20px", borderRadius: 12, border: "none", background: "#de6c49", color: "white", fontWeight: 700, cursor: "pointer", fontFamily: "'Fredoka', sans-serif" }, children: "+ Ajouter un exposant" })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 12 }, children: [
      isAdding && /* @__PURE__ */ jsx("div", { style: { background: "#f3f1c7", borderRadius: 16, padding: "20px", border: "2px dashed #de6c49" }, children: /* @__PURE__ */ jsx(ExposantForm, { form: editForm, onChange: setEditForm, onSave: handleSave, onCancel: () => setIsAdding(false) }) }),
      filtered.length === 0 && !isAdding ? /* @__PURE__ */ jsx("div", { style: { textAlign: "center", padding: "48px", color: "#69322d", opacity: 0.5 }, children: "Aucun exposant pour l'instant." }) : filtered.map((e) => /* @__PURE__ */ jsx("div", { style: { background: "white", borderRadius: 16, padding: "16px 20px", border: "1.5px solid #e8e5a8" }, children: editingId === e.id ? /* @__PURE__ */ jsx(ExposantForm, { form: editForm, onChange: setEditForm, onSave: handleSave, onCancel: () => setEditingId(null) }) : /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexWrap: "wrap", gap: 12, alignItems: "flex-start" }, children: [
        e.imageUrl && /* @__PURE__ */ jsx("img", { src: e.imageUrl, style: { width: 60, height: 60, borderRadius: 12, objectFit: "cover", border: "1px solid #e8e5a8" }, alt: "" }),
        /* @__PURE__ */ jsxs("div", { style: { flex: 1, minWidth: 200 }, children: [
          /* @__PURE__ */ jsx("div", { style: { fontFamily: "'Fredoka', sans-serif", fontWeight: 700, fontSize: 16, color: "#69322d" }, children: e.structure }),
          /* @__PURE__ */ jsxs("div", { style: { fontSize: 13, color: "#69322d", opacity: 0.7 }, children: [
            e.responsable,
            " · ",
            e.ville
          ] }),
          /* @__PURE__ */ jsx("div", { style: { fontSize: 12, color: "#de6c49", marginTop: 2 }, children: e.pole }),
          e.description && /* @__PURE__ */ jsx("div", { style: { fontSize: 12, color: "#69322d", opacity: 0.6, marginTop: 6, lineHeight: 1.4 }, children: e.description }),
          /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 12, marginTop: 8 }, children: [
            e.lienWeb && /* @__PURE__ */ jsx("a", { href: e.lienWeb, target: "_blank", style: { fontSize: 11, color: "#de6c49", textDecoration: "none", fontWeight: 600 }, children: "🌐 Site Web" }),
            e.instagram && /* @__PURE__ */ jsx("a", { href: `https://instagram.com/${e.instagram.replace("@", "")}`, target: "_blank", style: { fontSize: 11, color: "#de6c49", textDecoration: "none", fontWeight: 600 }, children: "📸 Instagram" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: { flex: 1, minWidth: 160 }, children: [
          /* @__PURE__ */ jsx("div", { style: { fontSize: 12, color: "#69322d", opacity: 0.7 }, children: e.email }),
          /* @__PURE__ */ jsx("div", { style: { fontSize: 12, color: "#69322d", opacity: 0.7 }, children: e.telephone }),
          e.tailleStand && /* @__PURE__ */ jsxs("div", { style: { fontSize: 11, color: "#69322d", opacity: 0.5, marginTop: 2 }, children: [
            "Stand : ",
            e.tailleStand
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }, children: [
          /* @__PURE__ */ jsx("span", { style: { padding: "3px 10px", borderRadius: 9999, fontSize: 12, fontWeight: 600, background: STATUS_COLORS[e.status], color: "#69322d" }, children: STATUS_LABELS[e.status] }),
          /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 6 }, children: [
            /* @__PURE__ */ jsx("button", { onClick: () => handleEdit(e), style: { padding: "4px 10px", borderRadius: 8, border: "1.5px solid #e8e5a8", background: "white", fontSize: 11, fontWeight: 600, cursor: "pointer" }, children: "✏️ Éditer" }),
            e.status !== "confirmed" && /* @__PURE__ */ jsx("button", { onClick: () => updateExposant(e.id, { status: "confirmed" }), style: { padding: "4px 10px", borderRadius: 8, border: "none", background: "#26422b", color: "white", fontSize: 11, fontWeight: 600, cursor: "pointer" }, children: "✅ Confirmer" }),
            /* @__PURE__ */ jsx("button", { onClick: () => deleteExposant(e.id), style: { padding: "4px 10px", borderRadius: 8, border: "none", background: "#fde8e8", color: "#c0392b", fontSize: 11, fontWeight: 600, cursor: "pointer" }, children: "🗑️" })
          ] }),
          /* @__PURE__ */ jsx("div", { style: { fontSize: 11, color: "#69322d", opacity: 0.4 }, children: new Date(e.createdAt).toLocaleDateString("fr-FR") })
        ] })
      ] }) }, e.id))
    ] })
  ] });
}
function ExposantForm({ form, onChange, onSave, onCancel }) {
  return /* @__PURE__ */ jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }, children: [
    /* @__PURE__ */ jsxs("div", { style: { gridColumn: "span 2" }, children: [
      /* @__PURE__ */ jsx("label", { style: { display: "block", fontSize: 11, fontWeight: 700, marginBottom: 4 }, children: "STRUCTURE" }),
      /* @__PURE__ */ jsx("input", { style: inputStyle, value: form.structure, onChange: (ev) => onChange({ ...form, structure: ev.target.value }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { style: { display: "block", fontSize: 11, fontWeight: 700, marginBottom: 4 }, children: "SITE WEB" }),
      /* @__PURE__ */ jsx("input", { style: inputStyle, value: form.lienWeb || "", onChange: (ev) => onChange({ ...form, lienWeb: ev.target.value }), placeholder: "https://..." })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { style: { display: "block", fontSize: 11, fontWeight: 700, marginBottom: 4 }, children: "INSTAGRAM" }),
      /* @__PURE__ */ jsx("input", { style: inputStyle, value: form.instagram || "", onChange: (ev) => onChange({ ...form, instagram: ev.target.value }), placeholder: "@compte" })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: { gridColumn: "span 2" }, children: [
      /* @__PURE__ */ jsx("label", { style: { display: "block", fontSize: 11, fontWeight: 700, marginBottom: 4 }, children: "IMAGE URL" }),
      /* @__PURE__ */ jsx("input", { style: inputStyle, value: form.imageUrl || "", onChange: (ev) => onChange({ ...form, imageUrl: ev.target.value }), placeholder: "https://..." })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: { gridColumn: "span 2" }, children: [
      /* @__PURE__ */ jsx("label", { style: { display: "block", fontSize: 11, fontWeight: 700, marginBottom: 4 }, children: "DESCRIPTION" }),
      /* @__PURE__ */ jsx("textarea", { style: { ...inputStyle, minHeight: 80 }, value: form.description, onChange: (ev) => onChange({ ...form, description: ev.target.value }) })
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

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const exposants = getExposants();
  const interestCount = getInterestCount();
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "Exposants", "activeTab": "exposants" }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<div style="background:var(--terre);border-radius:20px;padding:24px 32px;margin-bottom:24px;display:flex;align-items:center;gap:24px;color:#fff;position:relative;overflow:hidden"> <img src="/logos/tete-chien.svg" alt="" style="position:absolute;right:-2%;top:-20%;height:130%;opacity:.08;filter:brightness(0) invert(1);pointer-events:none"> <div style="font-size:72px;line-height:1;font-family:'Fredoka',sans-serif;font-weight:700;position:relative;z-index:1">${interestCount}</div> <div style="position:relative;z-index:1"> <div style="font-family:'Fredoka',sans-serif;font-size:22px;font-weight:700">personnes intéressées</div> <div style="font-family:'Poppins',sans-serif;font-size:13px;opacity:.75;margin-top:4px">Compteur mis à jour en temps réel via le bouton "Je participe" du site</div> </div> </div>  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:12px;margin-bottom:28px"> ${[
    { val: exposants.length, label: "Candidatures", color: "#de6c49" },
    { val: exposants.filter((e) => e.status === "confirmed").length, label: "Confirmés", color: "#26422b" },
    { val: exposants.filter((e) => e.status === "pending").length, label: "En attente", color: "#91acda" },
    { val: exposants.filter((e) => e.status === "rejected").length, label: "Refusés", color: "#8B7355" }
  ].map((s) => renderTemplate`<div style="background:white;border-radius:16px;padding:16px;border:1.5px solid #e8e5a8;text-align:center"> <div${addAttribute(`font-family:'Fredoka',sans-serif;font-size:32px;font-weight:700;color:${s.color}`, "style")}>${s.val}</div> <div style="font-family:'Poppins',sans-serif;font-size:11px;color:#69322d;opacity:.6;text-transform:uppercase;letter-spacing:.08em">${s.label}</div> </div>`)} </div>  <div style="display:flex;gap:10px;margin-bottom:20px"> <a href="/api/export?type=exposants" download="exposants.csv" style="display:inline-flex;align-items:center;gap:8px;background:#fff;border:1.5px solid #e8e5a8;border-radius:10px;padding:8px 16px;font-family:'Poppins',sans-serif;font-size:13px;font-weight:600;color:#69322d;text-decoration:none">
📥 Export CSV exposants
</a> </div> ${renderComponent($$result2, "ExposantsTable", ExposantsTable, { "initialData": exposants, "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/tristan/Dev/woofday/src/components/dashboard/ExposantsTable", "client:component-export": "ExposantsTable" })} ` })}`;
}, "/Users/tristan/Dev/woofday/src/pages/dashboard/index.astro", void 0);

const $$file = "/Users/tristan/Dev/woofday/src/pages/dashboard/index.astro";
const $$url = "/dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
