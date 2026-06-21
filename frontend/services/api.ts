import axios, { AxiosInstance, AxiosError } from "axios";
import { getBackendUrl } from "@/lib/utils";

// ============================================================
// Axios Instance
// ============================================================

let apiClient: AxiosInstance;

function createApiClient(): AxiosInstance {
  const baseURL = getBackendUrl();

  const instance = axios.create({
    baseURL,
    timeout: 60000,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  // Request interceptor
  instance.interceptors.request.use(
    (config) => {
      // Refresh base URL from settings on every request
      const currentBaseURL = getBackendUrl();
      config.baseURL = currentBaseURL;
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor
  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      const status = error.response?.status;
      const message =
        (error.response?.data as { detail?: string })?.detail ||
        error.message ||
        "An unexpected error occurred";

      if (status === 404) {
        return Promise.reject(new Error(`Not found: ${message}`));
      }
      if (status === 500) {
        return Promise.reject(new Error(`Server error: ${message}`));
      }
      if (error.code === "ECONNREFUSED" || error.code === "ERR_NETWORK") {
        return Promise.reject(
          new Error(
            "Cannot connect to backend. Is the server running at " +
              getBackendUrl() +
              "?"
          )
        );
      }
      return Promise.reject(new Error(message));
    }
  );

  return instance;
}

export function getApiClient(): AxiosInstance {
  if (!apiClient) {
    apiClient = createApiClient();
  }
  return apiClient;
}

// Reset client (used when backend URL changes)
export function resetApiClient(): void {
  apiClient = createApiClient();
}

export default getApiClient;
