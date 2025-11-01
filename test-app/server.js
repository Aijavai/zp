import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Serve static files from the client directory
app.use('/client', express.static(path.join(__dirname, 'client')));

// Hello endpoint
app.get('/hello', (req, res) => {
  res.json({ message: "Hello from Cursor!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

