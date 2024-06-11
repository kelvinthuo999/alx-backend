// Import Kue
const kue = require('kue');

// Array of jobs
const jobs = [
  {
    phoneNumber: '4153518780',
    message: 'This is the code 1234 to verify your account'
  },
  // Add other job objects here...
];

// Create a queue instance
const queue = kue.createQueue();

jobs.forEach(jobData => {
  // Create a new job in the 'push_notification_code_2' queue
  const job = queue.create('push_notification_code_2', jobData)
   .save((err) => {
      if (err) {
        console.log(`Notification job failed: ${err}`);
        return;
      }

      console.log(`Notification job created: ${job.id}`);
    })
   .on('complete', () => {
      console.log(`Notification job ${job.id} completed`);
    })
   .on('failed', (errorMessage) => {
      console.log(`Notification job ${job.id} failed: ${errorMessage}`);
    })
   .on('progress', (progress) => {
      // Assuming progress is a percentage, calculate the estimated completion percentage
      const estimatedCompletionPercentage = Math.round(progress * 100);
      console.log(`Notification job ${job.id} ${estimatedCompletionPercentage}% complete`);
    });
});

