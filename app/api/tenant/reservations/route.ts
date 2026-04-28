import { NextResponse } from "next/server";
import { getAuthenticatedSession } from "@/lib/auth";
import {
  getTenantReservations,
  updateReservation,
} from "@/services/tenantService";
import type { Reservation } from "@/types/channex";

export async function PATCH(request: Request) {
  const session = await getAuthenticatedSession();

  if (!session) {
    return NextResponse.json({ message: "Não autenticado." }, { status: 401 });
  }

  const body = (await request.json()) as { reservation?: Reservation };

  if (!body.reservation) {
    return NextResponse.json({ message: "Reserva inválida." }, { status: 400 });
  }

  try {
    const reservation = await updateReservation(
      session.tenantId,
      body.reservation,
    );
    return NextResponse.json({ reservation });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Falha ao atualizar reserva.",
      },
      { status: 400 },
    );
  }
}

export async function GET(request: Request) {
  try {
    // Por enquanto forçamos o ID 1 (Pousada Viva Mar).
    // Quando o login for ativado, pegaremos o ID do usuário logado.
    const tenantId = 1;

    const reservations = await getTenantReservations(tenantId);

    return NextResponse.json(reservations, { status: 200 });
  } catch (error: any) {
    console.error("Erro ao buscar reservas do SaaS:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
