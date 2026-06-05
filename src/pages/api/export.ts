import type { APIRoute } from 'astro';
import { getExposants, getSponsors, getContacts } from '../../lib/data';
import { checkSession } from '../../lib/auth';

export const GET: APIRoute = ({ request, cookies }) => {
  if (!checkSession(cookies)) {
    return new Response('Unauthorized', { status: 401 });
  }

  const url = new URL(request.url);
  const type = url.searchParams.get('type') ?? 'exposants';

  let rows: Record<string, unknown>[] = [];
  let filename = 'export.csv';

  if (type === 'exposants') {
    rows = getExposants();
    filename = 'exposants.csv';
  } else if (type === 'sponsors') {
    rows = getSponsors();
    filename = 'sponsors.csv';
  } else if (type === 'contacts') {
    rows = getContacts();
    filename = 'contacts.csv';
  }

  if (rows.length === 0) {
    return new Response('Aucune donnée', {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }

  const headers = Object.keys(rows[0]);
  const csv = [
    headers.join(';'),
    ...rows.map(row =>
      headers.map(h => {
        const val = String(row[h] ?? '').replace(/"/g, '""');
        return `"${val}"`;
      }).join(';')
    ),
  ].join('\r\n');

  return new Response('﻿' + csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
};
