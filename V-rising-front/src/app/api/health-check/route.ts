export function GET() {
  return new Response(JSON.stringify({ status: "healthy" }), { status: 200 });
}
