export const baseFetch = <T>(
  url: string,
  method: "GET" | "POST" | "DELETE" | "PATCH",
  body: unknown = null,
  security: boolean = false,
  formData: boolean = false
): Promise<T> => {
  const defaultHeaders = {
    "content-type": "application/json",
  };

  const tokenHeaders = {
    ...defaultHeaders,
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const formDataHeader = {};

  const headers = security ? tokenHeaders : defaultHeaders;

  const finalyBody = formData
    ? (body as FormData)
    : body
    ? JSON.stringify(body)
    : null;

  return fetch(`${import.meta.env.VITE_URL}/${url}`, {
    method: method,
    headers: formData ? formDataHeader : headers,
    body: finalyBody,
  }).then((response) => response.json() as Promise<T>);
};
