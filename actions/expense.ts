'use server';

import { revalidatePath } from 'next/cache';
import { getAuthenticatedSession } from '@/lib/auth';
import { getDb } from '@/lib/db';
import { DEMO_TENANT_ID, demoExpenses } from '@/services/demoData';
import type { ExpenseCategory } from '@/types/channex';

type ExpenseInput = {
  description: string;
  amount: number;
  date: string;
  category: ExpenseCategory;
};

export async function createExpenseAction(input: ExpenseInput) {
  const session = await getAuthenticatedSession();

  if (!session) {
    throw new Error('Sessão inválida.');
  }

  try {
    const { Expense } = getDb();

    await Expense.create({
      tenantId: session.tenantId,
      description: input.description,
      amount: input.amount,
      date: input.date,
      category: input.category,
    });
  } catch (error) {
    if (!(error instanceof Error) || !error.message.includes('DATABASE_UNAVAILABLE') || session.tenantId !== DEMO_TENANT_ID) {
      throw error;
    }

    demoExpenses.unshift({
      id: `vmar_exp_${Date.now()}`,
      description: input.description,
      amount: input.amount,
      date: input.date,
      category: input.category,
    });
  }

  revalidatePath('/dashboard/finance');
}
