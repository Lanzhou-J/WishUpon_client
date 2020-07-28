export const API_ROOT = `${process.env.REACT_APP_BACKEND_URL}`;
export const API_WS_ROOT = `wss://${process.env.REACT_APP_BACKEND_URL}/cable`;
export const HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
};
