import jsonServer from "json-server";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults({
  static: join(__dirname, "dist"), // Serve static files from the dist directory
});

server.use(middlewares);

// Add CORS headers
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Add API routes
server.use("/api", router); // Optional: Move API to /api prefix for cleaner separation

// For any route not related to API, serve the React app
server.get("*", (req, res) => {
  // Skip if it's an API route
  if (
    req.url.startsWith("/users") ||
    req.url.startsWith("/meetings") ||
    req.url.startsWith("/api")
  ) {
    return router(req, res);
  }

  // Serve the React app's index.html
  const indexPath = join(__dirname, "dist", "index.html");
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res
      .status(404)
      .json({ error: "Frontend not built. Run 'npm run build' first." });
  }
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log("Server is running on port", port);
});
