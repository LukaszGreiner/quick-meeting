import jsonServer from "json-server";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router("db.json"); // Twoja baza danych

// Użyj domyślnych middleware json-server, w tym serwowania statycznych plików
// Skieruj serwowanie statyczne na katalog 'dist'
const middlewares = jsonServer.defaults({
  static: join(__dirname, "dist"),
  readOnly: false, // Umożliwia zapisy do db.json
});

// Najpierw obsłuż statyczne pliki (frontend)
server.use(middlewares);

// Następnie obsłuż API (json-server router)
server.use(router); // Bez prefixu /api

// Dodatkowe middleware (np. CORS, jeśli potrzebne poza domyślnymi)
server.use((req, res, next) => {
  // Twoje nagłówki CORS, jeśli domyślne z json-server nie wystarczą
  // np. res.header('Access-Control-Allow-Origin', '*');
  next();
});

// json-server z opcją static sam powinien obsłużyć serwowanie index.html dla nieznalezionych ścieżek,
// ale dla pewności można dodać fallback, chociaż może to kolidować z jego wewnętrzną logiką.
// Generalnie, przy użyciu `jsonServer.defaults({ static: 'path' })`,
// json-server powinien sam serwować index.html dla ścieżek niebędących API.

const port = 3000;
server.listen(port, () => {
  console.log(
    `JSON Server (frontend + API) działa na http://localhost:${port}`
  );
});
