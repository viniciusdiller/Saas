// app/api/setup/route.ts
import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  try {
    const db = getDb();

    // 1. Sincroniza o banco: Cria todas as tabelas (Tenants, Rooms, Reservations, etc)
    await db.sequelize.sync({ alter: true });

    // 2. Cria a Pousada Viva Mar (Tenant ID 1) se ela não existir
    const [tenant] = await db.Tenant.findOrCreate({
      where: { id: 1 },
      defaults: {
        name: "Pousada Viva Mar",
        plan: "pro",
        status: "active",
      },
    });

    // 3. Cria um quarto genérico para vincular as reservas de teste
    const [room] = await db.Room.findOrCreate({
      // Aqui usamos o ID que a Landing Page estava mandando no nosso teste
      where: { localRoomId: "vm-bangalow-01" },
      defaults: {
        localRoomId: "vm-bangalow-01",
        tenantId: tenant.id,
        name: "Bangalô Vista Mar",
        maxGuests: 4,
        status: "active",
        channexRoomTypeId: "mock-channex-id",
      },
    });

    return NextResponse.json({
      message: "Banco configurado com sucesso! Tabelas criadas.",
      tenant,
      room,
    });
  } catch (error: any) {
    console.error("Erro no Setup do DB:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
