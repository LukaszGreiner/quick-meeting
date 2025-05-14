import jsonServer from "json-server";
import { create, router, defaults } from "json-server";

const server = create();
const router = router("db.json"); // adjust path if needed
const middlewares = defaults();

server.use(middlewares);
server.use(router);

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log("JSON Server is running on port", port);
});
