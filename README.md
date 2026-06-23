# Enterprise Vue 3 Admin Starter Kit

Reusable frontend foundation for ERP, CRM, estate management, inventory management, HR management, accounting systems, and other internal business applications.

This is not a CMS. It intentionally excludes settings, posts, pages, categories, tags, media library, and notifications modules.

## Tech Stack

- Vue 3
- JavaScript
- Vite
- Pinia
- Vue Router
- Axios
- TailwindCSS
- PrimeVue

## Architecture

```text
src/
├── assets/
├── components/
├── constants/
├── layouts/
├── libs/
├── menu/
└── modules/
```

Included modules:

```text
modules/
├── auth/
├── dashboard/
├── users/
├── roles/
├── permissions/
├── profile/
└── activityLogs/
```

Feature modules keep the same structure:

```text
modules/users/
├── create/
│   ├── Create.vue
│   └── useCreate.js
├── edit/
│   ├── Edit.vue
│   └── useEdit.js
├── detail/
│   ├── Detail.vue
│   └── useDetail.js
├── list/
│   ├── List.vue
│   └── useList.js
├── route.js
├── service.js
└── store.js
```

## Rules

- Vue files stay focused on UI.
- Business logic lives in `useList.js`, `useCreate.js`, `useEdit.js`, and `useDetail.js`.
- API calls live in `service.js`.
- Pinia state lives in `store.js`.
- Route records live in `route.js`.
- Shared components live in `src/components`.
- Shared utilities live in `src/libs`.
- Shared layouts live in `src/layouts`.

## Included Foundation

- Authentication: login, forgot password, reset password, logout
- Authorization: permission-based menus, routes, and buttons
- Layouts: `AuthLayout`, `AdminLayout`
- Dashboard: total users, total roles, total permissions
- Users CRUD
- Roles CRUD
- Permissions list
- Profile management
- Activity logs list
- Axios instance
- Route guards
- Permission guards
- Global error handler
- Toast notifications
- Loading overlay

## Reusable Components

- `BaseTable`
- `BaseForm`
- `BaseModal`
- `BaseDrawer`
- `BasePagination`
- `BaseFilter`
- `BaseConfirmDialog`
- `PermissionGuard`
- `PermissionButton`

## Development

```bash
npm install
npm run dev
```

Services use local mock data by default. Set `VITE_USE_MOCKS=false` to call backend API endpoints.
