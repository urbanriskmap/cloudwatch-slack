const https = require('https');
const util = require('util');

const CHANNEL = process.env.CHANNEL;
const PATH = process.env.PATH;

exports.handler = function(event, context) {
    console.log(JSON.stringify(event, null, 2));
    console.log('From SNS:', event.Records[0].Sns.Message);

    const postData = {
        "channel": CHANNEL,
        "username": "AWS SNS",
        "text": "*" + event.Records[0].Sns.Subject + "*",
        "icon_emoji": ":scream:"
    };

    const sns = JSON.parse(event.Records[0].Sns.Message);
    let message = sns.AlaramDescription + '\n Region: ' + sns.Region + 
    '\n Timestamp: ' + sns.StateChangeTime;

    postData.attachments = [
        {
            "color": "danger", 
            "text": message
        }
    ];

    const options = {
        method: 'POST',
        hostname: 'hooks.slack.com',
        port: 443,
        path: PATH
    };

    const req = https.request(options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        context.done(null, postData);
      });
    });
    
    req.on('error', function(e) {
      console.log('problem with request: ' + e.message);
    });    

    req.write(util.format("%j", postData));
    req.end();
};