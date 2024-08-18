export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const AUTHROUTE = "/auth";
export const LOGIN_ROUTE = `${AUTHROUTE}/login`;
export const SIGNUP_ROUTE = `${AUTHROUTE}/signup`;
export const LOGOUT_ROUTE = `${AUTHROUTE}/logout`;
export const REFRESH_TOKEN_ROUTE = `${AUTHROUTE}/refresh-token`;

export const PROTECTED_ROUTE = "/protected";
export const ALERTS_ROUTE = `${PROTECTED_ROUTE}/alerts`;
export const DELETE_ALERT_ROUTE = `${PROTECTED_ROUTE}/delete-alert`;
export const TRANSACTIONS_ROUTE = `${PROTECTED_ROUTE}/transactions`;
export const CREATE_ALERT_ROUTE = `${PROTECTED_ROUTE}/create-alert`;
