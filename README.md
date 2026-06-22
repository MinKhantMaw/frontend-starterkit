# Nexus CMS Admin

Enterprise CMS administration frontend for the Laravel API. Built with Vue 3, strict TypeScript, Vite, Pinia, Vue Router, Axios, TailwindCSS, and PrimeVue.

## Start

```bash
npm install
cp .env.example .env
npm run dev
```

The development server proxies `/api` to `http://localhost:8000`. Set `VITE_API_BASE_URL` when the API runs elsewhere.

```bash
npm run type-check
npm run lint
npm run build
```

## Architecture

```text
src/
├── assets/                      # Global styles and static assets
├── components/                  # Shared UI components only
├── constants/                   # Shared constants, when needed
├── layouts/                     # Shared application shells
├── libs/                        # HTTP, generic services, composables and utilities
├── modules/
│   ├── auth/
│   │   ├── login/
│   │   │   ├── Login.vue
│   │   │   └── useLogin.ts
│   │   ├── forgot-password/
│   │   ├── reset-password/
│   │   ├── route.ts
│   │   ├── service.ts
│   │   └── store.ts
│   ├── users/
│   │   ├── list/
│   │   │   ├── List.vue
│   │   │   └── useList.ts
│   │   ├── create/
│   │   ├── edit/
│   │   ├── detail/
│   │   ├── route.ts
│   │   ├── service.ts
│   │   └── store.ts
│   └── ...                      # Remaining business modules follow the same pattern
└── router/                      # Composes module routes and applies global guards
```

Business code belongs to the module that owns it. Each routed operation has a thin
Vue component and an adjacent dedicated composable such as `list/List.vue` and
`list/useList.ts`. Vue files contain templates, component imports, props/emits, and
composable bindings only. Composables own screen orchestration, module stores own
domain state, and module services are the only API boundary. Modules expose route
records to the central router. Cross-module code must be genuinely reusable before
it is promoted to `components`, `layouts`, `libs`, or `constants`.

## API behavior

`src/libs/http.ts` attaches bearer tokens, tracks global request state, normalizes API errors, redirects expired sessions, and uses `/api/v1/admin` by default. The generic `ResourceService` accepts both Laravel resource envelopes and plain JSON payloads. File forms use `multipart/form-data` and method spoofing for Laravel PUT endpoints.

Every protected route uses `requiresAuth`; feature routes additionally declare permission metadata. The same permission filter drives the sidebar. A `Super Admin` role bypasses granular permission checks.

## Main routes

- Authentication: `/login`, `/forgot-password`, `/reset-password`, `/profile`
- Content: `/pages`, `/posts`, `/categories`, `/tags`, `/media`, `/menus`
- Access: `/users`, `/roles`, `/permissions`
- Operations: `/contact-messages`, `/notifications`, `/activity-logs`, `/settings`
