const queue = require("./");
const debug = require("debug")("debug:enqueuePayment");

const enqueuePayment = ({ messageId, cost }) => {
  return new Promise((resolve, reject) => {
    const jobPayment = queue
      .create("payment", {
        messageId,
        cost
      })
      .delay(10000)
      .save(function(err) {
        if (!err) {
          debug("jobPayment:ok", { messageId, cost });
          return resolve({
            messageId,
            cost
          });
        }
        debug("jobPayment:error", err);
        return reject(err);
      });
  });
};

module.exports = enqueuePayment;
