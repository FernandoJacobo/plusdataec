export const API_URL = process.env.NEXT_PUBLIC_PROD_API_URL || process.env.NEXT_PUBLIC_TEST_API_URL;

export const API_BASE = `${API_URL}/api`;

export const API_BASE_WEB = `${API_URL}/api/web`;

export const API_BASE_AUTH = `${API_URL}/api/auth`;