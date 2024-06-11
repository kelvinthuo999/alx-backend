const expect = require('chai').expect;
const kue = require('kue');
const { createPushNotificationsJobs } = require('./8-job'); // Adjust the path as needed

describe('createPushNotificationsJobs', function() {
  let queue;

  beforeEach(function() {
    // Initialize a new queue for each test
    queue = kue.createQueue();
    queue.testMode(true); // Enter test mode
  });

  afterEach(function() {
    // Clear the queue after each test
    queue.empty();
    queue.testMode(false); // Exit test mode
  });

  it('should display an error message if jobs is not an array', function(done) {
    try {
      createPushNotificationsJobs({}, queue);
    } catch (error) {
      expect(error.message).to.equal('Jobs is not an array');
      done();
    }
  });

  it('should create two new jobs to the queue', function(done) {
    const jobs = [
      { phoneNumber: '123', message: 'Test' },
      { phoneNumber: '456', message: 'Test' }
    ];

    createPushNotificationsJobs(jobs, queue);

    // Wait for the jobs to be processed
    setTimeout(() => {
      expect(queue.jobs.length).to.equal(2);
      done();
    }, 500); // Adjust timeout as needed
  });
});

