import { c as createComponent } from './astro-component_C3RRFcv-.mjs';
import 'piccolore';
import { I as renderTemplate, u as maybeRenderHead } from './sequence_By5MsV8w.mjs';
import { r as renderComponent } from './entrypoint_BTCT42F7.mjs';
import { $ as $$DashboardLayout } from './DashboardLayout_CHIhPeU5.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { getActivities } from './data_DnS_ebgs.mjs';

function ActivitiesTable({ initialData }) {
  const [data, setData] = useState(initialData.sort((a, b) => a.order - b.order));
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [isAdding, setIsAdding] = useState(false);
  async function saveActivity(activity) {
    const isNew = !activity.id;
    const method = isNew ? "POST" : "PATCH";
    const url = isNew ? "/api/activity" : "/api/activity/" + activity.id;
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(activity)
    });
    const result = await res.json();
    if (isNew) {
      setData((prev) => [...prev, result].sort((a, b) => a.order - b.order));
    } else {
      setData((prev) => prev.map((a) => a.id === activity.id ? { ...a, ...activity } : a).sort((a, b) => a.order - b.order));
    }
  }
  async function deleteActivity(id) {
    if (!confirm("Supprimer cette activité ?")) return;
    setData((prev) => prev.filter((a) => a.id !== id));
    await fetch("/api/activity/" + id, { method: "DELETE" });
  }
  const handleEdit = (a) => {
    setEditingId(a.id);
    setEditForm(a);
  };
  const handleAdd = () => {
    setIsAdding(true);
    setEditForm({ emoji: "🐾", nom: "", description: "", pole: "", horaires: "", order: data.length });
  };
  const handleSave = async () => {
    await saveActivity(editForm);
    setEditingId(null);
    setIsAdding(false);
  };
  return /* @__PURE__ */ jsxs("div", { style: { fontFamily: "'Poppins', sans-serif" }, children: [
    /* @__PURE__ */ jsx("button", { onClick: handleAdd, style: { marginBottom: 20, padding: "10px 20px", borderRadius: 12, border: "none", background: "#de6c49", color: "white", fontWeight: 700, cursor: "pointer", fontFamily: "'Fredoka', sans-serif", fontSize: 16 }, children: "+ Ajouter une activité" }),
    /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 12 }, children: [
      isAdding && /* @__PURE__ */ jsx("div", { style: { background: "#f3f1c7", borderRadius: 16, padding: "20px", border: "2px dashed #de6c49" }, children: /* @__PURE__ */ jsx(ActivityForm, { form: editForm, onChange: setEditForm, onSave: handleSave, onCancel: () => setIsAdding(false) }) }),
      data.map((a) => /* @__PURE__ */ jsx("div", { style: { background: "white", borderRadius: 16, padding: "16px 20px", border: "1.5px solid #e8e5a8" }, children: editingId === a.id ? /* @__PURE__ */ jsx(ActivityForm, { form: editForm, onChange: setEditForm, onSave: handleSave, onCancel: () => setEditingId(null) }) : /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 16, alignItems: "center" }, children: [
        /* @__PURE__ */ jsx("div", { style: { fontSize: 32 }, children: a.emoji }),
        /* @__PURE__ */ jsxs("div", { style: { flex: 1 }, children: [
          /* @__PURE__ */ jsx("div", { style: { fontFamily: "'Fredoka', sans-serif", fontWeight: 700, fontSize: 18, color: "#69322d" }, children: a.nom }),
          /* @__PURE__ */ jsxs("div", { style: { fontSize: 13, color: "#de6c49", fontWeight: 600 }, children: [
            a.horaires,
            " · ",
            a.pole
          ] }),
          /* @__PURE__ */ jsx("div", { style: { fontSize: 13, opacity: 0.7, marginTop: 4 }, children: a.description })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 8 }, children: [
          /* @__PURE__ */ jsx("button", { onClick: () => handleEdit(a), style: btnStyle, children: "✏️" }),
          /* @__PURE__ */ jsx("button", { onClick: () => deleteActivity(a.id), style: { ...btnStyle, background: "#fde8e8", color: "#c0392b" }, children: "🗑️" })
        ] })
      ] }) }, a.id))
    ] })
  ] });
}
function ActivityForm({ form, onChange, onSave, onCancel }) {
  return /* @__PURE__ */ jsxs("div", { style: { display: "grid", gridTemplateColumns: "80px 1fr 1fr", gap: 12 }, children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { style: labelStyle, children: "EMOJI" }),
      /* @__PURE__ */ jsx("input", { style: inputStyle, value: form.emoji, onChange: (e) => onChange({ ...form, emoji: e.target.value }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { style: labelStyle, children: "NOM" }),
      /* @__PURE__ */ jsx("input", { style: inputStyle, value: form.nom, onChange: (e) => onChange({ ...form, nom: e.target.value }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { style: labelStyle, children: "PÔLE / ZONE" }),
      /* @__PURE__ */ jsx("input", { style: inputStyle, value: form.pole, onChange: (e) => onChange({ ...form, pole: e.target.value }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { style: labelStyle, children: "HORAIRES" }),
      /* @__PURE__ */ jsx("input", { style: inputStyle, value: form.horaires, onChange: (e) => onChange({ ...form, horaires: e.target.value }), placeholder: "ex: 14:00 - 15:00" })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { style: labelStyle, children: "ORDRE" }),
      /* @__PURE__ */ jsx("input", { type: "number", style: inputStyle, value: form.order, onChange: (e) => onChange({ ...form, order: parseInt(e.target.value) }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: { gridColumn: "span 3" }, children: [
      /* @__PURE__ */ jsx("label", { style: labelStyle, children: "DESCRIPTION" }),
      /* @__PURE__ */ jsx("textarea", { style: { ...inputStyle, minHeight: 60 }, value: form.description, onChange: (e) => onChange({ ...form, description: e.target.value }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: { gridColumn: "span 3", display: "flex", gap: 8, justifyContent: "flex-end" }, children: [
      /* @__PURE__ */ jsx("button", { onClick: onCancel, style: { padding: "8px 16px", borderRadius: 8, border: "1.5px solid #e8e5a8", background: "white", cursor: "pointer", fontWeight: 600 }, children: "Annuler" }),
      /* @__PURE__ */ jsx("button", { onClick: onSave, style: { padding: "8px 16px", borderRadius: 8, border: "none", background: "#26422b", color: "white", cursor: "pointer", fontWeight: 600 }, children: "Enregistrer" })
    ] })
  ] });
}
const labelStyle = { display: "block", fontSize: 11, fontWeight: 700, marginBottom: 4, color: "#69322d" };
const inputStyle = { width: "100%", border: "1.5px solid #e8e5a8", borderRadius: 10, padding: "8px 12px", fontSize: 14, fontFamily: "'Poppins', sans-serif", color: "#69322d", outline: "none", boxSizing: "border-box" };
const btnStyle = { padding: "8px", borderRadius: 10, border: "1.5px solid #e8e5a8", background: "white", cursor: "pointer", fontSize: 14 };

const $$Activities = createComponent(($$result, $$props, $$slots) => {
  const activities = getActivities();
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "Activités & Programme", "activeTab": "activities" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div style="background:white;border-radius:20px;padding:24px;border:1.5px solid #e8e5a8;margin-bottom:24px"> <div style="display:flex;justify-content:space-between;align-items:center"> <div> <h2 style="font-family:'Fredoka',sans-serif;margin:0;font-size:20px">Gérer le programme</h2> <p style="font-size:13px;opacity:.6;margin:4px 0 0">Ajoutez les démonstrations, ateliers et animations prévues.</p> </div> </div> </div> ${renderComponent($$result2, "ActivitiesTable", ActivitiesTable, { "initialData": activities, "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/tristan/Dev/woofday/src/components/dashboard/ActivitiesTable", "client:component-export": "ActivitiesTable" })} ` })}`;
}, "/Users/tristan/Dev/woofday/src/pages/dashboard/activities.astro", void 0);

const $$file = "/Users/tristan/Dev/woofday/src/pages/dashboard/activities.astro";
const $$url = "/dashboard/activities";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Activities,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
