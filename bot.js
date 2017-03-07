'use strict';

var ChannelAccessToken = ""; // Your Channel Access Token

var https = require('https');

function send(data, callback) {
  var body = JSON.stringify(data);
  console.log(body);

  var req = https.request({
    hostname: "api.line.me",
    port: 443,
    path: "/v2/bot/message/reply",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(body),
      "Authorization": "Bearer " + ChannelAccessToken
    }
  });

  req.end(body, function (err) {
    err && console.log(err);
    callback(err);
  });
}

exports.handler = function (event, context, callback) {
    console.log(event.events[0]);
  var result = event.result && event.result[0];
  //console.log(result);
  //if (result) {
  if(true) {
    //var content = result.content || {};
    var content = event.events[0];
    var message = {
        "replyToken":content.replyToken,
        "messages": [
            {
                "type": "text",
                "text": content.message.text
            }
        ]
    };
    console.log(message);
    send(message, function () {
      callback();
    });
  } else {
    callback();
  }
};
