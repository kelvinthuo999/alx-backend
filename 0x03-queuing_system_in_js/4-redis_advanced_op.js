// Import the Redis client
import Redis from 'redis';

// Function to connect to Redis and log the connection status
function connectToRedis(callback) {
  const client = Redis.createClient({
    host: '127.0.0.1',
    port: 6379,
  });

  client.on('connect', () => {
    console.log('Redis client connected to the server');
    callback(null, client);
  });

  client.on('error', (err) => {
    console.error('Redis client not connected to the server:', err);
    callback(err);
  });
}

// Function to create a hash in Redis
function createHash(client, hashKey, hashValues, callback) {
  // Iterate over each key-value pair in the hashValues object
  for (let key in hashValues) {
    // Use hset for each key-value pair
    client.hset(hashKey, key, hashValues[key], (err, reply) => {
      if (err) {
        console.error('Failed to create hash:', err);
        callback(err);
      } else {
        console.log('Hash field added successfully:', reply);
        // Continue to next key-value pair
      }
    });
  }
}

// Function to display the hash value in Redis
function displayHash(client, hashKey, callback) {
  client.hgetall(hashKey, (err, reply) => {
    if (err) {
      console.error('Failed to get hash value:', err);
      callback(err);
    } else {
      console.log('Hash value:', reply);
      callback(null, reply);
    }
  });
}

// Main execution block
connectToRedis((err, client) => {
  if (err) {
    console.error('Error connecting to Redis:', err);
    return;
  }

  // Define hash values
  const hashValues = {
    Portland: '50',
    Seattle: '80',
    'New York': '20',
    Bogota: '20',
    Cali: '40',
    Paris: '2',
  };

  // Create hash
  createHash(client, 'HolbertonSchools', hashValues, (err, reply) => {
    if (err) {
      console.error('Error creating hash:', err);
      return;
    }

    // Display hash
    displayHash(client, 'HolbertonSchools', (err, reply) => {
      if (err) {
        console.error('Error displaying hash:', err);
        return;
      }

      console.log(reply);

      // Close the Redis client
      client.quit();
    });
  });
});

