// api.js
import apiClient from './apiClient.js';

export async function addMemo(text) {
    return apiClient.post('/api/memos', {content: text});
}

export async function loadMemos() {
    return apiClient.get('/api/memos');
}

export async function deleteMemo(id) {
    return apiClient.delete(`/api/memos/${id}`);
}