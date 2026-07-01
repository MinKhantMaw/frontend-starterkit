import { PERMISSIONS } from '@/constants/permissions';
export const notificationRoutes = [
    { path: 'notifications', name: 'notifications.list', component: () => import('@/modules/notifications/pages/NotificationListPage.vue'), meta: { title: 'Notifications', permission: PERMISSIONS.NOTIFICATION_VIEW } },
];
