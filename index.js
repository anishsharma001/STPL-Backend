import dotenv from "dotenv";

// Load correct env FIRST before anything
const ENV = process.env.NODE_ENV || "staging";
dotenv.config({ path: `.env.${ENV}` });

import app from "./app.js";

const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT} (${ENV})`);
});
