const DEV_API_PREFIX = "/api"; // Używane tylko w trybie deweloperskim przez proxy Vite
const IS_DEV = import.meta.env.DEV;

function getApiBasePath() {
  // W trybie deweloperskim (npm run dev) używamy /api, które obsłuży proxy Vite.
  // W trybie produkcyjnym (npm start z uproszczonym server.js) nie używamy prefixu,
  // ponieważ json-server będzie serwował API bezpośrednio (np. /meetings).
  return IS_DEV ? DEV_API_PREFIX : "";
}

export async function getMeetings(params = {}) {
  const basePath = getApiBasePath();
  const url = new URL(`${basePath}/meetings`, window.location.origin);
  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.append(key, value);
  });
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Błąd pobierania rezerwacji (getMeetings)");
  return res.json();
}

export async function getMeeting(id) {
  const basePath = getApiBasePath(); // POPRAWKA
  const url = new URL(`${basePath}/meetings/${id}`, window.location.origin);
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Błąd pobierania rezerwacji ${id} (getMeeting)`);
  return res.json();
}

export async function createMeeting(data) {
  const basePath = getApiBasePath(); // POPRAWKA
  const url = new URL(`${basePath}/meetings`, window.location.origin);
  const res = await fetch(url.toString(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Błąd tworzenia rezerwacji (createMeeting)");
  return res.json();
}

export async function updateMeeting(id, data) {
  const basePath = getApiBasePath(); // POPRAWKA
  const url = new URL(`${basePath}/meetings/${id}`, window.location.origin);
  const res = await fetch(url.toString(), {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Błąd edycji rezerwacji ${id} (updateMeeting)`);
  return res.json();
}

export async function deleteMeeting(id) {
  const basePath = getApiBasePath(); // POPRAWKA
  const url = new URL(`${basePath}/meetings/${id}`, window.location.origin);
  const res = await fetch(url.toString(), {
    method: "DELETE",
  });
  if (!res.ok)
    throw new Error(`Błąd usuwania rezerwacji ${id} (deleteMeeting)`);
  return true;
}
