const queue = require("./");
const futureCredit = require("../clients/futureCredit");
const debug = require("debug")("debug:dispatcherUpdateCredit");

queue.process("updateCredit", (job, done) => {
  debug("worker", job.data);
  futureCredit.updateCredit(job.data.credit, done);
});

module.exports = () => {
  queue.process("updateCredit", (job, done) => {
    debug("worker", job.data);
    futureCredit.updateCredit(job.data.credit, done);
  });
};
