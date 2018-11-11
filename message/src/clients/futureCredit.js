const enqueuePayment = require("../queues/enqueuePayment");
const queue = require("../queues");
const dispatcherUpdateCredit = require("../queues/dispatcherUpdateCredit");
const debug = require("debug")("debug:futureCredit");
class futureCredit {
  constructor() {
    this.credit = 1;
    this.updateCreditWorker();
    this.initCredit();
  }

  initCredit() {
    enqueuePayment({ messageId: 0, cost: 0 }).then(job => {
      debug("initCredit", job);
    });
  }

  updateCreditWorker() {
    dispatcherUpdateCredit();
  }

  updateCredit(credit, done) {
    debug("updateCredit", credit);
    queue.getJobsCount("messages").then(jobsCount => {
      this.credit = credit - jobsCount;
      done();
    });
  }

  getCredit() {
    debug("getCredit", this.credit);
    return this.credit;
  }
}

module.exports = new futureCredit();
