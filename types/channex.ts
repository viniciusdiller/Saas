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

export type ChannexPropertyType =
  | 'apart_hotel'
  | 'apartment'
  | 'boat'
  | 'camping'
  | 'capsule_hotel'
  | 'chalet'
  | 'country_house'
  | 'farm_stay'
  | 'guest_house'
  | 'holiday_home'
  | 'holiday_park'
  | 'homestay'
  | 'hostel'
  | 'hotel'
  | 'inn'
  | 'lodge'
  | 'motel'
  | 'resort'
  | 'riad'
  | 'ryokan'
  | 'tent'
  | 'villa';

export type ChannexPropertySettings = {
  allow_availability_autoupdate_on_confirmation?: boolean;
  allow_availability_autoupdate_on_modification?: boolean;
  allow_availability_autoupdate_on_cancellation?: boolean;
  min_stay_type?: 'both' | 'arrival' | 'through';
  min_price?: string | number | null;
  max_price?: string | number | null;
  state_length?: number;
  cut_off_time?: string;
  cut_off_days?: number;
  max_day_advance?: number | null;
};

export type ChannexPropertyContent = {
  description?: string | null;
  important_information?: string | null;
  photos?: Array<{
    url: string;
    position?: number;
    author?: string;
    kind?: 'photo' | 'ad' | 'menu';
    description?: string;
  }>;
};

export type ChannexPropertyAttributes = {
  id?: string;
  title: string;
  is_active?: boolean;
  email?: string;
  phone?: string;
  currency: string;
  country?: string;
  state?: string;
  city?: string;
  address?: string;
  zip_code?: string;
  latitude?: string | null;
  longitude?: string | null;
  timezone?: string;
  property_type?: ChannexPropertyType;
  website?: string;
  logo_url?: string | null;
  settings?: ChannexPropertySettings;
  content?: ChannexPropertyContent;
};

export type ChannexProperty = {
  type: 'property';
  id: string;
  attributes: ChannexPropertyAttributes;
};

export type ChannexPropertyOption = {
  type: 'properties';
  id: string;
  attributes: {
    id: string;
    title: string;
    currency: string;
  };
};

export type ChannexCreatePropertyPayload = {
  property: ChannexPropertyAttributes & {
    group_id?: string;
    facilities?: string[];
  };
};

export type ChannexUpdatePropertyPayload = ChannexCreatePropertyPayload;

export type ChannexAccessRole = 'owner' | 'user';

export type ChannexLinkedUser = {
  id: string;
  type: 'user';
  email?: string;
  name?: string;
};

export type ChannexPropertyUser = {
  id: string;
  type: 'property_user';
  attributes: {
    id: string;
    overrides: Record<string, unknown> | null;
    property_id: string;
    role: ChannexAccessRole;
    user_id: string;
  };
  relationships?: {
    property?: { data: { id: string; type: 'property' } };
    user?: { data: ChannexLinkedUser };
  };
};

export type ChannexInvitePropertyUserPayload = {
  invite: {
    property_id: string;
    user_email: string;
    role: ChannexAccessRole;
    overrides?: Record<string, unknown>;
  };
};

export type ChannexUpdatePropertyUserPayload = {
  property_user: {
    role: ChannexAccessRole;
    overrides?: Record<string, unknown> | null;
  };
};

export type ChannexGroup = {
  id: string;
  type: 'group';
  attributes: {
    id: string;
    title: string;
  };
  relationships?: {
    properties?: {
      data: Array<{
        id: string;
        type: 'property';
        attributes?: {
          id: string;
          title: string;
        };
      }>;
    };
  };
};

export type ChannexCreateGroupPayload = {
  group: {
    title: string;
  };
};

export type ChannexUpdateGroupPayload = ChannexCreateGroupPayload;

export type ChannexGroupUser = {
  id: string;
  type: 'group_user';
  attributes: {
    id: string;
    overrides: Record<string, unknown> | null;
    group_id: string;
    role: ChannexAccessRole;
    user_id: string;
  };
  relationships?: {
    group?: { data: { id: string; type: 'group' } };
    user?: { data: ChannexLinkedUser };
  };
};

export type ChannexInviteGroupUserPayload = {
  invite: {
    group_id: string;
    user_email: string;
    role: ChannexAccessRole;
    overrides?: Record<string, unknown>;
  };
};

export type ChannexUpdateGroupUserPayload = {
  group_user: {
    role: ChannexAccessRole;
    overrides?: Record<string, unknown> | null;
  };
};

export type ChannexRoomTypeOption = {
  id: string;
  type: 'room_type';
  attributes: {
    id: string;
    property_id: string;
    title: string;
    default_occupancy: number;
  };
};

export type ChannexRoomTypeResource = {
  id: string;
  type: 'room_type';
  attributes: {
    id: string;
    title: string;
    property_id?: string;
    occ_adults: number;
    occ_children: number;
    occ_infants: number;
    default_occupancy: number;
    count_of_rooms: number;
    room_kind?: 'room' | 'dorm';
    capacity?: number | null;
    content?: ChannexPropertyContent;
  };
  relationships?: {
    property?: { data: { id: string; type: 'property' } };
  };
};

