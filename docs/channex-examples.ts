import type { ChannexBookingPayload } from '@/types/channex';

export const CREATE_BOOKING_EXAMPLE: ChannexBookingPayload = {
  booking: {
    property_id: '716305c4-561a-4561-a187-7f5b8aeb5920',
    arrival_date: '2026-03-30',
    departure_date: '2026-04-04',
    status: 'new',
    currency: 'BRL',
    amount: '2870.00',
    notes: 'Reserva manual - Saas-Sancho',
    customer: {
      name: 'Paulo',
      surname: 'Menezes',
      email: 'paulo@cliente.com',
      phone: '+5585955554455',
    },
    rooms: [
      {
        checkin_date: '2026-03-30',
        checkout_date: '2026-04-04',
        room_type_id: 'vm-rt-01',
        rate_plan_id: 'vm-rateplan-std-01',
        amount: '2870.00',
        occupancy: { adults: 2, children: 0, infants: 0 },
      },
    ],
  },
};

export const UPDATE_ROOM_TYPE_EXAMPLE = {
  room_type: {
    name: 'Bangalô Oceano Premium',
    max_occupancy: {
      adults: 2,
      children: 1,
    },
    status: 'active',
  },
};
