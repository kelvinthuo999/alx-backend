// Import Kue
const kue = require('kue');

/**
 * Creates push notification jobs in the specified queue.
 * 
 * @param {Array} jobs An array of job objects.
 * @param {Object} queue A Kue queue instance.
 */
function createPushNotificationsJobs(jobs, queue) {
  // Validate input
  if (!Array.isArray(jobs)) {
    throw new Error('Jobs is not an array');
  }

  // Iterate over each job in the jobs array
  jobs.forEach(jobData => {
    // Create a new job in the 'push_notification_code_3' queue
    const job = queue.create('push_notification_code_3', jobData)
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
        console.log(`Notification job ${job.id} ${Math.round(progress * 100)}% complete`);
      });
  });
}

module.exports = { createPushNotificationsJobs };

