import type { AuthProvider } from "@refinedev/core";
import { payloadPromise } from "@utils/payloadPromise";
import { headers } from "next/headers";

export const authProviderServer: Pick<AuthProvider, "check"> = {
  check: async () => {
    const [payload, userHeaders] = await Promise.all([payloadPromise, headers()]);
    const auth = await payload.auth({ headers: userHeaders });

    if (auth.user) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      logout: true,
      redirectTo: "/login",
    };
  },
};
