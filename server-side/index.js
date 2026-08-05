const express = require('express');
const cors = require('cors')
require('dotenv').config()
const app = express()
app.use(cors());
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})


const { MongoClient, ServerApiVersion } = require('mongodb');
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

    app.get('/api/products', async (req, res) => {

      const searchQuery = req.query.searchQuery || '';
      const availability = req.query.availability === 'available' ? true : req.query.availability === 'unavailable' ? false : null;
      const brands = req.query.brands ? (Array.isArray(req.query.brands) ? req.query.brands : [req.query.brands]) : [];
      const displayTypes = req.query.displayTypes ? (Array.isArray(req.query.displayTypes) ? req.query.displayTypes : [req.query.displayTypes]) : [];
      const chipsets = req.query.chipsets ? (Array.isArray(req.query.chipsets) ? req.query.chipsets : [req.query.chipsets]) : [];
      const ram = req.query.ram ? (Array.isArray(req.query.ram) ? req.query.ram : [req.query.ram]) : [];
      const storage = req.query.storage ? (Array.isArray(req.query.storage) ? req.query.storage : [req.query.storage]) : [];
      const battery = req.query.battery ? (Array.isArray(req.query.battery) ? req.query.battery : [req.query.battery]) : [];

      const query = {};

      if (searchQuery) {
        query.$or = [
          { brand: { $regex: searchQuery, $options: 'i' } },
          { model: { $regex: searchQuery, $options: 'i' } },
          { chipset: { $regex: searchQuery, $options: 'i' } },
        ];
      }

      if (availability !== null) {
        query.availability = availability;
      } else {
        query.availability = { $in: [true, false] };
      }
      
      if (brands.length > 0) {
        query.brand = { $in: brands };
      }

      if (displayTypes.length > 0) {
        query.displayType = { $in: displayTypes };
      }

      if (chipsets.length > 0) {
        query.chipset = { $in: chipsets };
      }

      if (ram.length > 0) {
        query.ram = { $in: ram.map(Number) };
      }

      if (storage.length > 0) {
        query.internalStorage = { $in: storage.map(Number) };
      }

      if (battery.length > 0) {
        query.battery = { $in: battery.map(Number) };
      }

      try {
        const products = await productsCollection.find(query).toArray();
        res.json(products);
      } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
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
          brands : brands.sort(),
          displayTypes : displayTypes.sort(),
          chipsets : chipsets.sort(),
          ram : ram.sort((a, b) => a - b),
          storage : storage.sort((a, b) => a - b),
          battery : battery.sort((a, b) => a - b)
         });
      } catch (error) {
        console.error('Error fetching filters:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    })


  } finally {
    // await client.close();
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})