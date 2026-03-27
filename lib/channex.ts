import type { ChannexError, ChannexResponse } from '@/types/channex';

const DEFAULT_BASE_URL = 'https://staging.channex.io/api/v1';

type QueryInput = Record<string, string | number | undefined | null>;

function createQuery(params?: QueryInput) {
  if (!params) return '';

  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      search.append(key, String(value));
    }
  });

  const query = search.toString();
  return query ? `?${query}` : '';
}

export function getChannexBaseUrl() {
  return process.env.CHANNEX_BASE_URL ?? DEFAULT_BASE_URL;
}

export function isChannexConfigured() {
  return Boolean(process.env.CHANNEX_API_KEY);
}

function parseError(payload: ChannexResponse<unknown> | null, statusText: string) {
  const err = payload?.errors as ChannexError | undefined;
  if (!err) {
    return statusText;
  }

  if (err.title) {
    return err.title;
  }

  return statusText;
}

export async function channexRequest<T>(
  path: string,
  options: RequestInit = {},
  params?: QueryInput,
): Promise<ChannexResponse<T>> {
  if (!isChannexConfigured()) {
    throw new Error('CHANNEX_API_KEY não configurada.');
  }

  const url = `${getChannexBaseUrl()}${path}${createQuery(params)}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'user-api-key': process.env.CHANNEX_API_KEY as string,
      ...(options.headers ?? {}),
    },
    cache: 'no-store',
  });

  const payload = (await response.json().catch(() => null)) as ChannexResponse<T> | null;

  if (!response.ok) {
    const message = parseError(payload, response.statusText);
    throw new Error(`Channex ${response.status}: ${message}`);
  }

  if (!payload) {
    throw new Error('Resposta inválida da API Channex.');
  }

  return payload;
}

export type PaginationOptions = {
  page?: number;
  limit?: number;
};

export type BookingFilters = {
  propertyId?: string;
  dateGte?: string;
};

export function toPaginationQuery(pagination?: PaginationOptions) {
  return {
    'pagination[page]': pagination?.page,
    'pagination[limit]': pagination?.limit,
  };
}

export function toBookingFilterQuery(filters?: BookingFilters) {
  return {
    'filter[property_id]': filters?.propertyId,
    'filter[date][gte]': filters?.dateGte,
  };
}
