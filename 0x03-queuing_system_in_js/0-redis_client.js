// Import the Redis client
import Redis from 'redis';

// Function to connect to Redis and log the connection status
async function connectToRedis() {
  try {
    // Attempt to connect to the Redis server
    const client = Redis.createClient({
      host: '127.0.0.1',
      port: 6379,
    });

    // Listen for connection events
    client.on('connect', () => {
      console.log('Redis client connected to the server');
    });

    // Listen for error events
    client.on('error', (err) => {
      console.log(`Redis client not connected to the server: ${err.message}`);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

// Call the function to connect to Redis
connectToRedis();

