// Import the Redis client
import Redis from 'redis';

// Connect to Redis
const client = Redis.createClient({
  host: '127.0.0.1',
  port: 6379,
});

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err}`);
});

// Subscribe to the channel
client.subscribe('holberton school channel');

// Listen for messages
client.on('message', (channel, message) => {
  console.log(message.toString());
  
  // Check if the message is KILL_SERVER
  if (message === 'KILL_SERVER') {
    client.unsubscribe(channel); // Unsubscribe from the channel
    client.quit(); // Quit the Redis client
  }
});

