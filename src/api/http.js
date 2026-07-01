import axios from 'axios';
import router from '@/router';
import { tokenStorage } from '@/api/tokenStorage';
import { useAppStore } from '@/stores/app';
import { handleApiError } from '@/utils/errorHandler';
import { notifyError } from '@/utils/notify';
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api/v1',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});
api.interceptors.request.use((config) => {
    useAppStore().startLoading();
    const token = tokenStorage.get();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
api.interceptors.response.use((response) => {
    useAppStore().stopLoading();
    return response;
}, (error) => {
    useAppStore().stopLoading();
    const status = error.response?.status;
    if (status === 401) {
        tokenStorage.clear();
        window.dispatchEvent(new CustomEvent('auth:unauthorized'));
        if (router.currentRoute.value.name !== 'login') {
            router.push({ name: 'login', query: { redirect: router.currentRoute.value.fullPath } });
        }
    }
    else if (status === 403) {
        const message = error.response?.data?.message || 'You do not have permission to perform this action.';
        notifyError(message, 'Forbidden');
        if (!['login', 'two-factor-challenge'].includes(router.currentRoute.value.name)) {
            router.push({ name: 'forbidden' });
        }
    }
    else if (status === 429) {
        notifyError('Too many login attempts. Please wait a minute and try again.', 'Rate limit exceeded');
    }
    else {
        handleApiError(error, router);
    }
    return Promise.reject(error);
});
export default api;
