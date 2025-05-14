// meetingApi.js
// Logika CRUD dla rezerwacji spotkań (Meeting)
// src/API/meetingApi.js
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const API_URL = `${BASE_URL}/meetings`;

export async function getMeetings(params = {}) {
  // params: { date, participant, status, sortBy, order }
  const url = new URL(API_URL);
  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.append(key, value);
  });
  const res = await fetch(url);
  if (!res.ok) throw new Error("Błąd pobierania rezerwacji");
  return res.json();
}

export async function getMeeting(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Błąd pobierania rezerwacji");
  return res.json();
}

export async function createMeeting(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Błąd tworzenia rezerwacji");
  return res.json();
}

export async function updateMeeting(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Błąd edycji rezerwacji");
  return res.json();
}

export async function deleteMeeting(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Błąd usuwania rezerwacji");
  return true;
}
