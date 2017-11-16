var iron_mq = require('iron_mq')
var worker = require('iron_worker')

var imq = new iron_mq.Client()

var queue = imq.queue("Testing")

queue.post(
    [{body: "hello", delay: 35},
     {body: "IronMQ", delay: 30}],
    function(error, body) {}
  )

//   queue.msg_get(message_id, function(error, body) {})


  