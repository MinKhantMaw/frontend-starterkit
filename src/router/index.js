import { createRouter, createWebHistory } from 'vue-router';
import { authRoutes } from '@/modules/auth/route';
import { dashboardRoutes } from '@/modules/dashboard/route';
import { userRoutes } from '@/modules/users/route';
import { roleRoutes } from '@/modules/roles/route';
import { permissionRoutes } from '@/modules/permissions/route';
import { profileRoutes } from '@/modules/profile/route';
import { auditLogRoutes } from '@/modules/audit-logs/route';
import { activityLogRoutes } from '@/modules/activity-logs/route';
import { notificationRoutes } from '@/modules/notifications/route';
import { securitySettingsRoutes } from '@/modules/security-settings/route';
import { errorRoutes, errorChildRoutes } from '@/modules/errors/route';
import { applyRouteGuards } from '@/router/guards';
const adminRoutes = [
    { path: '', redirect: '/dashboard' },
    ...dashboardRoutes,
    ...userRoutes,
    ...roleRoutes,
    ...permissionRoutes,
    ...profileRoutes,
    ...auditLogRoutes,
    ...activityLogRoutes,
    ...notificationRoutes,
    ...securitySettingsRoutes,
    ...errorChildRoutes,
];
const routes = [
    ...authRoutes,
    {
        path: '/',
        component: () => import('@/layouts/AdminLayout.vue'),
        meta: { requiresAuth: true },
        children: adminRoutes,
    },
    ...errorRoutes,
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
applyRouteGuards(router);
export default router;
