import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { submitWebsiteEnquiry } from "./brevo";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json({ limit: "16kb" }));

  app.post("/api/enquiry", async (req, res) => {
    const result = await submitWebsiteEnquiry(req.body);
    res.status(result.status).json(result.body);
  });

  // The local standalone server is intentionally built into server-dist while
  // Vite emits the deployable frontend directly into dist.
  const staticPath = path.resolve(__dirname, "..", "dist");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
