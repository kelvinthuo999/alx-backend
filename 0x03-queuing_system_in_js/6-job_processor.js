// Import Kue
const kue = require('kue');

// Create a queue instance
const queue = kue.createQueue();

// Function to simulate sending a notification
function sendNotification(phoneNumber, message) {
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
  // Here you would typically perform the actual notification logic
}

// Process jobs from the 'push_notification_code' queue
queue.process('push_notification_code', (job, done) => {
  const { phoneNumber, message } = job.data;

  // Call the sendNotification function with the job data
  sendNotification(phoneNumber, message);

  // Mark the job as completed
  done();
});

