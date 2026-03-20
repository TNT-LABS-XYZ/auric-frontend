"use client";

import { Auth0Provider } from "@auth0/auth0-react";

export default function Auth0ProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Auth0Provider
      domain="dev-bvi655h85sxmwolm.us.auth0.com"
      clientId="Se8hzDowggxHvtqCt391h3g5ZZYBuOV4"
      authorizationParams={{
        redirect_uri:
          typeof window !== "undefined" ? window.location.origin : "",
        audience: "https://dev-bvi655h85sxmwolm.us.auth0.com/api/v2/",
      }}
    >
      {children}
    </Auth0Provider>
  );
}
