const kue = require("kue");
const queue = kue.createQueue({
  redis: {
    host: process.env.REDIS || "localhost"
  }
});

//obtener mensajes de una cola. default messages
queue.getJobs = function(type = "message") {
  return new Promise((resolve, reject) => {
    return queue.inactiveCount(type, function(a, b) {
      if (a) return reject(a);
      resolve(b);
    });
  });
};
//queue.getJobs().then(a => console.log(a));

queue.on("error", function(err) {
  // console.log("Oops... ");
});

module.exports = queue;
