const express = require('express');
const bodyParser = require('body-parser');
const redis = require('redis');
const { promisify } = require('util');
const app = express();
app.use(bodyParser.json());

// Redis client configuration
const redisClient = redis.createClient({
  host: 'localhost', // Use your Redis server address
  port: 6379 // Use your Redis server port
});

// Promisify Redis commands
const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);

// List of products
const listProducts = [
  { id: 1, name: 'Suitcase 250', price: 50, stock: 4 },
  { id: 2, name: 'Suitcase 450', price: 100, stock: 10 },
  { id: 3, name: 'Suitcase 650', price: 350, stock: 2 },
  { id: 4, name: 'Suitcase 1050', price: 550, stock: 5 }
];

// Route to list all products
app.get('/list_products', (req, res) => {
  res.json(listProducts.map(product => ({
   ...product,
    initialAvailableQuantity: product.stock
  })));
});

// Route to get product details by ID
app.get('/list_products/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId);
  const product = listProducts.find(p => p.id === itemId);
  if (!product) {
    return res.json({ status: 'Product not found' });
  }

  const currentQuantity = await getAsync(`item.${itemId}`);
  res.json({...product, currentQuantity: parseInt(currentQuantity || 0) });
});

// Reserve a product
app.get('/reserve_product/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId);
  const product = listProducts.find(p => p.id === itemId);
  if (!product) {
    return res.json({ status: 'Product not found' });
  }

  if (product.stock <= 0) {
    return res.json({ status: 'Not enough stock available', itemId });
  }

  // Deduct stock and update Redis
  product.stock--;
  await setAsync(`item.${itemId}`, product.stock.toString());
  res.json({ status: 'Reservation confirmed', itemId });
});

const PORT = 1245;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

