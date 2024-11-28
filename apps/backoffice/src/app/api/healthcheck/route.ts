export async function GET(request: Request) {
  return new Response(JSON.stringify({ message: 'ok' }), { status: 200 });
}
