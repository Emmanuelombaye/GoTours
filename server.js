import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get('/api/villas', (req, res) => {
  fs.readFile(path.join(__dirname, 'data', 'villas.json'), 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading villas data');
      return;
    }
    res.send(JSON.parse(data));
  });
});

app.post('/api/villas', (req, res) => {
  fs.readFile(path.join(__dirname, 'data', 'villas.json'), 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading villas data');
      return;
    }
    const villas = JSON.parse(data);
    const newVilla = req.body;
    newVilla.id = villas.length > 0 ? Math.max(...villas.map(v => v.id)) + 1 : 1;
    villas.push(newVilla);
    fs.writeFile(path.join(__dirname, 'data', 'villas.json'), JSON.stringify(villas, null, 2), (err) => {
      if (err) {
        res.status(500).send('Error writing villas data');
        return;
      }
      res.status(201).send(newVilla);
    });
  });
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
