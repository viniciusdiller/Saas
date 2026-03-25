# Channel Manager MVP - Pousada Viva Mar

## Estrutura sugerida

```text
app/
  api/auth/
    login/route.ts
    logout/route.ts
  api/tenant/
    inventory/route.ts
    reservations/route.ts
    expenses/route.ts
  api/webhooks/
    provision/route.ts
  dashboard/
    calendar/page.tsx
    finance/page.tsx
    layout.tsx
  globals.css
  layout.tsx
  page.tsx
components/
  dashboard-sidebar.tsx
  expense-modal-form.tsx
  login-form.tsx
  toast-provider.tsx
  unified-calendar.tsx
actions/
  expense.ts
  reservation.ts
lib/
  auth.ts
  db.ts
  utils.ts
models/
  Tenant.ts
  User.ts
  Room.ts
  Reservation.ts
  Expense.ts
  index.ts
services/
  demoData.ts
  tenantService.ts
types/
  channex.ts
middleware.ts
```

## Observações arquiteturais

- O sistema funciona em modo persistente (Sequelize/MySQL) e também em modo demo com fallback de mocks.
- Toda consulta de domínio é tenant-scoped para evitar vazamento de dados entre pousadas.
- O fluxo de autenticação usa cookie HttpOnly (`sancho_session`) com payload de tenant/plano para gate de funcionalidades.
