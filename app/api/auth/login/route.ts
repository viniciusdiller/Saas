import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { createSessionToken, authConfig } from '@/lib/auth';
import { getDb } from '@/lib/db';
import { DEMO_CREDENTIALS, DEMO_TENANT_ID } from '@/services/demoData';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string; password?: string };

    if (!body.email || !body.password) {
      return NextResponse.json({ message: 'Informe e-mail e senha.' }, { status: 400 });
    }

    let dbError: unknown;
    let user: any = null;
    let tenant: any;

    try {
      const { User, Tenant } = getDb();

      user = await User.findOne({
        where: { email: body.email },
        include: [{ model: Tenant, as: 'tenant' }],
      });

      tenant = user?.get('tenant');
    } catch (error) {
      dbError = error;
    }

    if (!user && dbError instanceof Error && dbError.message.includes('DATABASE_UNAVAILABLE')) {
      if (body.email !== DEMO_CREDENTIALS.email || body.password !== DEMO_CREDENTIALS.password) {
        return NextResponse.json({ message: 'Credenciais inválidas.' }, { status: 401 });
      }

      const token = await createSessionToken({
        userId: 1,
        tenantId: DEMO_TENANT_ID,
        plan: 'premium',
        tenantName: 'Pousada Viva Mar',
      });

      const response = NextResponse.json({ ok: true, mode: 'demo' });
      response.cookies.set(authConfig.cookieName, token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: authConfig.tokenTtlSeconds,
      });
      return response;
    }

    if (!user) {
      return NextResponse.json({ message: 'Credenciais inválidas.' }, { status: 401 });
    }

    if (!tenant || tenant.status !== 'active') {
      return NextResponse.json({ message: 'Conta inativa ou inexistente.' }, { status: 403 });
    }

    const isValid = await bcrypt.compare(body.password, user.passwordHash);

    if (!isValid) {
      return NextResponse.json({ message: 'Credenciais inválidas.' }, { status: 401 });
    }

    const token = await createSessionToken({
      userId: user.id,
      tenantId: tenant.id,
      plan: tenant.plan,
      tenantName: tenant.name,
    });

    const response = NextResponse.json({ ok: true });
    response.cookies.set(authConfig.cookieName, token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: authConfig.tokenTtlSeconds,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: 'Falha ao autenticar.', detail: error instanceof Error ? error.message : 'Erro desconhecido' },
      { status: 500 },
    );
  }
}
