// Import the Redis client and util module
import Redis from 'redis';
import { promisify } from 'util';

// Convert Redis client methods to promise-based versions
const client = Redis.createClient({
  host: '127.0.0.1',
  port: 6379,
});

const getAsync = promisify(client.get).bind(client);

// Function to connect to Redis and log the connection status
async function connectToRedis() {
  try {
    await new Promise((resolve, reject) => {
      client.on('connect', resolve);
      client.on('error', reject);
    });
    console.log('Redis client connected to the server');
  } catch (err) {
    console.error('Redis client not connected to the server:', err);
  }
}

// Modified displaySchoolValue function using async/await
async function displaySchoolValue(schoolName) {
  try {
    const value = await getAsync(schoolName);
    console.log('School value:', value);
  } catch (err) {
    console.error('Failed to get school value:', err);
  }
}

// Main execution block
(async () => {
  await connectToRedis();

  // Display initial school value
  displaySchoolValue('Holberton').then(() => {
    // Set new school value
    client.set('HolbertonSanFrancisco', '100', (err, reply) => {
      if (err) {
        console.error('Error setting new school value:', err);
        return;
      }
      console.log('School set successfully:', reply);
      // Display updated school value
      displaySchoolValue('HolbertonSanFrancisco').catch(console.error);
    });
  }).catch(console.error);
})();

