import { GameError } from "@/lib/truco/engine";
import { createRoom } from "@/lib/rooms";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: { name?: string; roomName?: string } = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }
  const name = (body.name ?? "").trim().slice(0, 24);
  if (!name) {
    return Response.json({ ok: false, error: "Informe o seu nome." }, { status: 400 });
  }
  try {
    const result = await createRoom(body.roomName ?? "", name);
    return Response.json({ ok: true, ...result });
  } catch (err) {
    const message = err instanceof GameError ? err.message : "Erro ao criar a sala.";
    return Response.json({ ok: false, error: message }, { status: 400 });
  }
}
