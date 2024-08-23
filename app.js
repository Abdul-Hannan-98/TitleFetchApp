import express from 'express';
import { fetchTitle as fetchTitlePlain } from './plainCallbacks.js';
import { fetchTitle as fetchTitlePromise } from './promises.js';
import { fetchTitle as fetchTitleAsync } from './asyncAwait.js';

const app = express();
const port = 3000;

const handleRequest = async (fetchTitleFunction, req, res) => {
  const addresses = req.query.address;
  if (!addresses) {
    return res.status(400).send('Address query parameter is required');
  }

  const addressArray = Array.isArray(addresses) ? addresses : [addresses];
  
  const titles = await Promise.all(addressArray.map(fetchTitleFunction));
  res.send(`<ul>${titles.map(title => `<li>${title}</li>`).join('')}</ul>`);
};

app.get('/plain/I/want/title', (req, res) => handleRequest(fetchTitlePlain, req, res));
app.get('/async/I/want/title', async (req, res) => handleRequest(fetchTitleAsync, req, res));
app.get('/promises/I/want/title', async (req, res) => handleRequest(fetchTitlePromise, req, res));

app.use((req, res) => res.status(404).send('Not Found'));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
