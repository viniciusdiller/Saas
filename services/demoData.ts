import type { Expense, Reservation, Room } from '@/types/channex';

export const DEMO_TENANT_ID = 999;
export const DEMO_CREDENTIALS = {
  email: 'admin@vivamar.com.br',
  password: 'vivamar123',
};

export const demoRooms: Room[] = [
  { id: 'vmar-suite-01', channexRoomTypeId: 'vmar_chx_001', name: 'Suíte Vista Mar', maxGuests: 3, status: 'active' },
  { id: 'vmar-bangalo-02', channexRoomTypeId: 'vmar_chx_002', name: 'Bangalô Jardim Tropical', maxGuests: 4, status: 'active' },
  { id: 'vmar-standard-03', channexRoomTypeId: 'vmar_chx_003', name: 'Quarto Standard', maxGuests: 2, status: 'active' },
];

export let demoReservations: Reservation[] = [
  {
    id: 'vmar_res_001',
    roomId: 'vmar-suite-01',
    checkIn: '2026-03-26T14:00:00.000Z',
    checkOut: '2026-03-29T12:00:00.000Z',
    status: 'confirmed',
    otaSource: 'booking',
    channelReference: 'VM-BK-12031',
    amount: 1850,
    currency: 'BRL',
    customer: { name: 'Mariana Lima', email: 'mariana.lima@email.com', phone: '+55 21 98888-1001' },
    notes: 'Chegada às 15:00. Solicita travesseiro extra.',
  },
  {
    id: 'vmar_res_002',
    roomId: 'vmar-bangalo-02',
    checkIn: '2026-03-27T14:00:00.000Z',
    checkOut: '2026-03-30T12:00:00.000Z',
    status: 'pending',
    otaSource: 'expedia',
    channelReference: 'VM-EX-92044',
    amount: 2140,
    currency: 'BRL',
    customer: { name: 'Felipe Costa', email: 'felipe.costa@email.com', phone: '+55 31 97777-2002' },
    notes: 'Aguardando confirmação de pagamento.',
  },
  {
    id: 'vmar_res_003',
    roomId: 'vmar-standard-03',
    checkIn: '2026-03-28T13:00:00.000Z',
    checkOut: '2026-03-28T18:00:00.000Z',
    status: 'blocked',
    otaSource: 'manual',
    channelReference: 'VM-BLOCK-33',
    amount: 0,
    currency: 'BRL',
    customer: { name: 'Bloqueio Operacional', email: 'ops@vivamar.com.br', phone: '+55 81 3000-0001' },
    notes: 'Limpeza profunda e vistoria de enxoval.',
  },
];

export let demoExpenses: Expense[] = [
  { id: 'vmar_exp_001', description: 'Material de limpeza', amount: 420, date: '2026-03-22', category: 'limpeza' },
  { id: 'vmar_exp_002', description: 'Conserto do ar-condicionado', amount: 980, date: '2026-03-21', category: 'manutenção' },
  { id: 'vmar_exp_003', description: 'Comissão Booking', amount: 360, date: '2026-03-20', category: 'comissões' },
];
