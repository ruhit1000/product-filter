import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { getQuery } from './utils.js';

dotenv.config();

const app = express();
const port = 3000;


app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'POST', 'QUERY', 'OPTIONS'],
  exposedHeaders: ["Allow", "Accept-Query"],
  preflightContinue: true,
}));
app.use(express.json());

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: false,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");

    const database = client.db('product_filter');
    const productsCollection = database.collection('products');

    app.post('/api/products/search', (req, res) => {
      const query = getQuery(req);

      productsCollection.find(query).toArray()
        .then(products => res.json(products))
        .catch(error => {
          console.error('Error fetching products:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        });
    })

    app.options('/api/products', (req, res) => {
      res.setHeader('Allow', 'GET, QUERY, OPTIONS');
      res.setHeader('Accept-Query', 'application/json');
      res.sendStatus(204);
    });

    app.use('/api/products', async (req, res, next) => {
      if (req.method !== 'QUERY') {
        return next();
      }

      if (!req.is('application/json')) {
        return res.status(415).send('Unsupported Media Type. Please send JSON.');
      }

      try {
        const query = getQuery(req);
        const products = await productsCollection.find(query).toArray();
        return res.json(products);
      } catch (error) {
        console.error('Error fetching products:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    });

    app.get('/', (req, res) => {
      res.send('Hello World!');
    });

    app.get('/api/filters', async (req, res) => {
      try {
        const collection = productsCollection;

        const brands = await collection.distinct('brand');
        const displayTypes = await collection.distinct('displayType');
        const displaySizes = await collection.distinct('displaySize');
        const chipsets = await collection.distinct('chipset');
        const ram = await collection.distinct('ram');
        const storage = await collection.distinct('internalStorage');
        const battery = await collection.distinct('battery');

        res.json({
          brands: brands.sort(),
          displayTypes: displayTypes.sort(),
          chipsets: chipsets.sort(),
          ram: ram.sort((a, b) => a - b),
          storage: storage.sort((a, b) => a - b),
          battery: battery.sort((a, b) => a - b)
        });
      } catch (error) {
        console.error('Error fetching filters:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });


  } finally {
    // await client.close();
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});