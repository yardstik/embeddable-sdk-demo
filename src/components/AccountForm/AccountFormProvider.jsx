import React, { createContext, useContext, useMemo, useState } from "react";

const AccountContext = createContext(null);

export function useAccountForm() {
  return useContext(AccountContext);
}

export function AccountFormProvider({ children }) {
  const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

  const [jwt, setJwt] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [reportId, setReportId] = useState("");
  const [accountId, setAccountId] = useState("");
  const [accountEmail, setAccountEmail] = useState("");
  const [tokenExpired, setTokenExpired] = useState(false);
  const [appUrl, setAppUrl] = useState("https://app.yardstik-staging.com");

  const allFieldsFilled = useMemo(
    () => reportId && accountId && accountEmail && appUrl,
    [appUrl, reportId, accountId, accountEmail]
  );

  const fetchJWTToken = async (accountEmail, apiKey) => {
    try {
      const response = await fetch(`${BACKEND_URL}/token`, {
        headers: new Headers({
          "content-type": "application/json",
          accept: "application/json",
        }),
        method: "POST",
        body: JSON.stringify({
          user_email: accountEmail,
          api_key: apiKey,
        }),
      });

      const responseJson = await response.json();
      setJwt(responseJson.token);
    } catch (error) {
      console.error("Error fetching JWT token", error);
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    setAppUrl(formData.get("appUrl"));
    setApiKey(formData.get("apiKey"));
    setReportId(formData.get("reportId"));
    setAccountId(formData.get("accountId"));
    setAccountEmail(formData.get("accountEmail"));

    await fetchJWTToken(formData.get("accountEmail"), formData.get("apiKey"));
  }

  const value = {
    jwt,
    apiKey,
    reportId,
    accountId,
    accountEmail,
    appUrl,
    tokenExpired,
    handleSubmit,
    setTokenExpired,
    allFieldsFilled,
    fetchJWTToken,
  };

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
}
