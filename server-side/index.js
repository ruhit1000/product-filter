const express = require('express');
require('dotenv').config()
const app = express()
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
      try {
        const products = await productsCollection.find({}).toArray();
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
          displaySizes : displaySizes.sort((a, b) => a - b),
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