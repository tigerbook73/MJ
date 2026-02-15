import createClient from "openapi-fetch";
import type { paths } from "@mj/shared";

/**
 * Type-safe REST API client using openapi-fetch
 * Automatically infers request/response types from OpenAPI spec
 */
export const apiClient = createClient<paths>({
  baseUrl: "/api",
  credentials: "include", // Include cookies for JWT auth
});

/**
 * Helper to unwrap API responses and throw errors
 */
export async function unwrapResponse<T>(
  promise: Promise<{ data?: T; error?: unknown; response: Response }>,
): Promise<T> {
  const result = await promise;

  if (result.error) {
    let errorMessage: string;
    if (typeof result.error === "object" && result.error !== null) {
      errorMessage = JSON.stringify(result.error);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-base-to-string
      errorMessage = String(result.error);
    }
    throw new Error(errorMessage || `API error: ${result.response.status}`);
  }

  if (!result.data) {
    throw new Error("No data returned from API");
  }

  return result.data;
}
