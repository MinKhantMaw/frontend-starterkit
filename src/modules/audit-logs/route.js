import { PERMISSIONS } from '@/constants/permissions';
export const auditLogRoutes = [
    { path: 'audit-logs', name: 'audit-logs.list', component: () => import('@/modules/audit-logs/pages/AuditLogListPage.vue'), meta: { title: 'Audit Logs', permission: PERMISSIONS.AUDIT_LOG_VIEW } },
];
