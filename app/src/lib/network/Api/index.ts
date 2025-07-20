import type { Seller } from "./endpoints/seller";

const URL = "https://excess-drucie-juane-ccb80f8d.koyeb.app/";

interface Request {
  endpoint: Seller;
  method: "POST" | "GET" | "PUT" | "DELETE";
  body?: any;
}

export async function doFectch({ endpoint, method, body }: Request) {
  const response = await fetch(`${URL}${endpoint}`, {
    method,
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json",
    },
  });
  return await response.json();
}
