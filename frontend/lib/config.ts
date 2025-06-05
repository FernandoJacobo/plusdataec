export const URL_BASE = process.env.NEXT_PUBLIC_DEV_MODE === 'true' ? process.env.NEXT_PUBLIC_TEST_API_URL : process.env.NEXT_PUBLIC_PROD_API_URL;

export const API_BASE = `${URL_BASE}/api`;

export const API_BASE_WEB = `${URL_BASE}/api/web`;

export const API_BASE_AUTH = `${URL_BASE}/api/auth`;