const kue = require("kue");
const queue = kue.createQueue({
  redis: {
    host: process.env.REDIS || "localhost"
  }
});

//get number enqueued messages. default messages
queue.getJobsCount = function(type = "message") {
  return new Promise((resolve, reject) => {
    return queue.inactiveCount(type, function(a, b) {
      if (a) return reject(a);
      resolve(b);
    });
  });
};

queue.on("error", function(err) {
  // console.log("Oops... ");
});

module.exports = queue;
