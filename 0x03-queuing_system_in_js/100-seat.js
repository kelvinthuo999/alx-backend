const express = require('express');
const redis = require('redis');
const { promisify } = require('util');
const kue = require('kue');
const app = express();

// Redis client configuration
const redisClient = redis.createClient({
  host: 'localhost', // Replace with your Redis server address
  port: 6379 // Replace with your Redis server port
});

// Promisify Redis commands
const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);

// Number of available seats initially
let numberOfAvailableSeats = 50;

// Reservation enabled flag
let reservationEnabled = true;

// Initialize Kue queue
const queue = kue.createQueue();