export type ChannexCreateRoomTypePayload = {
  room_type: {
    property_id: string;
    title: string;
    count_of_rooms: number;
    occ_adults: number;
    occ_children: number;
    occ_infants: number;
    default_occupancy: number;
    facilities?: string[];
    room_kind?: 'room' | 'dorm';
    capacity?: number | null;
    content?: ChannexPropertyContent;
  };
};

export type ChannexUpdateRoomTypePayload = {
  room_type: Partial<ChannexCreateRoomTypePayload['room_type']>;
};

export type ChannexRatePlanOption = {
  id: string;
  type: 'rate_plan';
  attributes: {
    id: string;
    title: string;
    property_id: string;
    room_type_id: string;
    sell_mode: 'per_room' | 'per_person';
    occupancy?: number;
    parent_rate_plan_id?: string | null;
    rate_category_id?: string | null;
  };
};

export type ChannexRatePlanResource = {
  id: string;
  type: 'rate_plan';
  attributes: {
    id: string;
    title: string;
    property_id?: string;
    room_type_id?: string;
    sell_mode: 'per_room' | 'per_person';
    rate_mode: 'manual' | 'derived' | 'auto' | 'cascade';
    currency?: string;
    children_fee?: string;
    infant_fee?: string;
    max_stay?: number[];
    min_stay_arrival?: number[];
    min_stay_through?: number[];
    closed_to_arrival?: boolean[];
    closed_to_departure?: boolean[];
    stop_sell?: boolean[];
    options: Array<{
      occupancy: number;
      is_primary: boolean;
      rate?: number;
      derived_option?: Record<string, unknown> | null;
    }>;
    [key: string]: unknown;
  };
};

export type ChannexCreateRatePlanPayload = {
  rate_plan: {
    title: string;
    property_id: string;
    room_type_id: string;
    tax_set_id?: string;
    parent_rate_plan_id?: string | null;
    children_fee?: string;
    infant_fee?: string;
    max_stay?: number[];
    min_stay_arrival?: number[];
    min_stay_through?: number[];
    closed_to_arrival?: boolean[];
    closed_to_departure?: boolean[];
    stop_sell?: boolean[];
    options: Array<{
      occupancy: number;
      is_primary: boolean;
      rate?: number;
      derived_option?: Record<string, unknown>;
    }>;
    currency?: string;
    sell_mode?: 'per_room' | 'per_person';
    rate_mode?: 'manual' | 'derived' | 'auto' | 'cascade';
    [key: string]: unknown;
  };
};

export type ChannexUpdateRatePlanPayload = {
  rate_plan: Partial<ChannexCreateRatePlanPayload['rate_plan']>;
};

export type ChannexRestrictionName =
  | 'availability'
  | 'rate'
  | 'min_stay_arrival'
  | 'min_stay_through'
  | 'min_stay'
  | 'closed_to_arrival'
  | 'closed_to_departure'
  | 'stop_sell'
  | 'max_stay'
  | 'availability_offset'
  | 'max_availability';

export type ChannexRestrictionObject = Record<string, Record<string, Record<string, string | number | boolean | null>>>;
export type ChannexAvailabilityObject = Record<string, Record<string, number>>;

export type ChannexAriValue = {
  property_id: string;
  rate_plan_id?: string;
  room_type_id?: string;
  date?: string;
  date_from?: string;
  date_to?: string;
  days?: Array<'mo' | 'tu' | 'we' | 'th' | 'fr' | 'sa' | 'su'>;
  rate?: string | number;
  rates?: Array<{ occupancy: number; rate: number }>;
  availability?: number;
  min_stay_arrival?: number;
  min_stay_through?: number;
  min_stay?: number;
  max_stay?: number;
  closed_to_arrival?: boolean | 0 | 1;
  closed_to_departure?: boolean | 0 | 1;
  stop_sell?: boolean | 0 | 1;
};

export type ChannexAriUpdatePayload = {
  values: ChannexAriValue[];
};

export type ChannexTaskResource = {
  id: string;
  type: 'task';
};

export type ChannexWebhookResource = {
  id: string;
  type: 'webhook';
  attributes: {
    callback_url: string;
    event_mask: string;
    request_params: Record<string, string> | null;
    headers: Record<string, string> | null;
    is_active: boolean;
    send_data: boolean;
  };
  relationships: {
    property: {
      data: {
        type: 'property';
        id: string;
      };
    };
  };
};

export type ChannexWebhookWritePayload = {
  webhook: {
    callback_url: string;
    event_mask: string;
    property_id: string;
    request_params?: Record<string, string> | null;
    headers?: Record<string, string> | null;
    is_active?: boolean;
    send_data?: boolean;
  };
};

export type ChannexWebhookTestResponse = {
  status_code: number;
  body: string;
};
