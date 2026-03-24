import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getDb } from "@/lib/db";

export async function GET() {
  try {
    const { sequelize, Tenant, User, Room } = getDb();

    // 1. Sincroniza o banco de dados (Cria todas as tabelas baseadas nos seus models)
    await sequelize.sync({ alter: true });

    // 2. Cria o Tenant de demonstração se não existir
    const [tenant] = await Tenant.findOrCreate({
      where: { name: "Pousada Sancho" },
      defaults: {
        plan: "premium",
        status: "active",
      },
    });

    // 3. Cria o Usuário administrador se não existir
    const demoEmail = "admin@pousadasancho.com";
    const existingUser = await User.findOne({ where: { email: demoEmail } });

    if (!existingUser) {
      const passwordHash = await bcrypt.hash("sancho123", 10);
      await User.create({
        email: demoEmail,
        passwordHash,
        role: "admin",
        tenantId: tenant.id,
      });
    }

    // 4. Cria um quarto de teste para o calendário não ficar vazio
    await Room.findOrCreate({
      where: { localRoomId: "room_1", tenantId: tenant.id },
      defaults: {
        channexRoomTypeId: "chx_room_1",
        name: "Suíte Master",
        maxGuests: 2,
        status: "active",
      },
    });

    return NextResponse.json({
      ok: true,
      message: "Tabelas criadas e dados de demonstração inseridos com sucesso!",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        ok: false,
        message: "Erro ao configurar o banco de dados.",
        error: String(error),
      },
      { status: 500 },
    );
  }
}
