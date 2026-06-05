import { getExposants, getSponsors, getContacts } from './data_DnS_ebgs.mjs';
import { c as checkSession } from './auth_BNvM6Niv.mjs';

const GET = ({ request, cookies }) => {
  if (!checkSession(cookies)) {
    return new Response("Unauthorized", { status: 401 });
  }
  const url = new URL(request.url);
  const type = url.searchParams.get("type") ?? "exposants";
  let rows = [];
  let filename = "export.csv";
  if (type === "exposants") {
    rows = getExposants();
    filename = "exposants.csv";
  } else if (type === "sponsors") {
    rows = getSponsors();
    filename = "sponsors.csv";
  } else if (type === "contacts") {
    rows = getContacts();
    filename = "contacts.csv";
  }
  if (rows.length === 0) {
    return new Response("Aucune donnée", {
      headers: { "Content-Type": "text/plain; charset=utf-8" }
    });
  }
  const headers = Object.keys(rows[0]);
  const csv = [
    headers.join(";"),
    ...rows.map(
      (row) => headers.map((h) => {
        const val = String(row[h] ?? "").replace(/"/g, '""');
        return `"${val}"`;
      }).join(";")
    )
  ].join("\r\n");
  return new Response("\uFEFF" + csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
