export const config = { runtime: 'edge' };

export default function handler(req: Request) {
  const city = decodeURIComponent(req.headers.get('x-vercel-ip-city') || '');
  const region = req.headers.get('x-vercel-ip-country-region') || '';
  const country = req.headers.get('x-vercel-ip-country') || '';

  return new Response(
    JSON.stringify({ city, region, country }),
    {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
    },
  );
}
