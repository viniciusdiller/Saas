# Pousada Viva Mar - SaaS de Demonstração

## Estrutura sugerida

```text
app/
  api/auth/
    login/route.ts
    logout/route.ts
  dashboard/
    calendar/page.tsx
    layout.tsx
  globals.css
  layout.tsx
  page.tsx
components/
  calendar-skeleton.tsx
  login-form.tsx
  toast-provider.tsx
  unified-calendar.tsx
lib/
  auth.ts
  utils.ts
models/
  Reservation.ts
  Room.ts
  User.ts
  index.ts
services/
  tenantService.ts
  demoData.ts
types/
  channex.ts
middleware.ts
```

## Observações arquiteturais

- A UI lê quartos e reservas via `services/tenantService.ts`, com fallback para dados mock de demonstração em `services/demoData.ts`.
- Os modelos Sequelize estão prontos para MySQL hospedado e preparados para futura integração com Channex.io.
- A autenticação atual é de demonstração, baseada em cookie HttpOnly, para viabilizar o fluxo do MVP.
