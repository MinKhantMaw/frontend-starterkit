# Enterprise Vue 3 Admin Starter Kit

A reusable frontend foundation for internal business applications such as ERP, CRM, inventory management, HR systems, and admin portals.

> This starter kit is not a CMS. It intentionally avoids CMS-specific modules such as pages, posts, tags, media library, and content settings.

## Features

- Vue 3 + Vite application shell
- Pinia state management
- Vue Router with permission-aware route guards
- PrimeVue UI components and Aura theme
- Element Plus used for supplemental UI elements
- TailwindCSS for utility styling
- Axios-powered API layer
- Permission-based menu, button, and route authorization
- Authentication flows with login, forgot password, and reset password
- User management, role management, and permission administration
- Profile management and activity log browsing
- Global error handling, toast notifications, confirmation dialogs, and loading overlay

## Project Structure

```text
src/
├── api/                  # HTTP client and API helpers
├── components/           # Shared UI components
│   ├── base/
│   └── common/
├── constants/            # App constants and enums
├── layouts/              # Layouts for authenticated and auth pages
├── menu/                 # Sidebar/menu definitions
├── modules/              # Feature modules with routes, store, and services
├── router/               # Router setup and guards
├── services/             # Shared service helpers
├── stores/               # Global state stores
├── utils/                # Utility helpers
└── views/                # Top-level view pages
```

### Core modules

- `modules/auth`
- `modules/dashboard`
- `modules/users`
- `modules/roles`
- `modules/permissions`
- `modules/profile`
- `modules/activity-logs`
- `modules/audit-logs`
- `modules/notifications`
- `modules/security-settings`
- `modules/errors`

## Key Conventions

- UI is implemented in `.vue` components.
- page-level logic and workflows live in composables like `useList.js`, `useCreate.js`, `useEdit.js`, and `useDetail.js`.
- backend API calls are centralized in `service.js` files.
- Pinia stores are defined in `store.js` files.
- route definitions live in `route.js` files.
- shared components live under `src/components`.
- shared utilities live under `src/utils` and `src/services`.

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Linting & Formatting

Run ESLint:

```bash
npm run lint
```

Format files with Prettier:

```bash
npm run format
```

## Environment

This project uses Vite environment variables. By default, the app can run with mock or backend API data depending on your configuration.

- `VITE_USE_MOCKS=false` — disable local mocks and use real backend endpoints when available.

## App Bootstrap

The application is initialized in `src/main.js` and includes:

- `createApp(App)`
- Pinia
- Vue Router
- PrimeVue + Aura theme
- PrimeVue toast and confirmation services
- Element Plus UI plugin
- global error handler registration

## Notes

- The UI is built with PrimeVue and TailwindCSS.
- The starter kit is designed for admin and internal business apps, not public-facing CMS content.
- Route guards and permission checks are defined in `src/router/guards.js`.
