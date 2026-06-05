import type { APIRoute } from 'astro';
import { getInterestCount, incrementInterest } from '../../lib/data';

export const GET: APIRoute = async () => {
  const count = await getInterestCount();
  return new Response(JSON.stringify({ count }), {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const POST: APIRoute = async () => {
  const count = await incrementInterest();
  return new Response(JSON.stringify({ count }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
