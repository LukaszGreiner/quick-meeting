import jsonServer from "json-server";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router("db.json");

const middlewares = jsonServer.defaults({
  static: join(__dirname, "dist"),
  readOnly: false,
});

// Najpierw obsłuż statyczne pliki (frontend)
server.use(middlewares);

// Następnie obsłuż API (json-server router)
server.use(router);

server.use((req, res, next) => {
  next();
});

const port = 3000;
server.listen(port, () => {
  console.log(
    `JSON Server (frontend + API) działa na http://localhost:${port}`
  );
});
