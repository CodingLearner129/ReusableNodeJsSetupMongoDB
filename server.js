import app from "./app.js";
import { config } from './src/v1/config/config.js'

// get data from .env file
const port = config.port || "3000";
const host = config.host || "localhost";

// start server
const server = app.listen(port, host, () => {
  console.log(`Listening on http://${host}:${port}`);
});
