export type OtaSource = 'booking' | 'expedia' | 'hotels_com' | 'manual';

export type Room = {
  id: string;
  channexRoomTypeId: string;
  name: string;
  maxGuests: number;
  status: 'active' | 'maintenance';
};

export type ReservationStatus = 'confirmed' | 'pending' | 'cancelled' | 'blocked';

export type Customer = {
  name: string;
  email: string;
  phone: string;
};

export type Reservation = {
  id: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  status: ReservationStatus;
  otaSource: OtaSource;
  channelReference: string;
  amount: number;
  currency: string;
  customer: Customer;
  notes: string;
};

export type ExpenseCategory = 'limpeza' | 'manutenção' | 'impostos' | 'insumos' | 'comissões' | 'outros';

export type Expense = {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: ExpenseCategory;
};

export type ChannexError = {
  code: string;
  title: string;
  details?: Record<string, string[]>;
};

export type ChannexMeta = {
  message?: string;
  limit?: number;
  page?: number;
  total?: number;
};

export type ChannexResponse<T> = {
  data: T | T[];
  meta?: ChannexMeta;
  errors?: ChannexError;
};

export type ChannexCreateRequest<T> = {
  [type: string]: T;
};

export type ChannexRoomType = {
  id: string;
  type: 'room_type';
  attributes: {
    title?: string;
    name?: string;
    status?: 'active' | 'inactive' | string;
    max_occupancy?: {
      adults?: number;
      children?: number;
      infants?: number;
    };
  };
};

export type ChannexBooking = {
  id: string;
  type: 'booking';
  attributes: {
    property_id?: string;
    arrival_date?: string;
    departure_date?: string;
    status?: 'new' | 'modified' | 'cancelled' | string;
    currency?: string;
    amount?: string | number;
    notes?: string;
    ota_source?: OtaSource;
    channel_reference?: string;
    reference?: string;
    customer?: {
      name?: string;
      surname?: string;
      email?: string;
      phone?: string;
    };
    rooms?: Array<{
      checkin_date?: string;
      checkout_date?: string;
      room_type_id?: string;
      rate_plan_id?: string;
      amount?: string;
      occupancy?: {
        adults?: number;
        children?: number;
        infants?: number;
      };
    }>;
  };
};

export interface ChannexBookingPayload {
  booking: {
    property_id: string;
    arrival_date: string;
    departure_date: string;
    status: 'new' | 'modified' | 'cancelled';
    currency: string;
    amount: string;
    notes?: string;
    customer: {
      name: string;
      surname?: string;
      email: string;
      phone?: string;
    };
    rooms: Array<{
      checkin_date: string;
      checkout_date: string;
      room_type_id: string;
      rate_plan_id: string;
      amount: string;
      occupancy: { adults: number; children: number; infants: number };
    }>;
  };
}
