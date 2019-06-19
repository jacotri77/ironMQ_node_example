var iron_mq = require('iron_mq')
var worker = require('iron_worker')

var imq = new iron_mq.Client()
var imq = new iron_mq.Client({token: "MY_TOKEN", project_id: "MY_PROJECT_ID", queue_name: "testing"});

var queue = imq.queue("testing")

queue.post(
    [{body: "hello", delay: 35},
     {body: "IronMQ", delay: 30}],
    function(error, body) {}
  )

//   queue.msg_get(message_id, function(error, body) {})


  
