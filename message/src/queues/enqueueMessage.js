const uuidv1 = require("uuid/v1");
const queue = require("./");
const saveMessage = require("../clients/saveMessage");
const debug = require("debug")("debug:enqueueMessage");
const futureCredit = require("../clients/futureCredit");

const enqueueMessage = parameters => {
  return new Promise((resolve, reject) => {
    debug("credit?", futureCredit.getCredit());

    if (futureCredit.getCredit() > 0) {
      let messageId = uuidv1();
      saveMessage(
        {
          ...parameters,
          messageId,
          status: "PENDING"
        },
        function(_result, error) {
          if (error) {
            debug("messageapp:response:error", error.message);
            return reject(error);
          } else {
            debug("messageapp:response:ok", _result);
            const jobSendMessage = queue
              .create("message", {
                ..._result,
                messageId,
                status: "PENDING"
              })
              // .delay(10000)
              .save(function(err) {
                if (!err) {
                  debug("save JOB");
                  return resolve(messageId);
                }
                return reject(err);
              });
          }
        }
      );
    } else {
      return reject({ message: "No Credit" });
    }
  });
};

module.exports = enqueueMessage;
