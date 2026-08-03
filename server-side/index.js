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
    strict: true,
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


  } finally {
    // await client.close();
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})