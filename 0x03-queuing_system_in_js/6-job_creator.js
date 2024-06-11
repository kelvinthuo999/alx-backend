// Import Kue
const kue = require('kue');

// Create a queue instance
const queue = kue.createQueue();

// Define job data
const jobData = {
  phoneNumber: '1234567890',
  message: 'Your verification code is 1234.',
};

// Create a job in the 'push_notification_code' queue
queue.create('push_notification_code', jobData)
 .save((err, job) => {
    if (err) {
      console.log('Notification job failed');
      return;
    }

    console.log(`Notification job created: ${job.id}`);

    // Listen for job completion
    job.on('complete', () => {
      console.log('Notification job completed');
    });

    // Listen for job failure
    job.on('failed', (errorMessage) => {
      console.log('Notification job failed');
    });
  });

