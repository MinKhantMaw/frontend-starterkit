# CMS Admin Dashboard

Vue 3 admin dashboard frontend for a Laravel CMS API.

## Stack

- Vue 3 + Vite + TypeScript
- Pinia
- Vue Router
- Axios
- Tailwind CSS
- Element Plus

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

Default API URL:

```env
VITE_API_BASE_URL=http://localhost:8000/api/v1/admin
```

Build for production:

```bash
npm run build
```

## Folder Structure

```text
src/
  api/            Axios instance and REST services
  assets/         Global Tailwind CSS
  components/     Layout, form, and reusable UI components
  router/         Route definitions and navigation guards
  stores/         Pinia stores for auth, dashboard, users, roles, permissions, contents
  types/          Shared TypeScript types
  utils/          Token, permission, and slug helpers
  views/          Feature pages
```

## API Integration

The Axios instance in `src/api/http.ts` reads `VITE_API_BASE_URL`, appends the `Authorization: Bearer <token>` header, handles 401 responses, clears expired sessions, redirects to `/login`, and shows global error toasts.

Expected auth endpoints:

- `POST /login`
- `POST /logout`
- `GET /profile`

Expected resource endpoint groups:

- `/dashboard`
- `/users`
- `/roles`
- `/permissions`
- `/contents`

Laravel responses can be plain objects or `{ data: ... }` for detail endpoints. List endpoints should return `{ data: [], meta: { current_page, last_page, per_page, total } }` for pagination.

## Permissions

Routes and sidebar items support permission checks through authenticated user permissions stored in Pinia.

Example permission names:

- `user.view`, `user.create`, `user.update`, `user.delete`
- `role.view`, `role.create`, `role.update`, `role.delete`
- `content.view`, `content.create`, `content.update`, `content.delete`, `content.publish`

## Main Routes

- `/login`
- `/dashboard`
- `/users`, `/users/create`, `/users/:id`, `/users/:id/edit`
- `/roles`, `/roles/create`, `/roles/:id`, `/roles/:id/edit`
- `/permissions`
- `/contents`, `/contents/create`, `/contents/:id`, `/contents/:id/edit`
- `/profile`
- `/settings`
