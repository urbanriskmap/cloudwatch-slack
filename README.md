# CloudWatch Slack Integration
Send AWS CloudWatch Alarms to Slack

### Deploy
- Deploy Lambda
- Add the following environment variables:
    * CHANNEL - Slack channel
    * PATH - Slack webhook, omitting 'https://hooks.slack.com' (e.g. '/services/URL')

### References
[1] http://notes.webutvikling.org/send-aws-cloudwatch-alarms-to-slack/
[2] https://gist.github.com/tomfa/b33f768908b0a83987d26f269e377e95