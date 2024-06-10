// 0-redis_client.js

import Redis from 'redis';

// function to connect to redis
async function connectToRedis() {
	try {
		const client = Redis.createClient({
			host: '127.0.0.1',
			port: 6379,
		});

		client.on('connect', () => {
			console.log('Redis client connected to the server');
		});

		client.on('error', () => {
			console.log(`Redis client not connected to the server: ${err.message}`);
		});
		
	} catch (error) {
		console.err('Error:', error);
	}
}
// call the function
connectToRedis();
