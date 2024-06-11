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

// Function to set a new school name and value in Redis
function setNewSchool(client, schoolName, value, callback) {
  client.set(schoolName, value, (err, reply) => {
    if (err) {
      console.error('Failed to set school:', err);
      callback(err);
    } else {
      console.log('School set successfully:', reply);
      callback(null, reply);
    }
  });
}

// Function to display the value of a school name in Redis
function displaySchoolValue(client, schoolName, callback) {
  client.get(schoolName, (err, reply) => {
    if (err) {
      console.error('Failed to get school value:', err);
      callback(err);
    } else {
      console.log('School value:', reply);
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

  // Display initial school value
  displaySchoolValue(client, 'Holberton', (err, reply) => {
    if (err) {
      console.error('Error displaying school value:', err);
      return;
    }

    // Set new school value
    setNewSchool(client, 'HolbertonSanFrancisco', '100', (err, reply) => {
      if (err) {
        console.error('Error setting new school value:', err);
        return;
      }

      // Display updated school value
      displaySchoolValue(client, 'HolbertonSanFrancisco', (err, reply) => {
        if (err) {
          console.error('Error displaying updated school value:', err);
          return;
        }

        console.log('Updated school value:', reply);

        // Close the Redis client
        client.quit();
      });
    });
  });
});

