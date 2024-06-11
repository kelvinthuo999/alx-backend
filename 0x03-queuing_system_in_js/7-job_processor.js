// Import Kue
const kue = require('kue');

// Blacklist array
const blacklist = ['4153518780', '4153518781'];

// Function to simulate sending a notification
function sendNotification(phoneNumber, message, job, done) {
  // Check if the phone number is blacklisted
  if (blacklist.includes(phoneNumber)) {
    done(new Error(`Phone number ${phoneNumber} is blacklisted`));
    return;
  }

  // Log progress
  job.progress(0, 100); // Set initial progress to 0%

  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);

  // Simulate processing (e.g., sending the notification)
  setTimeout(() => {
    job.progress(50, 100); // Update progress to 50%

    // Simulate job completion
    done(null, true);
  }, 1000);
}

// Create a queue instance
const queue = kue.createQueue();

// Process jobs from the 'push_notification_code_2' queue
queue.process('push_notification_code_2', 2, (job, done) => {
  const { phoneNumber, message } = job.data;

  // Call the sendNotification function with the job data
  sendNotification(phoneNumber, message, job, done);
});

