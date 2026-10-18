const API_BASE_URL =
"https://openapi.programming-hero.com/api/bazardor";

async function fetchAPI(endpoint: string) {
const response = await fetch(`${API_BASE_URL}${endpoint}`, {
next: { revalidate: 3600 },
});

if (!response.ok) {
throw new Error(
`API request failed: ${response.status} ${response.statusText}`,
);
}

return response.json();
}

export async function getProducts() {
const response = await fetchAPI("/products");

console.log(
"Products API response:",
JSON.stringify(response, null, 2),
);

return response;
}

export async function getProduct(id: string) {
return fetchAPI(`/products/${encodeURIComponent(id)}`);
}

export async function getCategories() {
return fetchAPI("/categories");
}
