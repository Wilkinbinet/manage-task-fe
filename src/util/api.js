const API_BASE_URL = 'http://localhost:8080/api';

export const LOGIN_URL = `${API_BASE_URL}/auth/login`;
export const REGISTER_URL = `${API_BASE_URL}/users/register`;
export const TASKS_URL = `${API_BASE_URL}/tasks`;
export const COMPLETE_TASK_URL = (taskId) => `${API_BASE_URL}/tasks/${taskId}/complete`;
export const DELETE_TASK_URL = (taskId) => `${API_BASE_URL}/tasks/${taskId}`;

export default API_BASE_URL;