import { PERMISSIONS } from '@/constants/permissions';
export const dashboardRoutes = [
    { path: 'dashboard', name: 'dashboard', component: () => import('@/modules/dashboard/overview/Overview.vue'), meta: { title: 'Dashboard', permission: PERMISSIONS.DASHBOARD_VIEW } },
];
