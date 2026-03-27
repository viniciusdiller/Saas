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

export const CREATE_PROPERTY_EXAMPLE = {
  property: {
    title: 'Demo Hotel',
    currency: 'BRL',
    email: 'hotel@channex.io',
    phone: '5581999999999',
    zip_code: '52000-000',
    country: 'BR',
    state: 'Pernambuco',
    city: 'Recife',
    address: 'Rua Demo, 100',
    timezone: 'America/Recife',
    property_type: 'hotel',
    facilities: [],
    settings: {
      allow_availability_autoupdate_on_confirmation: true,
      allow_availability_autoupdate_on_modification: false,
      allow_availability_autoupdate_on_cancellation: false,
      min_stay_type: 'both',
      state_length: 500,
      cut_off_time: '00:00:00',
      cut_off_days: 0,
    },
  },
};

export const INVITE_PROPERTY_USER_EXAMPLE = {
  invite: {
    property_id: '52397a6e-c330-44f4-a293-47042d3a3607',
    user_email: 'other_user@channex.io',
    role: 'user',
    overrides: {},
  },
};

export const CREATE_GROUP_EXAMPLE = {
  group: {
    title: 'South London Group',
  },
};

export const INVITE_GROUP_USER_EXAMPLE = {
  invite: {
    group_id: '52397a6e-c330-44f4-a293-47042d3a3607',
    user_email: 'other_user@channex.io',
    role: 'user',
    overrides: {},
  },
};

export const CREATE_ROOM_TYPE_EXAMPLE = {
  room_type: {
    property_id: '716305c4-561a-4561-a187-7f5b8aeb5920',
    title: 'Standard Room',
    count_of_rooms: 20,
    occ_adults: 3,
    occ_children: 0,
    occ_infants: 0,
    default_occupancy: 2,
    room_kind: 'room',
    facilities: [],
  },
};

export const CREATE_RATE_PLAN_EXAMPLE = {
  rate_plan: {
    title: 'Best Available Rate',
    property_id: '716305c4-561a-4561-a187-7f5b8aeb5920',
    room_type_id: '994d1375-dbbd-4072-8724-b2ab32ce781b',
    options: [
      {
        occupancy: 3,
        is_primary: true,
        rate: 0,
      },
    ],
    sell_mode: 'per_room',
    rate_mode: 'manual',
  },
};

export const GET_RESTRICTIONS_QUERY_EXAMPLE =
  '/restrictions?filter[property_id]=716305c4-561a-4561-a187-7f5b8aeb5920&filter[date][gte]=2026-03-01&filter[date][lte]=2026-03-10&filter[restrictions]=rate,min_stay_arrival';

export const UPDATE_RESTRICTIONS_EXAMPLE = {
  values: [
    {
      property_id: '716305c4-561a-4561-a187-7f5b8aeb5920',
      rate_plan_id: 'bab451e7-9ab1-4cc4-aa16-107bf7bbabb2',
      date_from: '2026-04-01',
      date_to: '2026-04-30',
      days: ['fr', 'sa', 'su'],
      rate: 35000,
      min_stay_through: 2,
      closed_to_arrival: false,
      closed_to_departure: false,
    },
  ],
};

export const UPDATE_AVAILABILITY_EXAMPLE = {
  values: [
    {
      property_id: '716305c4-561a-4561-a187-7f5b8aeb5920',
      room_type_id: '994d1375-dbbd-4072-8724-b2ab32ce781b',
      date_from: '2026-04-01',
      date_to: '2026-04-30',
      availability: 5,
    },
  ],
};

export const CREATE_WEBHOOK_EXAMPLE = {
  webhook: {
    callback_url: 'https://pousada.exemplo.com/hooks/channex',
    event_mask: 'booking',
    property_id: '716305c4-561a-4561-a187-7f5b8aeb5920',
    headers: {
      'x-signature': 'secret-demo',
    },
    is_active: true,
    send_data: true,
  },
};
