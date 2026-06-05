import type { APIRoute } from 'astro';
import { getInterestCount, incrementInterest } from '../../lib/data';

export const GET: APIRoute = () => {
  return new Response(JSON.stringify({ count: getInterestCount() }), {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const POST: APIRoute = () => {
  const count = incrementInterest();
  return new Response(JSON.stringify({ count }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
