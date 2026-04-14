// app/api/public/viva-mar/route.ts
import { NextResponse } from "next/server";
import { getRooms } from "@/services/tenantService";
import { getDb } from "@/lib/db";

// Pode remover o OPTIONS manual daqui já que colocamos no next.config.ts

export async function GET() {
  const VIVA_MAR_TENANT_ID = 1;
  try {
    const rooms = await getRooms(VIVA_MAR_TENANT_ID);
    return NextResponse.json(rooms);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar quartos" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const { Reservation, Room } = getDb(); // Puxando os modelos do banco

  // Headers de CORS que fizemos antes
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  try {
    // 1. Precisamos achar o quarto no banco usando a string (ex: 'vm-bangalow-01')
    // para pegar o ID numérico real dele no MySQL
    const room = await Room.findOne({
      where: { localRoomId: body.roomId, tenantId: 1 },
    });

    if (!room) {
      return NextResponse.json(
        { error: "Quarto não encontrado no Banco de Dados." },
        { status: 404, headers: corsHeaders },
      );
    }

    // 2. Gravar no MySQL de verdade!
    const novaReserva = await Reservation.create({
      tenantId: 1,
      roomId: room.id, // Usando o ID relacional (numérico)
      channexReservationId: `local-test-${Date.now()}`,
      otaSource: "manual",
      guestName: body.guestName || "Hóspede Local",
      guestEmail: "teste@vivamar.com",
      guestPhone: "22999999999",
      checkIn: body.checkIn,
      checkOut: body.checkOut,
      status: "confirmed",
      channelReference: "website-direto",
      amount: body.amount,
      currency: "BRL",
      notes: "Reserva gerada via Landing Page testando o MySQL",
    });

    console.log("SUCESSO: Reserva salva no MySQL com ID:", novaReserva.id);
    return NextResponse.json(novaReserva, {
      status: 201,
      headers: corsHeaders,
    });
  } catch (error) {
    console.error("Erro ao salvar no MySQL:", error);
    return NextResponse.json(
      { error: "Erro interno ao criar reserva" },
      { status: 500, headers: corsHeaders },
    );
  }
}
